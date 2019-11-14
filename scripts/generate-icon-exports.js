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

const importPath = path.join(__dirname, '../src/components/icons/svg/*.svg');

const rawExportsPath = path.join(
  __dirname,
  '../src/components/icons/raw-components/'
);

const iconComponentsPath = path.join(
  __dirname,
  '../src/components/icons/components/'
);

shelljs.exec(`rm -rf ${rawExportsPath} ${iconComponentsPath}`);
shelljs.exec(`mkdir ${rawExportsPath} ${iconComponentsPath}`);

const indexPath = path.join(__dirname, '../src/components/icons/index.js');

const iconFileExt = '.react.svg';

const prettierConfig = rcfile('prettier');

glob(importPath, async (err, files) => {
  files.forEach(fileName => {
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
      path.join(rawExportsPath, `/${fileNameWithoutExtension}.js`),
      prettier.format(jsCode, prettierConfig)
    );

    const displayName = `${componentName}Icon`;

    const importStatement = stripIndents`
      import React from 'react';
      import PropTypes from 'prop-types';
      import { css } from '@emotion/core';
      import { getColor, getSizeStyle } from '../create-styled-icon';
      import ${componentName} from '../raw-components/${fileNameWithoutExtension}';

      const Component = props => <${componentName} {...props} css={theme => css\`
        * {
         fill: \${getColor(props.color, theme)}
       }

       \${getSizeStyle(props.size)}
      \`} />;


      Component.displayName = '${displayName}';

      const componentPropTypes = {
        color: PropTypes.oneOf([
          'solid',
          'neutral60',
          'surface',
          'info',
          'primary',
          'primary40',
          'warning',
          'error',
        ]),
        size: PropTypes.oneOf(['small', 'medium', 'big', 'scale']),
      };

      if (process.env.NODE_ENV !== "production") {
        Component.propTypes = componentPropTypes;
      }

      export default Component;
    `;

    fs.writeFileSync(
      path.join(iconComponentsPath, `/${fileNameWithoutExtension}.js`),
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

  fs.writeFileSync(indexPath, prettier.format(iconsFile, prettierConfig));
});
