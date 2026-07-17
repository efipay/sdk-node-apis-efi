const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const CJS_EXAMPLES_DIR = path.join(ROOT_DIR, 'examples', 'cjs');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    if (entry.isFile()) return [fullPath];
    return [];
  });
}

const files = walk(CJS_EXAMPLES_DIR).filter((file) => file.endsWith('.js')).sort();
const failures = [];

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    failures.push([
      path.relative(ROOT_DIR, file),
      result.stderr.trim() || result.stdout.trim(),
    ].join('\n'));
  }
}

if (failures.length > 0) {
  throw new Error(['Examples CJS com sintaxe invalida:', ...failures].join('\n\n'));
}

console.log(`Sintaxe CJS validada em ${files.length} examples.`);
