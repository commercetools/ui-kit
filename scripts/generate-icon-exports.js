const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('lodash.camelcase');
const upperFirst = require('lodash.upperfirst');
const stripIndents = require('common-tags/lib/stripIndents');
const prettier = require('prettier');
const rcfile = require('rcfile');

const importPath = path.join(__dirname, '../src/components/icons/svg/*.svg');
const exportPath = path.join(__dirname, '../src/components/icons/exports.js');
const iconFileExt = '.react.svg';

glob(importPath, (err, files) => {
  const importStatements = files.reduce((importsString, fileName) => {
    const baseName = path.basename(fileName);
    const componentName = upperFirst(
      camelCase(path.basename(fileName, iconFileExt))
    );
    return stripIndents`
      ${importsString}
      import Orig${componentName} from './svg/${baseName}';
    `;
  }, "import withSizeProp from './with-size-prop';\nimport withThemeProp from './with-theme-prop';");
  const delarationStatements = files.reduce(
    (declarationStatement, fileName) => {
      const componentName = upperFirst(
        camelCase(path.basename(fileName, iconFileExt))
      );
      // Keep the `Icon` suffix in the `displayName` for better readability
      return stripIndents`
        ${declarationStatement}
        export const ${componentName} = withThemeProp(withSizeProp(Orig${componentName}));
        ${componentName}.displayName = '${componentName}Icon';
      `;
    },
    ''
  );
  const comment = stripIndents`
    // This file is auto-generated using the 'generate-icon-exports.js' script
    // so any changes made to this file manually will be lost the next time the
    // script is executed
  `;
  const iconsFile = `${comment}\n${importStatements}\n\n${delarationStatements}`;
  const prettierConfig = rcfile('prettier');

  fs.writeFileSync(exportPath, prettier.format(iconsFile, prettierConfig));
});
