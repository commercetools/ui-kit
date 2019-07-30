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
const typesExportPath = path.join(__dirname, '../typings/icons.d.ts');
const iconFileExt = '.react.svg';

glob(importPath, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
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
  const declarationStatements = files.reduce(
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

    ${declarationStatements}
  `;
  const prettierConfig = rcfile('prettier');

  fs.writeFileSync(exportPath, prettier.format(iconsFile, prettierConfig));

  const typeDeclarationStatements = files.reduce(
    (typeDeclaration, fileName) => {
      const componentName = upperFirst(
        camelCase(path.basename(fileName, iconFileExt))
      );
      const displayName = `${componentName}Icon`;
      return stripIndents`
        ${typeDeclaration}
        export type ${displayName} = (props: IconProps) => JSX.Element;
      `;
    },
    ''
  );
  const iconTypeDeclarations = `
    // This file is auto-generated using the 'generate-icon-exports.js' script
    // so any changes made to this file manually will be lost the next time the
    // script is executed
    export type IconProps = {
      color?:
        | 'solid'
        | 'neutral60'
        | 'surface'
        | 'info'
        | 'primary'
        | 'primary40'
        | 'warning'
        | 'error';
      size?: 'small' | 'medium' | 'big' | 'scale';
    };
    ${typeDeclarationStatements}
  `;
  fs.writeFileSync(
    typesExportPath,
    prettier.format(iconTypeDeclarations, prettierConfig)
  );
});
