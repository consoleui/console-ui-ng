#!/usr/bin/env bash

readonly currentDir=$(cd $(dirname $0); pwd)
cd ${currentDir}
rm -rf publish
cp -r src/consoleui src/__gen_components
# node ./less.convert.js

echo 'Generating entry file using Angular compiler'
$(npm bin)/ngc -p tsconfig-build.json
cd src/__gen_components
find . -iname '*.html' -print0 | cpio -pmd0 ../../publish/src/
find . -iname '*.scss' -print0 | cpio -pmd0 ../../publish/src/
cd ../../
rm -rf src/__gen_components

echo 'Bundling to es module'
export ROLLUP_FORMAT=es
$(npm bin)/rollup -c rollup.config.js
rm -rf publish/src/*.js
rm -rf publish/src/**/*.js
sed -e "s/from '.\//from '.\/src\//g" publish/src/index.d.ts > publish/index.d.ts
# sed -e "s/\":\".\//\":\".\/src\//g" publish/src/index.metadata.json > publish/index.metadata.json
cp publish/src/index.metadata.json publish/index.metadata.json
rm publish/src/index.d.ts publish/src/index.metadata.json

echo 'Transpiling es module to es5'
$(npm bin)/tsc --allowJs --importHelpers --target es5 --module es2015 --outDir publish/esm5 publish/esm15/index.js

echo 'Bundling to umd module'
export ROLLUP_FORMAT=umd
$(npm bin)/rollup -c rollup.config.js

echo 'Minifying umd module'
$(npm bin)/uglifyjs publish/bundles/consoleui.umd.js --output publish/bundles/consoleui.umd.min.js

echo 'Copying package.json'
cp package.json publish/package.json
