import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg';
import builtins from 'rollup-plugin-node-builtins';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import babelOptions from '@commercetools-frontend/babel-preset-mc-app';
import pkg from './package.json';

const path = 'dist/ui-kit';

const external = [
  'classnames',
  'flatpickr',
  'moment',
  'moment-timezones',
  'react',
  'react-if',
  'prop-types',
  'invariant',
  'react-is',
  'react',
  'react-dom',
  'react-router-dom',
  'react-virtualized',
  'react-textarea-autosize',
  'react-intl',
  'recompose',
  'styled-components',
  'reselect',
  'warning',
];

const globals = {
  classnames: 'classNames',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'ReactRouterDOM',
  react: 'React',
};

const basePlugins = [
  builtins(),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/flatpickr/dist/l10n/de.js': ['German'],
    },
  }),
  resolve(),
  postcss({
    modules: true,
  }),
  babel({
    runtimeHelpers: true,
    ...babelOptions(),
  }),
  json(),
  svg(),
];

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
    },
    external,
    plugins: basePlugins,
  },
  {
    input: 'src/index.js',
    output: {
      name: 'ui-kit',
      file: `${path}.js`,
      format: 'cjs',
      globals,
    },
    external,
    plugins: basePlugins,
  },
  {
    input: 'src/index.js',
    output: {
      name: 'ui-kit',
      file: `${path}.umd.js`,
      format: 'umd',
      globals,
    },
    external,
    plugins: basePlugins,
  },
  {
    input: 'src/index.js',
    output: {
      name: 'ui-kit',
      file: `${path}.umd.min.js`,
      format: 'umd',
      globals,
    },
    external,
    plugins: [...basePlugins, uglify({}, minify)],
  },
];
