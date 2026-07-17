const { readFileSync, readdirSync } = require('node:fs');
const ts = require('typescript');

const wrapperPath = 'src/wrapper.ts';
const endpointsPath = 'src/constants/endpoints.ts';
const wrapperSource = readFileSync(wrapperPath, 'utf8');
const endpointsSource = readFileSync(endpointsPath, 'utf8');
const wrapperFile = ts.createSourceFile(wrapperPath, wrapperSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const endpointsFile = ts.createSourceFile(endpointsPath, endpointsSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

const failures = [];
const methods = new Map();
const localMethods = new Set(['pixQrCodeDetail', 'pixGenerateStaticQRCode']);
const forbiddenAliases = new Set([
  'linkCharge',
  'oneStepSubscription',
  'oneStepSubscriptionLink',
  'pixDeleteLocation',
  'pixListWebhooks',
]);

function textOf(node, file = wrapperFile) {
  return node.getText(file);
}

function hasModifier(node, kind) {
  return node.modifiers?.some((modifier) => modifier.kind === kind) ?? false;
}

function hasDeprecatedTag(node) {
  return ts.getJSDocTags(node).some((tag) => tag.tagName.text === 'deprecated');
}

function collectWrapperMethods(node) {
  if (ts.isClassDeclaration(node) && node.name?.text === 'EfiPay') {
    for (const member of node.members) {
      if (!ts.isMethodDeclaration(member) || !member.name || hasModifier(member, ts.SyntaxKind.PrivateKeyword)) {
        continue;
      }

      const name = textOf(member.name);
      const entries = methods.get(name) ?? [];
      entries.push(member);
      methods.set(name, entries);
    }
  }

  ts.forEachChild(node, collectWrapperMethods);
}

collectWrapperMethods(wrapperFile);

const endpointNames = new Set();
function collectEndpoints(node) {
  if (
    ts.isPropertyAssignment(node) &&
    textOf(node.name, endpointsFile).replace(/['"]/g, '') === 'ENDPOINTS' &&
    ts.isObjectLiteralExpression(node.initializer)
  ) {
    for (const property of node.initializer.properties) {
      if (ts.isPropertyAssignment(property) || ts.isMethodDeclaration(property) || ts.isShorthandPropertyAssignment(property)) {
        endpointNames.add(textOf(property.name, endpointsFile).replace(/['"]/g, ''));
      }
    }
  }

  ts.forEachChild(node, collectEndpoints);
}

collectEndpoints(endpointsFile);
endpointNames.delete('authorize');

for (const fileName of readdirSync('src/types').filter((file) => file.endsWith('.ts'))) {
  const filePath = `src/types/${fileName}`;
  const source = readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

  for (const statement of sourceFile.statements) {
    if (!ts.isTypeAliasDeclaration(statement) || !statement.name.text.endsWith('Response')) continue;
    const responseType = statement.type.getText(sourceFile);
    if (/\b(?:unknown|AnyObject)\b/.test(responseType)) {
      failures.push(`${statement.name.text}: resposta publica usa ${responseType}`);
    }
  }
}

for (const alias of forbiddenAliases) {
  if (methods.has(alias)) failures.push(`alias publico proibido: ${alias}`);
  if (endpointNames.has(alias)) failures.push(`alias de endpoint proibido: ${alias}`);
}

for (const endpointName of endpointNames) {
  if (!methods.has(endpointName)) failures.push(`endpoint sem metodo publico: ${endpointName}`);
}

for (const [methodName, declarations] of methods) {
  if (!endpointNames.has(methodName) && !localMethods.has(methodName)) {
    failures.push(`metodo publico sem endpoint ou implementacao local: ${methodName}`);
  }

  for (const declaration of declarations) {
    if (declaration.body) continue;

    const signature = textOf(declaration);
    const requestParameters = declaration.parameters.filter((parameter) => {
      const name = textOf(parameter.name);
      return name === 'params' || name === 'body';
    });

    for (const parameter of requestParameters) {
      const parameterType = parameter.type ? textOf(parameter.type) : '';
      if (parameterType.includes('AnyObject')) {
        failures.push(`${methodName}: request publico usa AnyObject`);
      }
      if (!parameterType.startsWith('Types.')) {
        failures.push(`${methodName}: request sem tipo especifico (${parameterType || 'inferido'})`);
      }
    }

    if (signature.includes('Promise<unknown>')) {
      failures.push(`${methodName}: resposta publica usa Promise<unknown>`);
    }

    const emptyParams = declaration.parameters.some((parameter) => textOf(parameter.type ?? parameter).includes('EmptyParams'));
    if (emptyParams && !hasDeprecatedTag(declaration)) {
      failures.push(`${methodName}: overload legado com EmptyParams nao possui @deprecated`);
    }
  }
}

if (wrapperSource.includes("'pixQrCodeDetail'")) {
  failures.push('pixQrCodeDetail ainda aparece como endpoint HTTP interno');
}

if (failures.length > 0) {
  console.error('Falhas na auditoria da API publica:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`API publica auditada: ${methods.size} metodos e ${endpointNames.size} endpoints.`);
