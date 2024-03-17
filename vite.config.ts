import path from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/vite-pixi-ts', // remove for using root
  plugins: [UnoCSS()],
  build: {
    cssMinify: 'esbuild',
    minify: true,
  },
  resolve: {
    alias: {
      '#pixi': path.resolve(__dirname, './src/pixi/'),
      '#src': path.resolve(__dirname, './src/'),
      '#root': __dirname,
    },
  },
})
