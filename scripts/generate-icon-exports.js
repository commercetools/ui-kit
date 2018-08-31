const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('lodash.camelcase');
const upperFirst = require('lodash.upperfirst');
const stripIndents = require('common-tags/lib/stripIndents');
const prettier = require('prettier');
const rcfile = require('rcfile');

const importPath = path.join(__dirname, '../src/components/icons/svg/*.svg');
const exportPath = path.join(__dirname, '../src/components/icons/index.js');

glob(importPath, (err, files) => {
  const importStatements = files.reduce((importsString, fileName) => {
    const baseName = path.basename(fileName);
    const componentName = upperFirst(
      camelCase(path.basename(fileName, '.svg'))
    );
    return stripIndents`
      ${importsString}
      import Orig${componentName}Icon from './svg/${baseName}';
    `;
  }, "import withSizeProp from './with-size-prop';\nimport withThemeProp from './with-theme-prop';");
  const delarationStatements = files.reduce(
    (declarationStatement, fileName) => {
      const componentName = upperFirst(
        camelCase(path.basename(fileName, '.svg'))
      );
      return stripIndents`
      ${declarationStatement}
      const ${componentName}Icon = withThemeProp(withSizeProp(Orig${componentName}Icon));
    `;
    },
    ''
  );
  const displayNameStatements = files.reduce((displayNameString, fileName) => {
    const componentName = upperFirst(
      camelCase(path.basename(fileName, '.svg'))
    );
    return stripIndents`
      ${displayNameString}
      ${componentName}Icon.displayName = '${componentName}Icon';
    `;
  }, '');
  const exportStatements = files.reduce((importsString, fileName) => {
    const componentName = upperFirst(
      camelCase(path.basename(fileName, '.svg'))
    );
    return stripIndents`
      ${importsString}
      export { ${componentName}Icon };
    `;
  }, '');
  const comment = stripIndents`
    // This file is auto-generated using the 'generate-icon-exports.js' script
    // so any changes made to this file manually will be lost the next time the
    // script is executed
  `;
  const iconsFile = `${comment}\n${importStatements}\n\n${delarationStatements}\n\n${displayNameStatements}\n\n${exportStatements}\n`;
  const prettierConfig = rcfile('prettier');

  fs.writeFileSync(exportPath, prettier.format(iconsFile, prettierConfig));
});
