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
import postcssCustomProperties from 'postcss-custom-properties';
import postcssCustomMediaQueries from 'postcss-custom-media';
import postcssPostcssColorModFunction from 'postcss-color-mod-function';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import { uglify } from 'rollup-plugin-uglify';
// import { minify } from 'uglify-es';
import svgrPlugin from '@svgr/rollup';
import babelOptions from '@commercetools-frontend/babel-preset-mc-app';
import pkg from './package.json';

const browserslist = {
  development: ['chrome', 'firefox'].map(
    browser => `last 2 ${browser} versions`
  ),
  production: ['>1%', 'not op_mini all', 'ie 11'],
};

const basePlugins = [
  peerDepsExternal(),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/react-is/index.js': ['isValidElementType'],
      'node_modules/flatpickr/dist/l10n/de.js': ['German'],
    },
  }),
  builtins(),
  resolve(),
  postcss({
    include: '',
    // exclude: 'node_modules/**',
    modules: true,
    // extract: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]',
    plugins: [
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
    ],
  }),
  babel({
    runtimeHelpers: true,
    ...babelOptions(),
    exclude: 'node_modules/**',
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
