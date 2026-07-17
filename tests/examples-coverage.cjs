const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const ROOT_DIR = path.resolve(__dirname, '..');
const EXAMPLES_DIRS = [path.join(ROOT_DIR, 'examples', 'ts'), path.join(ROOT_DIR, 'examples', 'cjs')];
const WRAPPER_FILE = path.join(ROOT_DIR, 'src', 'wrapper.ts');

const INTENTIONALLY_UNDOCUMENTED_METHODS = new Set([
  'accountConfigWebhook',
  'accountDeleteWebhook',
  'accountDetailWebhook',
  'accountListWebhook',
  'createAccount',
  'createAccountCertificate',
  'getAccountCredentials',
]);

function walk(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) return walk(fullPath);
    if (entry.isFile()) return [fullPath];
    return [];
  });
}

function getPublicMethods() {
  const source = fs.readFileSync(WRAPPER_FILE, 'utf8');
  const sourceFile = ts.createSourceFile(WRAPPER_FILE, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const methods = new Set();

  for (const statement of sourceFile.statements) {
    if (!ts.isClassDeclaration(statement) || statement.name?.text !== 'EfiPay') continue;

    for (const member of statement.members) {
      if (!ts.isMethodDeclaration(member) || !ts.isIdentifier(member.name)) continue;
      const isPrivate = member.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.PrivateKeyword);
      if (!isPrivate) methods.add(member.name.text);
    }
  }

  return [...methods].sort();
}

function getCoveredMethods() {
  const files = EXAMPLES_DIRS.flatMap((directory) => walk(directory));
  const covered = new Set();
  const anyUsages = [];

  for (const file of files) {
    if (!['.ts', '.js'].includes(path.extname(file))) continue;

    const contents = fs.readFileSync(file, 'utf8');
    const sourceFile = ts.createSourceFile(
      file,
      contents,
      ts.ScriptTarget.Latest,
      true,
      path.extname(file) === '.ts' ? ts.ScriptKind.TS : ts.ScriptKind.JS,
    );

    function visit(node) {
      if (path.extname(file) === '.ts' && node.kind === ts.SyntaxKind.AnyKeyword) {
        const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        anyUsages.push(`${path.relative(ROOT_DIR, file)}:${position.line + 1}`);
      }

      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === 'efipay'
      ) {
        covered.add(node.expression.name.text);
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
  }

  if (anyUsages.length > 0) {
    throw new Error([
      'Examples TypeScript nao devem usar any:',
      ...anyUsages.map((usage) => `- ${usage}`),
    ].join('\n'));
  }

  return covered;
}

const publicMethods = getPublicMethods();
const coveredMethods = getCoveredMethods();
const missingMethods = publicMethods.filter((method) => !coveredMethods.has(method) && !INTENTIONALLY_UNDOCUMENTED_METHODS.has(method));
const documentedAccountMethods = [...INTENTIONALLY_UNDOCUMENTED_METHODS].filter((method) => coveredMethods.has(method));

if (documentedAccountMethods.length > 0) {
  throw new Error([
    'Metodos de accounts nao devem possuir exemplos por decisao de escopo:',
    ...documentedAccountMethods.map((method) => `- ${method}`),
  ].join('\n'));
}

if (missingMethods.length > 0) {
  throw new Error([
    'Metodos publicos sem exemplo correspondente:',
    ...missingMethods.map((method) => `- ${method}`),
  ].join('\n'));
}

console.log(`Metodos publicos cobertos por examples: ${publicMethods.length - INTENTIONALLY_UNDOCUMENTED_METHODS.size}.`);
console.log('Metodos de accounts intencionalmente sem examples:');
for (const method of [...INTENTIONALLY_UNDOCUMENTED_METHODS].sort()) {
  console.log(`- ${method}`);
}
