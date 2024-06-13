const shell = require('shelljs')

module.exports = function (plop) {
  // controller generator
  plop.setGenerator('Compact component', {
    description: 'Compact component controller logic',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'component module, or path please',
      },
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{module}}/{{name}}.tsx',
        templateFile: 'scripts/plop-templates/cui/compact-component/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{camelCase name}}.types.ts',
        templateFile: 'scripts/plop-templates/cui/compact-component/component.types.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{camelCase name}}.module.scss',
        templateFile: 'scripts/plop-templates/cui/compact-component/component.module.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{camelCase name}}.stories.tsx',
        templateFile: 'scripts/plop-templates/cui/compact-component/component.stories.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{camelCase name}}.test.tsx',
        templateFile: 'scripts/plop-templates/cui/compact-component/component.test.hbs',
      },
      (data) => {
        shell.exec(`npm run generate:scss:types src/components/${data.module}`)

        return 'typed css modules generated'
      },
    ],
  })

  plop.setGenerator('Simple component', {
    description: 'Simple component controller logic',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'component module, or path please',
      },
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{module}}/{{name}}.tsx',
        templateFile: 'scripts/plop-templates/cui/simple-component/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{camelCase name}}.types.ts',
        templateFile: 'scripts/plop-templates/cui/simple-component/component.types.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{camelCase name}}.module.scss',
        templateFile: 'scripts/plop-templates/cui/simple-component/component.module.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{camelCase name}}.stories.tsx',
        templateFile: 'scripts/plop-templates/cui/simple-component/component.stories.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{camelCase name}}.test.tsx',
        templateFile: 'scripts/plop-templates/cui/simple-component/component.test.hbs',
      },
      (data) => {
        shell.exec(`npm run generate:scss:types src/components/${data.module}`)

        return 'typed css modules generated'
      },
    ],
  })

  plop.setGenerator('Screen', {
    description: 'Screen component controller logic',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'component module, or path please',
      },
      {
        type: 'input',
        name: 'name',
        message: 'screen name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/screens/{{module}}/{{name}}.screen.tsx',
        templateFile: 'scripts/plop-templates/screen-component.hbs',
      },
      {
        type: 'add',
        path: 'src/screens/{{module}}/{{camelCase name}}.module.scss',
        templateFile: 'scripts/plop-templates/screen-component.module.scss.hbs',
      },
      (data) => {
        shell.exec(`npm run generate:scss:types src/screens/${data.module}`)

        return 'typed css modules generated'
      },
    ],
  })
}
