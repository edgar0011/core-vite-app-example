import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  video: false,
  videoCompression: false,
  videoUploadOnPasses: false,
  reporter: 'cypress-multi-reporters',

  reporterOptions: {
    configFile: 'cypress/reporterOptions.json',
  },

  screenshotsFolder: 'cypress/reports/mochawesome-report/screenshots/',
  fixturesFolder: 'cypress/fixtures',
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 61000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  taskTimeout: 360000,
  projectId: 'core-vite-app-example-qa',
  viewportHeight: 1080,
  viewportWidth: 1920,

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },

  e2e: {
    baseUrl: 'http://localhost:2000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      console.log('on', on)
      console.log('config', config)
    },
  },
})
