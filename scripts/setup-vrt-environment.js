const fs = require('fs');
const path = require('path');
const glob = require('glob');
const shelljs = require('shelljs');
const camelCase = require('lodash/camelCase');
const { stripIndents } = require('common-tags');
const prettier = require('prettier');
const rcfile = require('rcfile');
const pkg = require('../package.json');

// Manually "install" ui-kit package to node_modules
shelljs.rm('-rf', 'node_modules/@commercetools-frontend/ui-kit');
shelljs.mkdir('-p', 'node_modules/@commercetools-frontend/ui-kit');
shelljs.exec('npm pack');
shelljs.exec(
  `tar -xvzf commercetools-frontend-ui-kit-${
    pkg.version
  }.tgz --strip 1 -C node_modules/@commercetools-frontend/ui-kit`
);

// Generate a 'routes.js' file contains exports of all the visualroute modules
const importPath = path.join(
  __dirname,
  '../src/components/**/*.visualroute.js'
);
const exportPath = path.join(__dirname, '../visual-testing-app/src/routes.js');

glob(importPath, (err, files) => {
  const importStatements = files.reduce((importsString, fileName) => {
    const baseName = path.basename(fileName, '.visualroute.js');
    const componentName = camelCase(baseName);
    const displayName = `${componentName}Route`;
    const relativeRootPath = fileName.split('ui-kit/')[1].replace('.js', '');
    return stripIndents`
      ${importsString}
      import * as original${displayName} from '../../${relativeRootPath}';
    `;
  }, '');
  const delarationStatements = files.reduce(
    (declarationStatement, fileName) => {
      const baseName = path.basename(fileName, '.visualroute.js');
      const componentName = camelCase(baseName);
      const displayName = `${componentName}Route`;
      return stripIndents`
        ${declarationStatement}
        export const ${displayName} = original${displayName};
      `;
    },
    ''
  );
  const routesFile = `
    // This file is auto-generated using the 'setup-vrt-environment.js' script
    // so any changes made to this file manually will be lost the next time the
    // script is executed
    ${importStatements}

    ${delarationStatements}
  `;
  const prettierConfig = rcfile('prettier');

  fs.writeFileSync(exportPath, prettier.format(routesFile, prettierConfig));
});
