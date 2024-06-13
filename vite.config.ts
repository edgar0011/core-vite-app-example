import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import replace from 'rollup-plugin-replace'
import tsconfigPaths from 'vite-tsconfig-paths'
import { replaceCodePlugin } from 'vite-plugin-replace'

import pckg from './package.json'


const NODE_ENV = process.env.NODE_ENV || 'production'
const isProd = NODE_ENV === 'production'

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
  ],
  server: {
    port: 2000,
    hot: true,
  },
  base: './',
  esbuild: {
    drop: isProd ? ['console', 'debugger'] : [],
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
    rollupOptions: {
      output: {
        manualChunks: {
          'chunk-react': ['react', 'react-dom'],
          ...renderChunks(pckg.dependencies),
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
