import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import sass from 'rollup-plugin-sass';
import resolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

export default {
  input: 'src/lib/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: [
    'react',
    'react-dom',
    'prop-types'
  ],
  plugins: [
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json']
    }),
    sass(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs()
  ]
}
