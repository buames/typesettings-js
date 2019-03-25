import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true,
      cacheRoot: 'node_modules/.cache/rollup-ts'
    }),
    resolve(),
    terser()
  ]
}
