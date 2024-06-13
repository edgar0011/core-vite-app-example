import path from 'path'

import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import replace from 'rollup-plugin-replace'
import { replaceCodePlugin } from 'vite-plugin-replace'
import externalGlobals from 'rollup-plugin-external-globals'

import pckg from './package.json'
import { minifyEs } from './vite.plugins'


const NODE_ENV = process.env.NODE_ENV || 'production'


export default defineConfig({
  plugins: [
    tsconfigPaths(),
    reactPlugin(),
    replaceCodePlugin({
      replacements: [
        {
          from: /CMF_APP_VERSION/g,
          to: pckg.version,
        },
        {
          from: /CMF_APP/g,
          to: pckg.name,
        },
      ],
    }),
    minifyEs(),
  ],
  server: {
    port: 2000,
    hot: true,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    minify: 'terser',
    assetsInlineLimit: 0,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    lib: {
      entry: path.resolve(__dirname, 'src/main-lib.tsx'),
      name: 'bundle',
      formats: ['es', 'umd', 'esm'],
      fileName: (format) => {
        if (format === 'es') {
          return 'bundle-lib.js'
        }
        if (format === 'esm') {
          return 'bundle-lib.min.js'
        }
        return `bundle-lib.${format}.js`
      },
    },
    sourcemap: false,
    rollupOptions: {
      input: 'src/main-lib.tsx',
      preserveEntrySignatures: true,
      output: {
        dir: 'dist/runtime-lib-bundle',
        assetFileNames: 'bundle-lib.css',
        chunkFileNames: 'chunk-[name].js',
        preserveModules: false,
      },
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        }),
        externalGlobals({
          react: 'window.React',
          'react-dom': 'window.ReactDOM',
          'react-dom/client': 'window.ReactDOM.client',
        }),
      ],
    },
  },
})
