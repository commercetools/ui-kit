// NOTE: this script is only necessary as long as we need to support
// proxy exports for backwards compatibility.
const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');
const prettier = require('prettier');
const pick = require('lodash.pick');
const pkg = require('../package.json');

// 1. Copy meta files, materials folder (e.g. images) and ALL proxy-exports into `dist`
const metaFiles = [
  'README.md',
  'CHANGELOG.md',
  'LICENSE',
  'materials',
  'proxy-exports/*',
];
metaFiles.forEach(f => shelljs.cp('-R', f, path.join(__dirname, '../dist/')));
// 2. Copy ALL css module files from materials into `dist`
shelljs.exec(
  "rsync -r --exclude '*.js' --exclude 'spacings/' --exclude 'constraints/' src/materials dist/"
);
// 3. Copy only specific fields of the `package.json`
// This is to avoid problems on executing pre/post scripts
// while publishing from inside the `dist` folder.
const pkgKeysToKeep = [
  'name',
  'version',
  'description',
  'license',
  'private',
  'publishConfig',
  'main',
  'module',
  'dependencies',
  'peerDependencies',
];
const newPkgForNpm = pick(pkg, pkgKeysToKeep);
fs.writeFileSync(
  path.join(__dirname, '../dist/package.json'),
  prettier.format(JSON.stringify(newPkgForNpm), { parser: 'json' }),
  'utf-8'
);
