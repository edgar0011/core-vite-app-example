# Welcome to vite-app-example 👋
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.7-blue.svg?cacheSeconds=2592000" />
</p>

> ### Starter application/template with UI Enablement libraries and tooling

This repository serves as a template for `ui application`. Please see [create-cmf-app](https://github.com/edgar0011/create-cmf-app) how to initialize.

## other documentation 

- [Folder structure](/docs/folder-structure.md)
- [Devstack](/docs/dev-stack.md)
- [Best Practices](/docs/best-practices.md)

## Table of contents
- [Getting started](#getting-started)
- [Development](#development)
- [Storybook](#storybook)
- [Translations](#translations)
- [New components](#add-a-new-component)
- [Typed scss modules](#typed-scss-modules)
- [Production](#production)
- [Changelog](#changelog)


## Getting started

Prerequisites

- node (>=18 <=18.13.0)
- yarn or npm (depends on choice when using create-cmf-app)

```sh
yarn install
```
## Development

```sh
yarn dev
```

- starts application in development mode at `localhost:2000`

### pre-commit hook
During `git commit` it checks a commit message. 
The message must comply with standard ([Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)). 
e.g. feat(login): adds a new login page 
or feat: adds a new login page

### pre-push hook

During `git push` command are executed following checks, push into repository is possible only if : 
 
- linting for every *.ts, *.tsx, *.js, and *.jsx file 
- typechecking i.e. code have to comply with TypeScript rules from tsconfig.json
- unit tests (every *.test.ts, *.test.tsx, and *.spec.ts file)

We can run prepush checks manually:

```sh
yarn prepush
```

or we can run each check separately: 

#### Linting

Runs ESLint and automatically fixing (fixable) linting issues

```sh
yarn lint
```

#### Tests

- *.spec.ts - unit test
- *.test.tsx - ui test 

```sh
yarn test
```

#### Typechecks

```sh
yarn tsc
```

## Storybook
A development tool for building UI components in isolation. 
It provides a sandbox environment where developers can create, 
document, and test UI components independently of the vite-app-example, 
making component development faster and more efficient.

```sh
yarn storybook
```

## Translations

We use `@e1011/i18n-kit`, a library that facilitates internationalization (i18n) in the vite-app-example
enabling the localization of user interfaces to support multiple languages and regions.

translation files (i.e. locales) should be in json format and stored in `/src/locales`

## Add a new component

We use plop.js to automate the process of creating a new component (React component, 
scss styles, UI test(react-testing-library), and storybook template),
 It helps developers to quickly coreVite repetitive code structures 
and improve code consistency. This approach is highly recommended.

```sh
yarn plop
// first query/prompt: module or path to a  components after components/, e.g. business/info
// second query/prompt: name of component, e.g. Panel
// result is components/business/info/Panel.tsx; 
// ...panel.test.tsx;
// ...panel.module.scss;
// ...
```

## Typed scss modules

Generate TypeScript definitions (.d.ts) files for CSS Modules that are written in SCSS (.scss). This allows developers
to take advantage of Typescript types and reduce errors and mistakes regarding scss classes.

You can automatically generate a type definition for a component or multiple components just running the following command:

```sh
yarn genereate:scss:types
```

## Production

### Production build

```sh
yarn build
```

### Production run 

```sh
yarn start
```

## CMF

- Core Micro Frontend
- system of Micro UI application (e.g. created with this app teamplate) are loaded and rendedred in the main frontend browser app or `CoreVite`

`CMFWrapper` that is WebComponent responsible for rendering this micro ui under shadow dom:
[core-micro-frontend](https://github.com/edgar0011/core-micro-frontend)

```javascript
// access the saved config
window.cmf.getAppConfig('myApp');

// getCMFNamespace() is shorthand for window.cmf
// acces userInfo when loaded in CoreVite:
getCMFNamespace().getAppUserInfo('ui-coreVite');
```


- subscribeUserInfo?: (callback: Callback) => () => boolean
  - subcsribes to the changes of UserInfo (from identity `/principal` endpoint)
- unsubscribeUserInfo?: (callback: Callback) => boolean
  - **unsubscribes** the previous subscribtion
- requestUserInfo?: (callback: Callback) => boolean
  - **triggers** call to `/principal`
- updatePageTitle? (title?: string, overwrite?: boolean): boolean
  - **updates** **page title**, either add to the default title that is controlled by coreVite (CoreVite | `[RouteName]`) or overwrites the complete page title
  - updated page title is seen in html page's head tag and tab/window

### Routes configuration for CoreVite
In order for Scaffodl to load particular micro UI, coreVite must know the route at which load the UI app, and which asset files (.js and .css).
#### routes.config.json
example in this repo [public/routes.config.minimal.json](public/routes.config.minimal.json), please use this file to test the micro ui app in `coreVite` locally.


example of routes.config.json:

```json
{
  "routes": {
    "basePath": "/app",
    "auth": {
      "vite-app-example": {
        "name": "vite-app-example",
        "icon": "applicationsIcon",
        "tooltipText": "vite-app-example",
        "apps": [
          {
            "cssFiles": "[\"http://localhost:2001/bundle.css\"]",
            "jsFiles": "[\"http://localhost:2001/bundle.js\",\"http://localhost:2001/bundle.umd.js\"]",
            "mountId": "ui-vite-app-example",
            "config": "{\"basePath\":\"/app/vite-app-example\"}",
            "loader": true,
            "data-sample-attribute": "some serialized data for vite-app-example"
          }
        ]
      }
    },
    "unauth": {}
  }
}

```

The example of [public/routes.config.minimal.json](public/routes.config.minimal.json) is generated at the moment of creating application with `create-cmf-app`, placeholders in the template are replaced with package name etc.

To regenerate from template (scripts/routes.config.minimal.json):
`npm run build:routes:config`

#### Run in CoreVite

For further info on what is:  [coreVite repo](https://github.com/edgar0011/core-vite/)

How to run coreVite locally in like **node cli (binary)**:
`npx @e1011/coreViteer public/routes.config.minimal.json`

For more details please refer to: [coreVite executor repo](https://github.com/edgar0011/core-vite-executor)



### Production microfrontend build (CMF) to be loaded by CoreVite

```sh
yarn build:cmf
```

### Production run of microfrontend build (CMF), served as static local server

```sh
yarn start:cmf:local
```

## Changelog

for successful generating a changelog is required
- versionrc.json - specification hashmap commit type to name. e.g. fix => Bug Fixes
- having at least one commit with a version number in its commit message.

```yarn changelog:release```

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
