import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('dist/esm', { recursive: true });
await mkdir('dist/cjs', { recursive: true });

await writeFile('dist/esm/package.json', JSON.stringify({ type: 'module' }, null, 2) + '\n');
await writeFile('dist/cjs/package.json', JSON.stringify({ type: 'commonjs' }, null, 2) + '\n');

const bridge = `'use strict';

const mod = require('./internal/index.js');
const EfiPay = mod.default || mod.EfiPay;

module.exports = EfiPay;
Object.defineProperty(module.exports, '__esModule', { value: true });
module.exports.default = EfiPay;
module.exports.EfiPay = EfiPay;

for (const key of Object.keys(mod)) {
  if (!(key in module.exports)) {
    module.exports[key] = mod[key];
  }
}
`;

await writeFile('dist/cjs/index.cjs', bridge);
