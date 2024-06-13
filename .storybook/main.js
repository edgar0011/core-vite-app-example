import { mergeConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { replaceCodePlugin } from 'vite-plugin-replace'

import pckg from '../package.json'

export default {
  stories: ['../src/components/**/*.mdx', '../src/*.mdx', '../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    '@storybook/addon-themes',
    'storybook-dark-mode',
    '@storybook/addon-storysource',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
    '@storybook/addon-viewport',
    '@storybook/addon-mdx-gfm',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  features: { emotionAlias: false },


  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async viteFinal(config, {
    configType,
  }) {
    const resolvedConfig = {
      ...config,
    }

    if (configType === 'PRODUCTION') {
      resolvedConfig.base = './'
      resolvedConfig.build = {
        ...resolvedConfig.build,
        assetsInlineLimit: 0,
      }
    }
    return mergeConfig(resolvedConfig, {
      plugins: [
        tsconfigPaths(),
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
    })
  },

  // async viteFinal(config) {
  //   const oldReactPlugin = config.plugins
  //   .find((plugin) => {
  //     return (Array.isArray(plugin) && plugin[0].name === 'vite:react-babel')
  //   })
  //   const oldReactPluginIndex = config.plugins.indexOf(oldReactPlugin)
  //   // console.log('config.plugins', config.plugins)
  //   // console.log('oldReactPlugin', oldReactPlugin)
  //   // console.log('oldReactPluginIndex', oldReactPluginIndex)
  //   config.plugins = [
  //     ...config.plugins
  //     .filter((plugin) => {
  //       return !(Array.isArray(plugin) && plugin[0].name === 'vite:react-babel')
  //     }),
  //   ]
  //   config.plugins.splice(oldReactPluginIndex, 0, ...[
  //     tsconfigPaths(),
  //     reactPlugin({
  //       babel: {
  //         assumptions: {
  //           setPublicClassFields: true,
  //         },
  //         plugins: [
  //           ['@babel/plugin-proposal-decorators', { legacy: true }],
  //         ],
  //       },
  //     }),
  //   ])
  //   return config
  // },
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
}
