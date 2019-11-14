const fs = require('fs');
const util = require('util');
const path = require('path');
const glob = require('glob');
const del = require('del');
const svgr = require('@svgr/core').default;

// Convert fs.readFile / writeFile into Promise version of same
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

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

const indexPath = path.join(__dirname, '../src/components/icons/index.js');

const iconFileExt = '.react.svg';

const prettierConfig = rcfile('prettier');

glob(importPath, async (err, files) => {
  await del([rawExportsPath, iconComponentsPath]);
  mkdir(rawExportsPath);
  mkdir(iconComponentsPath);

  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  for (const fileName of files) {
    const componentName = upperFirst(
      camelCase(path.basename(fileName, iconFileExt))
    );

    const svgCode = await readFile(fileName, 'utf8');
    const jsCode = await svgr(
      svgCode,
      {
        icon: true,
        svgoConfig: {
          plugins: [
            { removeViewBox: false },
            // Keeps ID's of svgs so they can be targeted with CSS
            { cleanupIDs: false },
          ],
        },
        plugins: [
          '@svgr/plugin-svgo',
          '@svgr/plugin-jsx',
          '@svgr/plugin-prettier',
        ],
      },
      { componentName }
    );

    await writeFile(
      path.join(rawExportsPath, `/${componentName}.js`),
      prettier.format(jsCode, prettierConfig)
    );

    const displayName = `${componentName}Icon`;

    const importStatement = stripIndents`
      import React from 'react';
      import PropTypes from 'prop-types';
      import { css } from '@emotion/core';
      import { getColor, getSizeStyle } from '../create-styled-icon';
      import ${componentName} from '../raw-components/${componentName}';

      const Component = props => <${componentName} css={css\`
        * {
         fill: \${getColor(props.color)}
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

    await writeFile(
      path.join(iconComponentsPath, `/${componentName}.js`),
      prettier.format(importStatement, prettierConfig)
    );
  }

  const importStatements = files.reduce((importsString, fileName) => {
    const componentName = upperFirst(
      camelCase(path.basename(fileName, iconFileExt))
    );
    return stripIndents`
      ${importsString}
      export { default as ${componentName}Icon } from './components/${componentName}';
    `;
  }, '');

  const iconsFile = `
    // This file is auto-generated using the 'generate-icon-exports.js' script
    // so any changes made to this file manually will be lost the next time the
    // script is executed
    ${importStatements}
  `;

  await writeFile(indexPath, prettier.format(iconsFile, prettierConfig));
});
