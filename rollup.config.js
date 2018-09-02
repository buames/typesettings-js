import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'

const pkg = require(path.resolve(process.cwd(), './package.json')) // eslint-disable-line

const config = {
  input: './src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve()
  ]
}

if (process.env.UMD) {
  config.plugins.push(uglify())
  config.output = [
    {
      file: './dist/index.umd.min.js',
      format: 'umd',
      name: pkg.name
    }
  ]
}

export default config
