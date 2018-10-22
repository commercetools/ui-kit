const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const rcfile = require('rcfile');
const postcss = require('postcss');
const postcssDiscardComments = require('postcss-discard-comments');
const postcssColorModFunction = require('postcss-color-mod-function');
const postcssCustomProperties = require('postcss-custom-properties');
const cssvariables = require('postcss-css-variables');
const postcssImport = require('postcss-import');

const exportPath = path.join(__dirname, '../materials/exports/vars');
const importPath = path.join(__dirname, '../materials/index.css');

const css = fs.readFileSync('materials/index.css', 'utf8');

postcss([
  postcssImport(),
  postcssDiscardComments(),
  postcssColorModFunction(),
  // to transform the imported :roots to actual values
  cssvariables({
    preserve: 'computed',
  }),
  // to export variables to css and js files
  postcssCustomProperties({
    preserve: false,
    exportTo: [`${exportPath}.css`, `${exportPath}.js`],
  }),
])
  .process(css, { from: importPath })
  .then(
    () => {
      const prettierConfig = rcfile('prettier');
      const exportedJs = fs.readFileSync(`${exportPath}.js`, 'utf8');
      const exportedCss = fs.readFileSync(`${exportPath}.css`, 'utf8');
      // format the files with prettier
      fs.writeFileSync(
        `${exportPath}.js`,
        prettier.format(exportedJs, prettierConfig)
      );
      fs.writeFileSync(
        `${exportPath}.css`,
        prettier.format(exportedCss, { ...prettierConfig, parser: 'scss' })
      );
      // eslint-disable-next-line no-console
      console.log(`Materials extracted to \n ${exportPath}`);
    },
    err => {
      // eslint-disable-next-line no-console
      console.log(`Error extracting css`, err);
    }
  );
