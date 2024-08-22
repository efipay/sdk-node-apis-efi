// rollup.config.js
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/esm/index.mjs',
      format: 'esm',
    },
    plugins: [
      babel({ 
        babelHelpers: 'bundled',
        comments: true
       }),
      json()
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/cjs/index.cjs',
      format: 'cjs',
      exports: 'default',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        comments: true
      }),
      json()
    ],
  },
];