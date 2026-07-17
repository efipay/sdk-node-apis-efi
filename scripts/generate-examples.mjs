import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SDK_ROOT = path.resolve(SCRIPT_DIR, '..');
const WORKSPACE_ROOT = path.resolve(SDK_ROOT, '..');
const PHP_EXAMPLES_ROOT = path.join(WORKSPACE_ROOT, 'examples');
const OUTPUT_ROOT = path.join(SDK_ROOT, 'examples');
const TS_ROOT = path.join(OUTPUT_ROOT, 'ts');
const CJS_ROOT = path.join(OUTPUT_ROOT, 'cjs');
const WRAPPER_FILE = path.join(SDK_ROOT, 'src', 'wrapper.ts');

const SKIPPED_ASSIGNMENTS = new Set(['autoload', 'optionsFile', 'options']);
const METHOD_RENAMES = new Map([['createStaticPix', 'pixGenerateStaticQRCode']]);
const VARIABLE_RENAMES = new Map([['shippingsm', 'shippings']]);
const DEVOLUTION_METHODS = new Set([
  'ofDevolutionPix',
  'ofDevolutionSchedulePix',
  'ofDevolutionRecurrencyPix',
]);

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    if (entry.isFile()) return [fullPath];
    return [];
  });
}

function stripExpressionComments(source) {
  let output = '';
  let quote = null;
  let escaped = false;

  for (let index = 0; index < source.length; index += 1) {
    const current = source[index];
    const next = source[index + 1];

    if (quote) {
      output += current;
      if (escaped) {
        escaped = false;
      } else if (current === '\\') {
        escaped = true;
      } else if (current === quote) {
        quote = null;
      }
      continue;
    }

    if (current === '"' || current === "'") {
      quote = current;
      output += current;
      continue;
    }

    if (current === '/' && next === '/') {
      while (index < source.length && source[index] !== '\n') index += 1;
      output += '\n';
      continue;
    }

    if (current === '#') {
      while (index < source.length && source[index] !== '\n') index += 1;
      output += '\n';
      continue;
    }

    if (current === '/' && next === '*') {
      index += 2;
      while (index < source.length && !(source[index] === '*' && source[index + 1] === '/')) index += 1;
      index += 1;
      continue;
    }

    output += current;
  }

  return output;
}

function tokenize(source) {
  const input = stripExpressionComments(source);
  const tokens = [];
  let index = 0;

  while (index < input.length) {
    const current = input[index];

    if (/\s/.test(current)) {
      index += 1;
      continue;
    }

    if (current === '=' && input[index + 1] === '>') {
      tokens.push({ type: 'arrow', value: '=>' });
      index += 2;
      continue;
    }

    if ('[](),'.includes(current)) {
      tokens.push({ type: current, value: current });
      index += 1;
      continue;
    }

    if (current === '"' || current === "'") {
      const quote = current;
      let value = '';
      index += 1;

      while (index < input.length) {
        const char = input[index];
        if (char === '\\') {
          const escaped = input[index + 1];
          if (quote === '"') {
            if (escaped === 'n') value += '\n';
            else if (escaped === 'r') value += '\r';
            else if (escaped === 't') value += '\t';
            else if (escaped === '"' || escaped === '\\' || escaped === '$') value += escaped;
            else value += escaped ?? '';
          } else {
            if (escaped === "'" || escaped === '\\') value += escaped;
            else value += `\\${escaped ?? ''}`;
          }
          index += 2;
          continue;
        }

        if (char === quote) {
          index += 1;
          break;
        }

        value += char;
        index += 1;
      }

      tokens.push({ type: 'string', value });
      continue;
    }

    if (current === '$') {
      if (input.startsWith('$_POST["notification"]', index) || input.startsWith('$_POST[\'notification\']', index)) {
        tokens.push({
          type: 'raw',
          value: 'process.env.EFI_NOTIFICATION_TOKEN ?? "00000000-0000-0000-0000-000000000000"',
        });
        index += input.startsWith('$_POST["notification"]', index)
          ? '$_POST["notification"]'.length
          : "$_POST['notification']".length;
        continue;
      }

      const match = input.slice(index).match(/^\$([A-Za-z_][A-Za-z0-9_]*)/);
      if (match) {
        const name = VARIABLE_RENAMES.get(match[1]) ?? match[1];
        tokens.push({ type: 'variable', value: name });
        index += match[0].length;
        continue;
      }
    }

    const numberMatch = input.slice(index).match(/^-?\d+(?:\.\d+)?/);
    if (numberMatch) {
      tokens.push({ type: 'number', value: numberMatch[0] });
      index += numberMatch[0].length;
      continue;
    }

    const identifierMatch = input.slice(index).match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (identifierMatch) {
      tokens.push({ type: 'identifier', value: identifierMatch[0] });
      index += identifierMatch[0].length;
      continue;
    }

    tokens.push({ type: 'raw', value: current });
    index += 1;
  }

  return tokens;
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.index = 0;
  }

  current() {
    return this.tokens[this.index];
  }

  next() {
    const token = this.current();
    this.index += 1;
    return token;
  }

  is(type) {
    return this.current()?.type === type;
  }

  parseValue() {
    const token = this.current();
    if (!token) return 'undefined';

    if (token.type === '[') return this.parseArray();
    this.next();

    if (token.type === 'string') return JSON.stringify(token.value);
    if (token.type === 'number') return token.value;
    if (token.type === 'variable') return token.value;
    if (token.type === 'raw') return token.value;

    if (token.type === 'identifier') {
      if (['true', 'false', 'null'].includes(token.value)) return token.value;
      return JSON.stringify(token.value);
    }

    return JSON.stringify(token.value);
  }

  parseKey(token) {
    if (token.type === 'string' || token.type === 'identifier' || token.type === 'number') return String(token.value);
    if (token.type === 'variable') return token.value;
    return String(token.value);
  }

  parseArray() {
    this.next();
    const entries = [];
    let associative = false;

    while (!this.is(']') && this.current()) {
      if (this.is(',')) {
        this.next();
        continue;
      }

      const firstToken = this.current();
      const firstValue = this.parseValue();

      if (this.is('arrow')) {
        associative = true;
        this.next();
        const value = this.parseValue();
        entries.push({ key: this.parseKey(firstToken), value });
      } else {
        entries.push({ value: firstValue });
      }

      if (this.is(',')) this.next();
    }

    if (this.is(']')) this.next();

    if (associative) {
      return `{\n${entries
        .map((entry) => `  ${JSON.stringify(entry.key)}: ${indent(entry.value, 2).trimStart()}`)
        .join(',\n')}\n}`;
    }

    return `[\n${entries.map((entry) => `  ${indent(entry.value, 2).trimStart()}`).join(',\n')}\n]`;
  }
}

function indent(value, spaces = 2) {
  const prefix = ' '.repeat(spaces);
  return String(value)
    .split('\n')
    .map((line, index) => (index === 0 ? line : prefix + line))
    .join('\n');
}

function parsePhpExpression(expression) {
  const parser = new Parser(tokenize(expression));
  return parser.parseValue();
}

function findStatementEnd(source, start) {
  let quote = null;
  let escaped = false;
  let bracketDepth = 0;
  let parenDepth = 0;

  for (let index = start; index < source.length; index += 1) {
    const current = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (current === '\\') {
        escaped = true;
      } else if (current === quote) {
        quote = null;
      }
      continue;
    }

    if (current === '"' || current === "'") {
      quote = current;
      continue;
    }

    if (current === '[') bracketDepth += 1;
    else if (current === ']') bracketDepth -= 1;
    else if (current === '(') parenDepth += 1;
    else if (current === ')') parenDepth -= 1;
    else if (current === ';' && bracketDepth === 0 && parenDepth === 0) {
      return index;
    }
  }

  return source.length;
}

function findClosingParen(source, openParen) {
  let quote = null;
  let escaped = false;
  let depth = 0;

  for (let index = openParen; index < source.length; index += 1) {
    const current = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (current === '\\') {
        escaped = true;
      } else if (current === quote) {
        quote = null;
      }
      continue;
    }

    if (current === '"' || current === "'") {
      quote = current;
      continue;
    }

    if (current === '(') depth += 1;
    else if (current === ')') {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  return source.length;
}

function splitArgs(source) {
  const args = [];
  let start = 0;
  let quote = null;
  let escaped = false;
  let bracketDepth = 0;
  let parenDepth = 0;

  for (let index = 0; index <= source.length; index += 1) {
    const current = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (current === '\\') {
        escaped = true;
      } else if (current === quote) {
        quote = null;
      }
      continue;
    }

    if (current === '"' || current === "'") {
      quote = current;
      continue;
    }

    if (current === '[') bracketDepth += 1;
    else if (current === ']') bracketDepth -= 1;
    else if (current === '(') parenDepth += 1;
    else if (current === ')') parenDepth -= 1;

    if ((current === ',' && bracketDepth === 0 && parenDepth === 0) || index === source.length) {
      const arg = source.slice(start, index).trim();
      if (arg) args.push(arg);
      start = index + 1;
    }
  }

  return args;
}

function extractDocBlock(source) {
  const match = source.match(/\/\*\*[\s\S]*?\*\//);
  return match ? `${match[0].trim()}\n\n` : '';
}

function extractAssignments(source) {
  const tryIndex = source.indexOf('try {');
  const prelude = tryIndex === -1 ? source : source.slice(0, tryIndex);
  const assignments = [];

  for (const match of prelude.matchAll(/^\s*\$options\["headers"\]\s*=/gm)) {
    const expressionStart = match.index + match[0].length;
    const expressionEnd = findStatementEnd(prelude, expressionStart);
    assignments.push({
      name: 'headers',
      index: match.index,
      expression: prelude.slice(expressionStart, expressionEnd).trim(),
    });
  }

  for (const match of prelude.matchAll(/^\s*\$([A-Za-z_][A-Za-z0-9_]*)\s*=/gm)) {
    const name = match[1];
    if (SKIPPED_ASSIGNMENTS.has(name)) continue;

    const expressionStart = match.index + match[0].length;
    const expressionEnd = findStatementEnd(prelude, expressionStart);
    assignments.push({
      name,
      index: match.index,
      expression: prelude.slice(expressionStart, expressionEnd).trim(),
    });
  }

  return assignments.sort((a, b) => a.index - b.index);
}

function extractFirstCall(source) {
  const match = /\$api->([A-Za-z0-9_]+)\s*\(/.exec(source);
  if (!match) return null;

  const openParen = match.index + match[0].length - 1;
  const closeParen = findClosingParen(source, openParen);
  const method = METHOD_RENAMES.get(match[1]) ?? match[1];

  return {
    method,
    args: splitArgs(source.slice(openParen + 1, closeParen)),
  };
}

function normalizeArg(argument) {
  const trimmed = argument.trim();
  if (/^\$params\s*=\s*\[\s*\]$/.test(trimmed)) return '{}';
  if (/^\[\s*\]$/.test(trimmed)) return '{}';
  if (/^\$[A-Za-z_][A-Za-z0-9_]*$/.test(trimmed)) {
    const name = trimmed.slice(1);
    return VARIABLE_RENAMES.get(name) ?? name;
  }
  return parsePhpExpression(trimmed);
}

function getMethodConventions() {
  const source = fs.readFileSync(WRAPPER_FILE, 'utf8');
  const sourceFile = ts.createSourceFile(WRAPPER_FILE, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const bodyOnly = new Set(['pixGenerateStaticQRCode']);
  const withoutArguments = new Set();
  const signatures = new Map();
  const candidates = new Map();

  for (const statement of sourceFile.statements) {
    if (!ts.isClassDeclaration(statement) || statement.name?.text !== 'EfiPay') continue;

    for (const member of statement.members) {
      if (!ts.isMethodDeclaration(member) || !ts.isIdentifier(member.name)) continue;

      const deprecated = ts.getJSDocTags(member).some((tag) => tag.tagName.text === 'deprecated');
      if (deprecated) continue;

      const methodCandidates = candidates.get(member.name.text) ?? [];
      methodCandidates.push(member);
      candidates.set(member.name.text, methodCandidates);
    }
  }

  for (const [method, methodCandidates] of candidates) {
    const member = methodCandidates.find((candidate) => !candidate.body) ?? methodCandidates[0];
    const parameters = member.parameters.map((parameter) => {
      if (!ts.isIdentifier(parameter.name) || !parameter.type) {
        throw new Error(`Cannot infer the public parameter type for ${method}`);
      }

      return {
        name: parameter.name.text,
        type: parameter.type.getText(sourceFile).replace(/^Types\./, ''),
      };
    });

    signatures.set(method, parameters);

    const firstParameter = parameters[0];
    if (!firstParameter) {
      withoutArguments.add(method);
      continue;
    }

    if (firstParameter.name === 'body' || firstParameter.name === 'pixData') bodyOnly.add(method);
    if (firstParameter.name === 'headers') withoutArguments.add(method);
  }

  return { bodyOnly, withoutArguments, signatures };
}

const methodConventions = getMethodConventions();

function buildCallArgs(call, hasHeaders) {
  let args = call.args.map(normalizeArg);

  if (methodConventions.bodyOnly.has(call.method) && (args.length > 1 || args[0] === '{}')) args.shift();
  if (methodConventions.withoutArguments.has(call.method) && args[0] === '{}') args.shift();

  const signature = methodConventions.signatures.get(call.method) ?? [];
  const requestArgumentCount = signature.filter((parameter) => parameter.name !== 'headers').length;
  args = args.slice(0, requestArgumentCount);

  if (!hasHeaders) return args;
  if (args.length === 0) return ['headers'];
  return [...args, 'headers'];
}

function withImplicitParams(assignments, call) {
  const hasParamsAssignment = assignments.some((assignment) => assignment.name === 'params');
  const usesParams = call.args.some((argument) => /^\s*\$params\s*(?:,|$)/.test(argument));

  if (!usesParams || hasParamsAssignment) return assignments;

  const bodyIndex = assignments.findIndex((assignment) => assignment.name === 'body');
  const implicitParams = { name: 'params', index: -1, jsExpression: '{}' };

  if (bodyIndex === -1) return [implicitParams, ...assignments];

  return [
    ...assignments.slice(0, bodyIndex),
    implicitParams,
    ...assignments.slice(bodyIndex),
  ];
}

function getCallArgumentTypes(call, callArgs) {
  const parameters = methodConventions.signatures.get(call.method);
  if (!parameters) throw new Error(`No public signature found for ${call.method}`);

  const argumentTypes = new Map();
  for (const [index, argument] of callArgs.entries()) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(argument)) continue;
    const parameter = parameters[index];
    if (parameter) argumentTypes.set(argument, parameter.type);
  }

  return argumentTypes;
}

function declarationFor(assignment, flavor, typeName) {
  const jsExpression = assignment.jsExpression ?? parsePhpExpression(assignment.expression);
  if (flavor === 'ts' && typeName) {
    return `const ${assignment.name} = ${jsExpression} satisfies ${typeName};`;
  }

  return `const ${assignment.name} = ${jsExpression};`;
}

function replaceExpressionIdentifiers(source, replacer) {
  let output = '';
  let index = 0;
  let quote = null;
  let escaped = false;

  while (index < source.length) {
    const current = source[index];

    if (quote) {
      output += current;
      if (escaped) escaped = false;
      else if (current === '\\') escaped = true;
      else if (current === quote) quote = null;
      index += 1;
      continue;
    }

    if (current === '"' || current === "'") {
      quote = current;
      output += current;
      index += 1;
      continue;
    }

    if (/[A-Za-z_$]/.test(current)) {
      const match = source.slice(index).match(/^[A-Za-z_$][A-Za-z0-9_$]*/);
      const identifier = match[0];
      output += replacer(identifier);
      index += identifier.length;
      continue;
    }

    output += current;
    index += 1;
  }

  return output;
}

function expandAssignmentExpression(name, assignmentsByName, stack = new Set()) {
  const assignment = assignmentsByName.get(name);
  if (!assignment) throw new Error(`Assignment ${name} was not found`);
  if (stack.has(name)) throw new Error(`Cyclic assignment found while expanding ${name}`);

  const nextStack = new Set(stack).add(name);
  const expression = assignment.jsExpression ?? parsePhpExpression(assignment.expression);
  return replaceExpressionIdentifiers(expression, (identifier) => {
    if (!assignmentsByName.has(identifier) || nextStack.has(identifier)) return identifier;
    return expandAssignmentExpression(identifier, assignmentsByName, nextStack);
  });
}

function formatExpression(expression) {
  const sourceFile = ts.createSourceFile(
    'example-expression.ts',
    `const value = ${expression};`,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const statement = sourceFile.statements[0];
  if (!ts.isVariableStatement(statement)) throw new Error(`Invalid generated expression: ${expression}`);

  const initializer = statement.declarationList.declarations[0]?.initializer;
  if (!initializer) throw new Error(`Generated expression has no value: ${expression}`);
  return ts.createPrinter({ newLine: ts.NewLineKind.LineFeed }).printNode(ts.EmitHint.Expression, initializer, sourceFile);
}

function adaptAssignment(assignment, call) {
  let jsExpression = assignment.jsExpression ?? parsePhpExpression(assignment.expression);

  if (assignment.name === 'headers') {
    jsExpression = jsExpression.replace(/: (true|false)(?=,|\n|\s*})/g, ': "$1"');
  }

  if (call.method === 'getInstallments' && assignment.name === 'params') {
    jsExpression = jsExpression.replace(/("total":) "(\d+)"/, '$1 $2');
  }

  if (call.method === 'createChargeCard' && assignment.name === 'paymentToken') {
    jsExpression = '"0000000000000000000000000000000000000000"';
  }

  if (call.method === 'createChargeCard' && assignment.name === 'body') {
    jsExpression = jsExpression.replace(/\n\s*"metadata": metadata,?/, '');
  }

  if (call.method === 'medDefense' && assignment.name === 'body') {
    jsExpression = jsExpression.replace('"analise": "aceito"', '"analise": "rejeitado"');
  }

  if (call.method === 'ofStartRecurrencyPixPayment' && assignment.name === 'body') {
    jsExpression = jsExpression.replace(/,\n\s*"descricao": "[^"]*"/, '');
  }

  if (call.method === 'payDetailPayment' && assignment.name === 'params') {
    jsExpression = jsExpression.replace(/("idPagamento":) (\d+)/, '$1 "$2"');
  }

  if (call.method === 'pixGenerateStaticQRCode' && assignment.name === 'chargeData') {
    jsExpression = jsExpression
      .replace('"nomeRecebedor":', '"merchantName":')
      .replace('"cidade":', '"merchantCity":')
      .replace(/"valor": "([0-9.]+)"/, '"transactionAmount": $1')
      .replace('"descricao":', '"infoAdicional":')
      .replace('"pagamentoUnico":', '"oneTime":')
      .replace(/,\n\s*"cep": "[^"]*"/, '');
  }

  return { ...assignment, jsExpression };
}

function normalizeAssignments(assignments, call) {
  return assignments
    .filter((assignment) => {
      if (!methodConventions.bodyOnly.has(call.method) || assignment.name !== 'params') return true;
      const expression = assignment.jsExpression ?? parsePhpExpression(assignment.expression);
      return expression !== '{}';
    })
    .map((assignment) => {
      if (!DEVOLUTION_METHODS.has(call.method) || assignment.name !== 'body') return assignment;

      return {
        ...assignment,
        jsExpression: `[
  {
    "endToEndId": "E00000000000000000000000000000000",
    "valor": "0.01"
  }
]`,
      };
    })
    .map((assignment) => adaptAssignment(assignment, call));
}

function buildTsExample(relativePhpPath, source) {
  const relativeTsPath = relativePhpPath.replace(/\.php$/, '.ts');
  const outputPath = path.join(TS_ROOT, relativeTsPath);
  const relativeOptions = toPosix(path.relative(path.dirname(outputPath), path.join(TS_ROOT, 'credentials', 'options.js')));
  const optionsImport = relativeOptions.startsWith('.') ? relativeOptions : `./${relativeOptions}`;
  const call = extractFirstCall(source);

  if (!call) {
    throw new Error(`No EfiPay call found in ${relativePhpPath}`);
  }

  const assignments = normalizeAssignments(withImplicitParams(extractAssignments(source), call), call);
  const hasHeaders = assignments.some((assignment) => assignment.name === 'headers');
  const callArguments = buildCallArgs(call, hasHeaders);
  const argumentTypes = getCallArgumentTypes(call, callArguments);
  const importedTypes = [...new Set(['SdkOptions', ...argumentTypes.values()])].sort();
  const callArgs = callArguments.join(', ');
  const doc = extractDocBlock(source);
  const assignmentsByName = new Map(assignments.map((assignment) => [assignment.name, assignment]));
  const typedAssignments = [...argumentTypes]
    .map(([name, typeName]) => {
      const assignment = assignmentsByName.get(name);
      if (!assignment) return null;
      return declarationFor(
        { ...assignment, jsExpression: formatExpression(expandAssignmentExpression(name, assignmentsByName)) },
        'ts',
        typeName,
      );
    })
    .filter(Boolean);

  return `${doc}import EfiPay, { ${importedTypes.map((typeName) => `type ${typeName}`).join(', ')} } from "sdk-node-apis-efi";
import options from "${optionsImport}";

${typedAssignments.join('\n\n')}

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.${call.method}(${callArgs});
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
`;
}

function buildCjsExample(relativePhpPath, source) {
  const relativeJsPath = relativePhpPath.replace(/\.php$/, '.js');
  const outputPath = path.join(CJS_ROOT, relativeJsPath);
  const relativeOptions = toPosix(path.relative(path.dirname(outputPath), path.join(CJS_ROOT, 'credentials', 'options.js')));
  const optionsRequire = relativeOptions.startsWith('.') ? relativeOptions : `./${relativeOptions}`;
  const call = extractFirstCall(source);

  if (!call) {
    throw new Error(`No EfiPay call found in ${relativePhpPath}`);
  }

  const assignments = normalizeAssignments(withImplicitParams(extractAssignments(source), call), call);
  const hasHeaders = assignments.some((assignment) => assignment.name === 'headers');
  const callArgs = buildCallArgs(call, hasHeaders).join(', ');
  const doc = extractDocBlock(source);

  return `${doc}const EfiPay = require("sdk-node-apis-efi");
const options = require("${optionsRequire}");

${assignments.map((assignment) => declarationFor(assignment, 'cjs')).join('\n\n')}

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.${call.method}(${callArgs});
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
`;
}

function buildTsOptions() {
  return `import path from "node:path";
import { fileURLToPath } from "node:url";
import type { SdkOptions } from "sdk-node-apis-efi";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sandbox = false;

const clientIdProd = "Client_Id_Prod";
const clientSecretProd = "Client_Secret_Prod";
const certificateProd = path.resolve(__dirname, "productionCertificate.p12");

const clientIdHomolog = "Client_Id_Homolog";
const clientSecretHomolog = "Client_Secret_Homolog";
const certificateHomolog = path.resolve(__dirname, "developmentCertificate.p12");

const options: SdkOptions = {
  client_id: sandbox ? clientIdHomolog : clientIdProd,
  client_secret: sandbox ? clientSecretHomolog : clientSecretProd,
  certificate: sandbox ? certificateHomolog : certificateProd,
  sandbox,
  cache: true,
};

export default options;
`;
}

function buildCjsOptions() {
  return `const path = require("node:path");

const sandbox = false;

const clientIdProd = "Client_Id_Prod";
const clientSecretProd = "Client_Secret_Prod";
const certificateProd = path.resolve(__dirname, "productionCertificate.p12");

const clientIdHomolog = "Client_Id_Homolog";
const clientSecretHomolog = "Client_Secret_Homolog";
const certificateHomolog = path.resolve(__dirname, "developmentCertificate.p12");

module.exports = {
  client_id: sandbox ? clientIdHomolog : clientIdProd,
  client_secret: sandbox ? clientSecretHomolog : clientSecretProd,
  certificate: sandbox ? certificateHomolog : certificateProd,
  sandbox,
  cache: true,
};
`;
}

function buildTsCertificateConverter() {
  return `import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const certificatePath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, "developmentCertificate.p12");

const certificate = fs.readFileSync(certificatePath);
console.log(certificate.toString("base64"));
`;
}

function buildCjsCertificateConverter() {
  return `const fs = require("node:fs");
const path = require("node:path");

const certificatePath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, "developmentCertificate.p12");

const certificate = fs.readFileSync(certificatePath);
console.log(certificate.toString("base64"));
`;
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function generate() {
  if (!fs.existsSync(PHP_EXAMPLES_ROOT)) {
    throw new Error(`PHP examples directory not found: ${PHP_EXAMPLES_ROOT}`);
  }

  fs.rmSync(OUTPUT_ROOT, { recursive: true, force: true });
  ensureDir(TS_ROOT);
  ensureDir(CJS_ROOT);

  writeFile(path.join(CJS_ROOT, 'package.json'), '{\n  "type": "commonjs"\n}\n');

  const files = walk(PHP_EXAMPLES_ROOT);

  for (const file of files) {
    const relativePath = path.relative(PHP_EXAMPLES_ROOT, file);
    const parsed = path.parse(relativePath);

    if (parsed.ext === '.p12') {
      const buffer = fs.readFileSync(file);
      writeFile(path.join(TS_ROOT, relativePath), buffer);
      writeFile(path.join(CJS_ROOT, relativePath), buffer);
      continue;
    }

    if (relativePath === path.join('credentials', 'options.php')) {
      writeFile(path.join(TS_ROOT, 'credentials', 'options.ts'), buildTsOptions());
      writeFile(path.join(CJS_ROOT, 'credentials', 'options.js'), buildCjsOptions());
      continue;
    }

    if (relativePath === path.join('credentials', 'certificate_converter.php')) {
      writeFile(path.join(TS_ROOT, 'credentials', 'certificate_converter.ts'), buildTsCertificateConverter());
      writeFile(path.join(CJS_ROOT, 'credentials', 'certificate_converter.js'), buildCjsCertificateConverter());
      continue;
    }

    if (parsed.ext !== '.php') continue;

    const source = fs.readFileSync(file, 'utf8');
    writeFile(path.join(TS_ROOT, relativePath.replace(/\.php$/, '.ts')), buildTsExample(relativePath, source));
    writeFile(path.join(CJS_ROOT, relativePath.replace(/\.php$/, '.js')), buildCjsExample(relativePath, source));
  }
}

generate();
