import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

const getBabelPreset = require('./scripts/get-babel-preset');

// we don't want to bundle any external dependencies.
// therefore, here we add any "react-in" imports, so that
// we don't get unresolved depenency errors from rollup
const reachInImports = [
  'react-select/async-creatable',
  'react-select/async',
  'react-select/creatable',
  'dom-helpers/scrollbarSize',
];

const babelOptions = getBabelPreset();

// This list includes common plugins shared between each output format.
// NOTE: the order of the plugins is important!
const configureRollupPlugins = (options = {}) =>
  [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.npm_package_version': JSON.stringify(
        process.env.npm_package_version
      ),
    }),
    // See also https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953
    // Transpile sources using our custom babel preset.
    babel({
      exclude: ['node_modules/**'],
      runtimeHelpers: true,
      ...babelOptions,
      plugins: [
        ...babelOptions.plugins,
        ...(options.babel && options.babel.plugins
          ? options.babel.plugins
          : []),
      ],
    }),
    // To convert CJS modules to ES6
    commonjs({
      include: 'node_modules/**',
    }),
    // To convert JSON files to ES6
    json(),
    // To remove comments, trim trailing spaces, compact empty lines,
    // and normalize line endings
    cleanup(),
  ].filter(Boolean);

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});
const defaultExternal = deps.concat(peerDeps).concat(reachInImports);

// We need to define 2 separate configs (`esm` and `cjs`) so that each can be
// further customized.
const config = [
  {
    input: 'src/index.js',
    external: defaultExternal,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    plugins: configureRollupPlugins(),
  },
  {
    input: 'src/index.js',
    external: defaultExternal,
    output: {
      file: pkg.module,
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
