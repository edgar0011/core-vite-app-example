#!/bin/bash
echo Install NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
source ~/.nvm/nvm.sh
echo Install Node 18.13.0
nvm install 18.13
nvm alias default 18.13.0
nvm use 18.13.0
which node
# npx --yes degit git@github.com:edgar0011/core-vite.git STORYBOOK
rm -rf .portalui-storybook
echo Git clone base-components
git clone git@github.com:edgar0011/core-vite.git .corevite
cd ./.corevite
rm -rf ./.git
npm i
export NODE_OPTIONS=--openssl-legacy-provider
echo Build storybook of base-components
npm run build-storybook
echo Run static storybook of base-components
npx --yes serve ./storybook-static
