/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

const templateCreateStyledIcon = fs.readFileSync(
  path.join(
    __dirname,
    `packages/components/icons/src/templates/icon.styles.tsx`
  ),
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

const annotationsToRemove = [
  '/* eslint-disable @typescript-eslint/no-unused-vars */',
  '// @ts-ignore',
];

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
    placeholderPattern: false,
    placeholderWhitelist: new Set(['JSX']),
    plugins: ['jsx', 'typescript'],
  };
  const templateOptions = { JSX: jsx };

  const code = `// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: ${opts.state.filePath}

${templateCreateStyledIcon}

const ${svgComponentName} = (props: Props) => JSX;
${svgComponentName}.displayName = "${svgComponentName}";

const ${reactComponentName} = (props: Props) => {
  const theme = useTheme();
  return <${svgComponentName} {...props} css={getIconStyles(props, theme)} />
};
${reactComponentName}.displayName = "${reactComponentName}";

export default ${reactComponentName};
  `;
  const codeWithoutUnnecessaryAnnotations = annotationsToRemove.reduce(
    (finalStringTemplate, annotationToRemove) =>
      finalStringTemplate.replace(new RegExp(annotationToRemove, 'g'), ''),
    code
  );
  return template.smart(
    codeWithoutUnnecessaryAnnotations,
    babelOptions
  )(templateOptions);
};

module.exports = {
  icon: false,
  svgoConfig: {
    plugins: [
      {
        removeViewBox: false,
        prefixIds: true,
      },
    ],
  },
  // same as the rollup plugin
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  indexTemplate,
  template: styledIconsTemplate,
};
