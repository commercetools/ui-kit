const fs = require('fs');
const path = require('path');
const glob = require('glob');
const shelljs = require('shelljs');
const svgr = require('@svgr/core').default;
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const { stripIndents } = require('common-tags');
const prettier = require('prettier');
const rcfile = require('rcfile');

const iconFileExt = '.react.svg';
const prettierConfig = rcfile('prettier');

const internalIconsPath = path.join(
  __dirname,
  '../src/components/internals/icons/svg/*.svg'
);

const internalRawExportsPath = path.join(
  __dirname,
  '../src/components/internals/icons/raw-components/'
);

const internalIconComponentsPath = path.join(
  __dirname,
  '../src/components/internals/icons/components/'
);

const internalIndexPath = path.join(
  __dirname,
  '../src/components/internals/icons/index.js'
);

const publicIconsPath = path.join(
  __dirname,
  '../src/components/icons/svg/*.svg'
);

const publicRawExportsPath = path.join(
  __dirname,
  '../src/components/icons/raw-components/'
);

const publicIconComponentsPath = path.join(
  __dirname,
  '../src/components/icons/components/'
);

const publicIndexPath = path.join(
  __dirname,
  '../src/components/icons/index.js'
);

const createStyledIconPath = path.join(
  __dirname,
  '../src/components/internals/icons/create-styled-icon'
);

shelljs.exec(
  `rm -rf ${publicRawExportsPath} ${publicIconComponentsPath} ${internalRawExportsPath} ${internalIconComponentsPath}`
);

shelljs.exec(
  `mkdir ${publicRawExportsPath} ${publicIconComponentsPath} ${internalRawExportsPath} ${internalIconComponentsPath}`
);

const iconsToProcess = [
  {
    indexPath: publicIndexPath,
    svgPath: publicIconsPath,
    rawExportsPath: publicRawExportsPath,
    iconComponentsPath: publicIconComponentsPath,
  },
  {
    indexPath: internalIndexPath,
    svgPath: internalIconsPath,
    rawExportsPath: internalRawExportsPath,
    iconComponentsPath: internalIconComponentsPath,
  },
];

iconsToProcess.forEach((data) => {
  glob(data.svgPath, async (err, files) => {
    const relativeStyledIconPath = path.relative(
      data.iconComponentsPath,
      createStyledIconPath
    );

    files.forEach((fileName) => {
      const fileNameWithoutExtension = path.basename(fileName, iconFileExt);
      const componentName = upperFirst(camelCase(fileNameWithoutExtension));

      const svgCode = fs.readFileSync(fileName, 'UTF-8');
      const jsCode = svgr.sync(
        svgCode,
        {
          icon: false,
          svgoConfig: {
            plugins: [
              { removeViewBox: false },
              { prefixIds: true },
              // same result as rollup plugin
              { prefixIds: { prefix: fileNameWithoutExtension } },

              // Keeps ID's of svgs so they can be targeted with CSS
              { cleanupIDs: false },
            ],
          },
          // same as the rollup plugin
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        },
        { componentName }
      );

      fs.writeFileSync(
        path.join(data.rawExportsPath, `/${fileNameWithoutExtension}.js`),
        prettier.format(jsCode, prettierConfig)
      );

      const displayName = `${componentName}Icon`;

      const importStatement = stripIndents`
        import React from 'react';
        import { getIconStyles, iconPropTypes } from '${relativeStyledIconPath}';
        import ${componentName} from '../raw-components/${fileNameWithoutExtension}';

        const Component = props => <${componentName} {...props} css={theme => getIconStyles(props, theme)} />;

        Component.displayName = '${displayName}';

        // we do this to enable treeshaking
        // please see https://github.com/alex996/react-css-spinners/issues/1
        if (process.env.NODE_ENV !== "production") {
          Component.propTypes = iconPropTypes;
        }

        export default Component;
      `;

      fs.writeFileSync(
        path.join(data.iconComponentsPath, `/${fileNameWithoutExtension}.js`),
        prettier.format(importStatement, prettierConfig)
      );
    });

    const importStatements = files.reduce((importsString, fileName) => {
      const fileNameWithoutExtension = path.basename(fileName, iconFileExt);
      const componentName = upperFirst(camelCase(fileNameWithoutExtension));

      return stripIndents`
        ${importsString}
        export { default as ${componentName}Icon } from './components/${fileNameWithoutExtension}';
      `;
    }, '');

    const iconsFile = `
      // This file is auto-generated using the 'generate-icon-exports.js' script
      // so any changes made to this file manually will be lost the next time the
      // script is executed
      ${importStatements}
    `;

    fs.writeFileSync(
      data.indexPath,
      prettier.format(iconsFile, prettierConfig)
    );
  });
});
