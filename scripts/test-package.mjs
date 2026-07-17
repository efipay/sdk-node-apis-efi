import assert from 'node:assert/strict';
import { execFile as execFileCallback } from 'node:child_process';
import { mkdtemp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFile = promisify(execFileCallback);
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDirectory, '..');
const typescriptBin = path.join(packageRoot, 'node_modules', 'typescript', 'bin', 'tsc');
const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'efi-sdk-package-'));
const projectRoot = path.join(temporaryRoot, 'consumer');

async function run(command, args, cwd = packageRoot) {
  return execFile(command, args, {
    cwd,
    env: {
      ...process.env,
      npm_config_audit: 'false',
      npm_config_fund: 'false',
      npm_config_cache: path.join(temporaryRoot, '.npm-cache'),
    },
    maxBuffer: 10 * 1024 * 1024,
  });
}

try {
  await run('npm', [
    'pack',
    '--ignore-scripts',
    '--pack-destination',
    temporaryRoot,
  ]);
  const tarballName = (await readdir(temporaryRoot)).find((file) => file.endsWith('.tgz'));
  if (!tarballName) throw new Error('npm pack nao gerou um arquivo .tgz');
  const tarballPath = path.join(temporaryRoot, tarballName);
  const { stdout: tarContents } = await run('tar', ['-tzf', tarballPath]);
  const packedFiles = tarContents
    .split('\n')
    .filter(Boolean)
    .map((file) => file.replace(/^package\//, ''));

  for (const requiredFile of [
    'dist/cjs/index.cjs',
    'dist/esm/index.js',
    'dist/types/index.d.ts',
    'README.md',
    'CHANGELOG.md',
    'MIGRATION.md',
    'package.json',
  ]) {
    assert.ok(packedFiles.includes(requiredFile), `Tarball sem ${requiredFile}`);
  }

  const forbiddenFiles = packedFiles.filter((file) => (
    file.startsWith('src/') ||
    file.startsWith('examples/') ||
    file.endsWith('.map')
  ));
  assert.deepEqual(forbiddenFiles, [], `Arquivos indevidos no tarball: ${forbiddenFiles.join(', ')}`);

  await mkdir(path.join(projectRoot, 'cjs'), { recursive: true });
  await mkdir(path.join(projectRoot, 'esm'), { recursive: true });
  await mkdir(path.join(projectRoot, 'ts'), { recursive: true });
  await writeFile(path.join(projectRoot, 'package.json'), JSON.stringify({ private: true, type: 'module' }, null, 2));
  await writeFile(path.join(projectRoot, 'cjs', 'package.json'), JSON.stringify({ type: 'commonjs' }, null, 2));

  await run('npm', ['install', tarballPath, '--ignore-scripts', '--no-audit', '--no-fund'], projectRoot);

  await writeFile(path.join(projectRoot, 'cjs', 'index.js'), `
const EfiPay = require('sdk-node-apis-efi');
const { EfiPay: NamedEfiPay } = require('sdk-node-apis-efi');
if (EfiPay !== NamedEfiPay) throw new Error('CJS exports divergem');
const sdk = new EfiPay({ sandbox: true, client_id: 'id', client_secret: 'secret' });
if (typeof sdk.pixCreateImmediateCharge !== 'function') throw new Error('Metodo CJS ausente');
`);
  await writeFile(path.join(projectRoot, 'esm', 'index.js'), `
import EfiPay, { EfiPay as NamedEfiPay } from 'sdk-node-apis-efi';
if (EfiPay !== NamedEfiPay) throw new Error('ESM exports divergem');
const sdk = new EfiPay({ sandbox: true, client_id: 'id', client_secret: 'secret' });
if (typeof sdk.pixCreateImmediateCharge !== 'function') throw new Error('Metodo ESM ausente');
`);
  await writeFile(path.join(projectRoot, 'ts', 'index.ts'), `
import EfiPay, {
  type PixGetReceiptResponse,
  type PixCreateImmediateChargeBody,
  type SdkOptions,
} from 'sdk-node-apis-efi';

const options: SdkOptions = { sandbox: true, client_id: 'id', client_secret: 'secret' };
const body: PixCreateImmediateChargeBody = {
  calendario: { expiracao: 3600 },
  valor: { original: '1.00' },
  chave: 'pix-key',
};
const sdk = new EfiPay(options);
declare const receipt: PixGetReceiptResponse;
void sdk;
void body;
void receipt;
`);
  await writeFile(path.join(projectRoot, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      module: 'NodeNext',
      moduleResolution: 'NodeNext',
      target: 'ES2020',
      strict: true,
      noEmit: true,
      skipLibCheck: false,
      types: [],
    },
    include: ['ts/**/*.ts'],
  }, null, 2));

  await run(process.execPath, ['cjs/index.js'], projectRoot);
  await run(process.execPath, ['esm/index.js'], projectRoot);
  await run(process.execPath, [typescriptBin, '--project', 'tsconfig.json'], projectRoot);

  console.log(`Tarball validado em CJS, ESM e TypeScript (${packedFiles.length} arquivos).`);
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
