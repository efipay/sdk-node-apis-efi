const { createHash } = require('node:crypto');
const { readFileSync } = require('node:fs');
const ts = require('typescript');

const EXPECTED_ENDPOINTS_HASH = '5cff58242cf1063bdb7ecc3ad3f1709f62d792851be9df271282de7f19f4c64e';
const EXPECTED_PUBLIC_ENDPOINTS = 171;

function property(object, name) {
  return object.properties.find((entry) => entry.name?.getText().replace(/['"]/g, '') === name)?.initializer;
}

function unwrapExpression(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))) {
    node = node.expression;
  }
  return node;
}

function literal(node) {
  if (!node || (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node))) return undefined;
  return node.text;
}

const endpointsPath = 'src/constants/endpoints.ts';
const endpointsFile = ts.createSourceFile(
  endpointsPath,
  readFileSync(endpointsPath, 'utf8'),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
const endpointsDeclaration = endpointsFile.statements
  .filter(ts.isVariableStatement)
  .flatMap((statement) => [...statement.declarationList.declarations])
  .find((declaration) => declaration.name.getText(endpointsFile) === 'endpoints');

const endpointsInitializer = unwrapExpression(endpointsDeclaration?.initializer);
if (!endpointsDeclaration || !endpointsInitializer || !ts.isObjectLiteralExpression(endpointsInitializer)) {
  throw new Error('Nao foi possivel localizar a constante endpoints.');
}

const apis = property(endpointsInitializer, 'APIS');
if (!apis || !ts.isObjectLiteralExpression(apis)) throw new Error('Nao foi possivel localizar endpoints.APIS.');

const endpoints = [];
for (const apiProperty of apis.properties) {
  if (!apiProperty.name || !ts.isPropertyAssignment(apiProperty) || !ts.isObjectLiteralExpression(apiProperty.initializer)) continue;
  const apiName = apiProperty.name.getText(endpointsFile).replace(/['"]/g, '');
  const apiEndpoints = property(apiProperty.initializer, 'ENDPOINTS');
  if (!apiEndpoints || !ts.isObjectLiteralExpression(apiEndpoints)) continue;

  for (const endpointProperty of apiEndpoints.properties) {
    if (!endpointProperty.name || !ts.isPropertyAssignment(endpointProperty) || !ts.isObjectLiteralExpression(endpointProperty.initializer)) continue;
    const name = endpointProperty.name.getText(endpointsFile).replace(/['"]/g, '');
    const route = literal(property(endpointProperty.initializer, 'route'));
    const method = literal(property(endpointProperty.initializer, 'method'));
    if (!route || !method) throw new Error(`${apiName}.${name}: route ou method ausente.`);
    endpoints.push({ apiName, name, route, method: method.toUpperCase() });
  }
}

const canonicalEndpoints = endpoints
  .map(({ apiName, name, method, route }) => `${apiName}:${name}:${method}:${route}`)
  .sort();
const endpointsHash = createHash('sha256').update(canonicalEndpoints.join('\n')).digest('hex');
if (endpointsHash !== EXPECTED_ENDPOINTS_HASH) {
  throw new Error(`Mapa de endpoints alterado: esperado ${EXPECTED_ENDPOINTS_HASH}, recebido ${endpointsHash}.`);
}

const config = ts.readConfigFile('tsconfig.json', ts.sys.readFile);
const parsedConfig = ts.parseJsonConfigFileContent(config.config, ts.sys, '.');
const program = ts.createProgram(parsedConfig.fileNames, parsedConfig.options);
const checker = program.getTypeChecker();
const wrapperFile = program.getSourceFile('src/wrapper.ts');
const wrapperClass = wrapperFile?.statements.find(
  (statement) => ts.isClassDeclaration(statement) && statement.name?.text === 'EfiPay',
);
if (!wrapperFile || !wrapperClass || !ts.isClassDeclaration(wrapperClass)) {
  throw new Error('Nao foi possivel localizar a classe EfiPay.');
}

const methods = new Map();
for (const member of wrapperClass.members) {
  if (!ts.isMethodDeclaration(member) || !member.name) continue;
  const name = member.name.getText(wrapperFile);
  const entries = methods.get(name) ?? [];
  entries.push(member);
  methods.set(name, entries);
}

const failures = [];
const publicEndpoints = endpoints.filter(({ name }) => name !== 'authorize');
const chargeResponsesPath = 'src/types/chargeResponses.ts';
const chargeResponsesSource = readFileSync(chargeResponsesPath, 'utf8');
const chargeResponsesFile = ts.createSourceFile(
  chargeResponsesPath,
  chargeResponsesSource,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
const chargeResponseTypes = new Set(
  chargeResponsesFile.statements.filter(ts.isTypeAliasDeclaration).map((statement) => statement.name.text),
);
const chargeResponseSchemas = new Set(
  chargeResponsesFile.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => [...statement.declarationList.declarations])
    .map((declaration) => declaration.name.getText(chargeResponsesFile)),
);
if (/export\s+type\s+ChargeResponse\b/.test(chargeResponsesSource)) {
  failures.push('ChargeResponse generico ainda esta exportado');
}
if (publicEndpoints.length !== EXPECTED_PUBLIC_ENDPOINTS) {
  failures.push(`quantidade de endpoints: esperado ${EXPECTED_PUBLIC_ENDPOINTS}, recebido ${publicEndpoints.length}`);
}

for (const endpoint of publicEndpoints) {
  const declarations = methods.get(endpoint.name) ?? [];
  const implementation = declarations.find((declaration) => declaration.body);
  if (!implementation?.body) {
    failures.push(`${endpoint.name}: implementacao publica ausente`);
    continue;
  }

  let transportCall;
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      ['call', 'callBodyEndpoint', 'callWithoutParams'].includes(node.expression.name.text)
    ) {
      transportCall = node;
    }
    ts.forEachChild(node, visit);
  };
  visit(implementation.body);

  const expectedResponse = `Types.${endpoint.name[0].toUpperCase()}${endpoint.name.slice(1)}Response`;
  const expectedResponseName = expectedResponse.slice('Types.'.length);
  const responseType = transportCall?.typeArguments?.[0]?.getText(wrapperFile);
  if (endpoint.apiName === 'DEFAULT' && responseType !== expectedResponse) {
    failures.push(`${endpoint.name}: retorno esperado ${expectedResponse}, recebido ${responseType ?? 'nenhum'}`);
  } else if (!responseType?.startsWith('Types.') || !responseType.endsWith('Response')) {
    failures.push(`${endpoint.name}: transporte sem tipo de resposta publico`);
  }
  if (endpoint.apiName === 'DEFAULT') {
    if (!chargeResponseTypes.has(expectedResponseName)) {
      failures.push(`${endpoint.name}: tipo ${expectedResponseName} nao exportado`);
    }
    if (!chargeResponseSchemas.has(`${expectedResponseName}Schema`)) {
      failures.push(`${endpoint.name}: schema ${expectedResponseName}Schema nao exportado`);
    }
  }

  const placeholders = [...endpoint.route.matchAll(/:([A-Za-z][A-Za-z0-9_]*)/g)].map((match) => match[1]);
  if (placeholders.length > 0) {
    const paramsParameter = declarations
      .flatMap((declaration) => [...declaration.parameters])
      .find(
        (parameter) =>
          parameter.name.getText(wrapperFile) === 'params' &&
          parameter.type &&
          !parameter.type.getText(wrapperFile).includes('EmptyParams'),
      );
    if (!paramsParameter?.type) {
      failures.push(`${endpoint.name}: rota possui placeholders sem params publicos`);
    } else {
      const paramsType = checker.getTypeFromTypeNode(paramsParameter.type);
      for (const placeholder of placeholders) {
        const field = checker.getPropertyOfType(paramsType, placeholder);
        if (!field) {
          failures.push(`${endpoint.name}: placeholder :${placeholder} ausente em params`);
        } else if ((field.flags & ts.SymbolFlags.Optional) !== 0) {
          failures.push(`${endpoint.name}: placeholder :${placeholder} nao pode ser opcional`);
        }
      }
    }
  }

  const signatureHasBody = declarations.some((declaration) =>
    declaration.parameters.some((parameter) => parameter.name.getText(wrapperFile) === 'body'),
  );
  const callName = transportCall && ts.isPropertyAccessExpression(transportCall.expression)
    ? transportCall.expression.name.text
    : undefined;
  const transportHasBody = callName === 'callBodyEndpoint' || (
    callName === 'call' && transportCall.arguments[2]?.getText(wrapperFile) !== 'undefined'
  );
  if (signatureHasBody !== transportHasBody) {
    failures.push(`${endpoint.name}: assinatura e transporte divergem sobre envio de body`);
  }
  if (endpoint.method === 'GET' && transportHasBody) {
    failures.push(`${endpoint.name}: endpoint GET nao deve enviar body`);
  }
}

if (failures.length > 0) {
  console.error('Falhas na auditoria de endpoints:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Endpoints auditados: ${publicEndpoints.length} rotas com verbo, API, params, body e response.`);
