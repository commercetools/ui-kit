const fs = require('fs');
const path = require('path');
const glob = require('glob');
const shelljs = require('shelljs');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const { stripIndents } = require('common-tags');
const prettier = require('prettier');
const rcfile = require('rcfile');

const importPath = path.join(__dirname, '../src/components/icons/svg/*.svg');
const mainExportPath = path.join(__dirname, '../src/components/icons/index.js');
const componentsExportPath = path.join(
  __dirname,
  '../src/components/icons/generated'
);
const iconFileExt = '.react.svg';

// Clean up icons
shelljs.rm('-rf', componentsExportPath);
shelljs.mkdir('-p', componentsExportPath);

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

  fs.writeFileSync(mainExportPath, prettier.format(iconsFile, prettierConfig));

  // Additionally, generate one file for each icon
  files.forEach(fileName => {
    const svgBaseName = path.basename(fileName);
    const iconBaseName = path.basename(fileName, iconFileExt);
    const componentName = upperFirst(camelCase(iconBaseName));
    const displayName = `${componentName}Icon`;
    const data = `
    import Orig${componentName}Icon from '../svg/${svgBaseName}';
    import createStyledIcon from '../create-styled-icon';

    export default createStyledIcon(Orig${displayName}, '${displayName}');
    `;
    fs.writeFileSync(
      path.join(componentsExportPath, `${iconBaseName}-icon.js`),
      prettier.format(data, prettierConfig)
    );
  });
});
