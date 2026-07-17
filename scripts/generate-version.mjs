import { readFile, writeFile } from 'node:fs/promises';

const packageFile = new URL('../package.json', import.meta.url);
const versionFile = new URL('../src/version.ts', import.meta.url);
const packageJson = JSON.parse(await readFile(packageFile, 'utf8'));

if (typeof packageJson.version !== 'string' || packageJson.version.length === 0) {
  throw new Error('package.json deve declarar uma versao valida.');
}

const source = `// Generated from package.json by scripts/generate-version.mjs.\nexport const PACKAGE_VERSION = ${JSON.stringify(packageJson.version)};\n`;
await writeFile(versionFile, source);
