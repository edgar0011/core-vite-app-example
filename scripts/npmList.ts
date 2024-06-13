// import { promises as fs } from 'fs';
// import path from 'path';
import pckg from '../package.json';


// const pckg = path.resolve(__dirname, '../package.json');

(async (): Promise<void> => {
  console.log('pckg.dependencies', pckg.dependencies)

  let strDependencies = ''
  let strDevDependencies = ''

  Object.entries(pckg.dependencies).forEach(([lib, version]: [string, string]) => {
    strDependencies += `${lib}; ${version}\n`
  })

  Object.entries(pckg.devDependencies).forEach(([lib, version]: [string, string]) => {
    strDevDependencies += `${lib}; ${version}\n`
  })

  console.log('strDependencies')
  console.log(strDependencies)
  console.log('strDevDependencies')
  console.log(strDevDependencies)
})()
