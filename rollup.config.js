import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/content.ts',
  output: { file: 'content.js', format: 'iife' },
  plugins:[resolve(), typescript()]
}