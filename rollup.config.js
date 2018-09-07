import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg';
import builtins from 'rollup-plugin-node-builtins';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import postcssReporter from 'postcss-reporter';
import copy from 'rollup-plugin-copy';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssCustomMediaQueries from 'postcss-custom-media';
import postcssPostcssColorModFunction from 'postcss-color-mod-function';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import svgrPlugin from '@svgr/rollup';
import babelOptions from '@commercetools-frontend/babel-preset-mc-app';
import pkg from './package.json';

const browserslist = {
  development: ['chrome', 'firefox'].map(
    browser => `last 2 ${browser} versions`
  ),
  production: ['>1%', 'not op_mini all', 'ie 11'],
};

const postcssPlugins = [
  postcssImport(),
  postcssPresetEnv({
    browsers: browserslist.development,
    autoprefixer: { grid: true },
  }),
  postcssCustomProperties({
    preserve: false,
  }),
  postcssCustomMediaQueries(),
  postcssPostcssColorModFunction(),
  postcssReporter(),
];

const basePlugins = [
  peerDepsExternal(),
  builtins(),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/react-is/index.js': ['isValidElementType'],
      'node_modules/flatpickr/dist/l10n/de.js': ['German'],
    },
  }),
  resolve(),
  // this is used for importing our css modules
  postcss({
    include: ['**/*.mod.css'],
    exclude: ['node_modules/**/*.css'],
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]',
    plugins: postcssPlugins,
  }),
  // this is used for importing both vendor css (from node_modules) and for importing
  // our global css which uses tokens that require postcss plugins (such as color-mod) to be compiled properly.
  postcss({
    exclude: ['**/*.mod.css'],
    include: ['**/*.css'],
    plugins: postcssPlugins,
  }),
  babel({
    exclude: ['node_modules/**'],
    runtimeHelpers: true,
    ...babelOptions(),
  }),
  json(),
  svg({
    include: ['**/*.svg'],
    exclude: ['**/*.react.svg'],
  }),
  svgrPlugin({
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
  copy({
    'proxy-exports': 'dist',
  }),
];

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
    },
    plugins: basePlugins,
  },
];
