/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

const templateCreateStyledIcon = fs.readFileSync(
  path.join(__dirname, 'templates/icon.styles.js'),
  { encoding: 'utf8' }
);

const indexTemplate = (filePaths) => {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = `${basename.replace(/react/i, 'Icon')}`;
    return `export { default as ${exportName} } from './${basename}'`;
  });
  return [
    `// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.`,
  ]
    .concat(exportEntries)
    .join('\n');
};

// https://react-svgr.com/docs/custom-templates/
const styledIconsTemplate = (
  // API methods provided by Babel
  { template },
  // SVGR options
  opts,
  // Pre-computed values to use (or not) in your templates
  {
    jsx,
    // componentName,
    // imports,
    // exports,
    // props,
  }
) => {
  const svgComponentName = opts.state.componentName.replace(/react/i, '');
  const reactComponentName = `${svgComponentName.replace(/svg/i, '')}Icon`;
  const babelOptions = {
    preserveComments: true,
    plugins: ['jsx', opts.typescript && 'typescript'].filter(Boolean),
  };
  const templateOptions = { JSX: jsx };

  const code = `// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: ${opts.state.filePath}
${templateCreateStyledIcon}

const ${svgComponentName} = (props) => JSX;
${svgComponentName}.displayName = "${svgComponentName}";

const ${reactComponentName} = (props) => {
  const theme = useTheme();
  return <${svgComponentName} {...props} css={getIconStyles(props, theme)} />
};
${reactComponentName}.propTypes = iconPropTypes;

export default ${reactComponentName};
  `;
  return template.smart(code, babelOptions)(templateOptions);
};

module.exports = {
  icon: false,
  svgoConfig: {
    plugins: [
      { removeViewBox: false },
      { prefixIds: true },
      // Keeps ID's of svgs so they can be targeted with CSS
      { cleanupIDs: false },
    ],
  },
  // same as the rollup plugin
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  indexTemplate,
  template: styledIconsTemplate,
};
