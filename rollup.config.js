import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import builtins from 'rollup-plugin-node-builtins';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import postcssReporter from 'postcss-reporter';
import cleanup from 'rollup-plugin-cleanup';
import replace from 'rollup-plugin-replace';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssCustomMediaQueries from 'postcss-custom-media';
import postcssColorModFunction from 'postcss-color-mod-function';
import postcssDiscardComments from 'postcss-discard-comments';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import svgrPlugin from '@svgr/rollup';
import pkg from './package.json';

const babelOptions = require('./scripts/get-babel-preset');

// Inspired by https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.prod.js
const browserslist = {
  production: [
    '>1%',
    'last 2 versions',
    'Firefox ESR',
    'not op_mini all',
    'ie 11',
  ],
};

const postcssPlugins = [
  postcssImport(),
  postcssPresetEnv({
    browsers: browserslist.production,
    autoprefixer: { grid: true },
  }),
  postcssCustomMediaQueries(),
  postcssColorModFunction(),
  // we need to place the postcssDiscardComments BEFORE postcssCustomProperties,
  // otherwise we will end up with a bunch of empty :root elements
  // wherever there are imported comments
  // see https://github.com/postcss/postcss-custom-properties/issues/123
  // and https://github.com/commercetools/ui-kit/pull/173
  postcssDiscardComments(),
  postcssCustomProperties({
    preserve: false,
    importFrom: 'materials/imports.css',
  }),
  postcssReporter(),
];

// This list includes common plugins shared between each output format.
// NOTE: the order of the plugins is important!
const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  // To use the nodejs `resolve` algorithm
  resolve(),
  // For shimming nodejs builtins
  builtins(),
  // To automatically externalize `peerDependencies` and `dependencies`
  // so that they do not end up in the bundle.
  // See also https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953
  peerDepsExternal({
    dependencies: true,
  }),
  // Transpile sources using our custom babel preset.
  babel({
    exclude: ['node_modules/**'],
    runtimeHelpers: true,
    ...babelOptions(),
  }),
  // To convert CJS modules to ES6
  commonjs({
    include: 'node_modules/**',
    // Explicitly specify "unresolvable" named exports
    // https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
    namedExports: {
      'node_modules/react/index.js': [
        'Children',
        'Component',
        'createElement',
        'isValidElement',
      ],
      'node_modules/react-is/index.js': ['isValidElementType'],
      'node_modules/flatpickr/dist/l10n/de.js': ['German'],
    },
  }),
  // To convert JSON files to ES6
  json(),
  // To convert CSS modules files to ES6
  postcss({
    include: ['**/*.mod.css'],
    // Normal CSS will be handled separately (see below)
    exclude: ['node_modules/**/*.css'],
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]',
    plugins: postcssPlugins,
  }),
  // To convert "normal" CSS files to ES6, usually from vendors
  postcss({
    exclude: ['**/*.mod.css'],
    include: ['**/*.css'],
    // literally the only reason we have this, is because of the `select.css` file
    // or else we would not need to include any plugins as this would
    // just be vendor (plain) css.
    plugins: postcssPlugins,
  }),
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

// We need to define 2 separate configs (`esm` and `cjs`) so that each can be
// further customized.
const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.module,
      format: 'esm',
    },
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  plugins,
};

export default config;
