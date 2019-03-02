const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const { stripIndents } = require('common-tags');
const prettier = require('prettier');
const rcfile = require('rcfile');

const importPath = path.join(__dirname, '../src/components/icons/svg/*.svg');
const exportPath = path.join(__dirname, '../src/components/icons/index.js');
const iconFileExt = '.react.svg';

glob(importPath, (err, files) => {
  const importStatements = files.reduce((importsString, fileName) => {
    const baseName = path.basename(fileName);
    const componentName = upperFirst(
      camelCase(path.basename(fileName, iconFileExt))
    );
    return stripIndents`
      ${importsString}
      import Orig${componentName}Icon from './svg/${baseName}';
    `;
  }, "import createStyledIcon from './create-styled-icon';");
  const delarationStatements = files.reduce(
    (declarationStatement, fileName) => {
      const componentName = upperFirst(
        camelCase(path.basename(fileName, iconFileExt))
      );
      const displayName = `${componentName}Icon`;
      return stripIndents`
        ${declarationStatement}
        export const ${displayName} = createStyledIcon(Orig${displayName}, '${displayName}');
      `;
    },
    ''
  );
  const iconsFile = `
    // This file is auto-generated using the 'generate-icon-exports.js' script
    // so any changes made to this file manually will be lost the next time the
    // script is executed
    ${importStatements}

    ${delarationStatements}
  `;
  const prettierConfig = rcfile('prettier');

  fs.writeFileSync(exportPath, prettier.format(iconsFile, prettierConfig));
});
