/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const template = require('@babel/template');

const templateCreateStyledIcon = fs.readFileSync(
  path.join(
    __dirname,
    `packages/components/icons/src/templates/icon.styles.tsx`
  ),
  { encoding: 'utf8' }
);

const indexTemplate = (filePaths) => {
  const exportEntries = filePaths.map(({ path: filePath }) => {
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
// https://github.com/gregberge/svgr/blob/c57ee04b19c15a76ae4caf40d1bb82c210d6c398/packages/babel-plugin-transform-svg-component/src/types.ts#L18
const styledIconsTemplate = (variables, context) => {
  const svgComponentName = context.options.state.componentName.replace(
    /react/i,
    ''
  );
  const reactComponentName = `${svgComponentName.replace(/svg/i, '')}Icon`;
  const babelOptions = {
    preserveComments: true,
    placeholderPattern: false,
    placeholderWhitelist: new Set(['JSX']),
    plugins: ['jsx', 'typescript'],
  };
  const templateOptions = { JSX: variables.jsx };

  const code = `// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: ${context.options.state.filePath}

${templateCreateStyledIcon}

const ${svgComponentName} = (props: SVGProps) => JSX;
${svgComponentName}.displayName = "${svgComponentName}";

const ${reactComponentName} = (props: Props) => (
    <ClassNames>
      {({ css: createClass }) =>
        <${svgComponentName} {...props} className={createClass(getIconStyles(props))} />
      }
    </ClassNames>
  );
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
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      'prefixIds',
    ],
  },
  svgProps: { 'aria-hidden': 'true' },
  typescript: true,
  // same as the rollup plugin
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  indexTemplate,
  template: styledIconsTemplate,
};
