import { transform } from 'esbuild'

// https://github.com/vitejs/vite/issues/6555#issuecomment-1342664357
export const minifyEs = () => ({
  name: 'minifyEs',
  renderChunk: {
    order: 'post',
    async handler(code, chunk, outputOptions) {
      if (outputOptions.format === 'es' && chunk.fileName.endsWith('.min.js')) {
        // eslint-disable-next-line no-return-await
        return await transform(code, { minify: true })
      }
      return code
    },
  },
})
