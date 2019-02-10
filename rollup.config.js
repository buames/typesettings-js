import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const input = 'src/index.ts'

const typescript = () => ts({
  typescript: require('typescript'),
  useTsconfigDeclarationDir: true
})

export default [
  {
    input,
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      terser()
    ]
  },
  {
    input,
    external: [ 'deepmerge' ],
    plugins: [ typescript() ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
]
