#!/usr/bin/env node
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const fsPromises = fs.promises

const pckg = require('../package.json')

const routesConfigFileTarget = path.resolve(__dirname, '../public/routes.config.minimal.json')
const routesConfigFileSource = path.resolve(__dirname, './routes.config.minimal.json')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const replacer = (source) => source
  .replace(/CMF_APP_VERSION/g, pckg.version)
  .replace(/CMF_APP_PATH/g, pckg.name.replace(/\s+/g, '-').toLowerCase())
  .replace(/CMF_APP/g, pckg.name);


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(async function main() {
  let routesConfig = await fsPromises.readFile(routesConfigFileSource, 'utf8')

  routesConfig = replacer(routesConfig)

  await fsPromises.writeFile(routesConfigFileTarget, routesConfig)
}())
