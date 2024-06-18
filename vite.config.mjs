import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from 'rollup-plugin-replace'
import tsconfigPaths from 'vite-tsconfig-paths'
import { createHtmlPlugin } from 'vite-plugin-html'
import { replaceCodePlugin } from 'vite-plugin-replace'
import basicSsl from '@vitejs/plugin-basic-ssl'
import shelljs from 'shelljs'
import dotenv from 'dotenv'

import { dependencies, name, version, homepage } from './package.json'

const NODE_ENV = process.env.NODE_ENV || 'production'
const isProd = NODE_ENV === 'production'


const host = dotenv.config()?.parsed?.HOST
const basePath = dotenv.config()?.parsed?.PUBLIC_URL || homepage

const { stdout: lastCommit } = shelljs.exec('git rev-parse --short HEAD', { silent: true })

console.log('lastCommit', lastCommit)

const forceGeneratingSourceMaps = process.argv.includes('source-maps')

const versionToken = `[${version}, "${lastCommit}"]`

const nonChunks = ['react', 'react-dom',
  'reselect', 'react-router-dom', 'dayjs',
]

function renderChunks(deps) {
  const chunks = {}

  Object.keys(deps).forEach((key) => {
    if (nonChunks.includes(key)) { return }
    chunks[`chunk-${key}`] = [key]
  })
  return chunks
}

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    createHtmlPlugin({
      minify: false,
      inject: {
        data: {
          stratAppName: name,
          stratAppVersion: versionToken,
          stratAppEntry: '/src/main.tsx',
          basePath: `${basePath}`,
        },
      },
    }),
    replaceCodePlugin({
      replacements: [
        {
          from: /CMF_APP_VERSION/g,
          to: versionToken,
        },
        {
          from: /CMF_APP/g,
          to: name,
        },
        {
          from: /CMF_CONFIG_BASE_PATH/g,
          to: process.env.VITE_BASE || `${basePath}`,
        },
      ],
    }),
    isProd ? null : basicSsl(),
  ],
  server: {
    port: 3000,
    hot: true,
    host,
  },
  base: process.env.VITE_BASE || `${basePath}`,
  esbuild: {
    drop: isProd ? ['console', 'debugger'] : [],
  },
  build: {
    minify: 'terser',
    assetsInlineLimit: 0,
    outDir: 'dist',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: forceGeneratingSourceMaps || !isProd,
    rollupOptions: {
      output: {
        manualChunks: {
          'chunk-react': ['react', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        }),
      ],
    },
  },
})

