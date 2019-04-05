import path from 'path';
import glob from 'glob';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import replace from 'rollup-plugin-replace';
import svgrPlugin from '@svgr/rollup';
import pkg from './package.json';

const getBabelPreset = require('./scripts/get-babel-preset');

const componentsFilePaths = glob.sync('src/components/**/index.js', {
  ignore: [
    '**/internals/**',
    '**/icons/**',
    '**/table/*/index.js',
    '**/spacings/*/index.js',
  ],
});
const iconsFilePaths = glob.sync('src/components/icons/generated/*');
const hocsFilePaths = glob.sync('src/hocs/**/index.js');
const entryPoints = {
  index: 'src/index.js',
  customProperties: 'materials/custom-properties.js',
  ...componentsFilePaths.reduce((acc, filePath) => {
    const componentName = path.basename(filePath.replace('index.js', ''));
    return { ...acc, [upperFirst(camelCase(componentName))]: filePath };
  }, {}),
  ...iconsFilePaths.reduce((acc, filePath) => {
    const componentName = path.basename(filePath, '.js');
    return { ...acc, [upperFirst(camelCase(componentName))]: filePath };
  }, {}),
  ...hocsFilePaths.reduce((acc, filePath) => {
    const componentName = path.basename(filePath.replace('index.js', ''));
    return { ...acc, [upperFirst(camelCase(componentName))]: filePath };
  }, {}),
};

const babelOptions = getBabelPreset();

// This list includes common plugins shared between each output format.
// NOTE: the order of the plugins is important!
const configureRollupPlugins = (options = {}) => [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  // To use the nodejs `resolve` algorithm
  resolve(),
  // See also https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953
  // Transpile sources using our custom babel preset.
  babel({
    exclude: ['node_modules/**'],
    runtimeHelpers: true,
    ...babelOptions,
    plugins: [
      ...babelOptions.plugins,
      ...(options.babel && options.babel.plugins ? options.babel.plugins : []),
    ],
  }),
  // To convert CJS modules to ES6
  commonjs({
    include: 'node_modules/**',
  }),
  // To convert JSON files to ES6
  json(),
  // To convert SVG Icons to ES6
  svgrPlugin({
    // NOTE: only the files ending with `.react.svg` are supposed to be
    // converted to React components
    include: ['**/*.react.svg'],
    icon: false,
    svgoConfig: {
      plugins: [
        { removeViewBox: false },
        // Keeps ID's of svgs so they can be targeted with CSS
        { cleanupIDs: false },
      ],
    },
  }),
  // To remove comments, trim trailing spaces, compact empty lines,
  // and normalize line endings
  cleanup(),
];

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});
const defaultExternal = deps.concat(peerDeps);

// We need to define 2 separate configs (`esm` and `cjs`) so that each can be
// further customized.
const config = [
  {
    input: entryPoints,
    external: defaultExternal,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
    },
    plugins: configureRollupPlugins(),
  },
  {
    input: entryPoints,
    external: defaultExternal,
    output: {
      dir: 'dist/esm',
      format: 'esm',
    },
    plugins: configureRollupPlugins({
      babel: {
        plugins: [
          [
            'transform-rename-import',
            {
              replacements: [{ original: 'lodash', replacement: 'lodash-es' }],
            },
          ],
        ],
      },
    }),
  },
];

export default config;
