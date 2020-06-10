import fs from 'fs';
import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import replace from 'rollup-plugin-replace';
import readPkgUp from 'read-pkg-up';

const { packageJson: pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});

// we don't want to bundle any external dependencies.
// therefore, here we add any "react-in" imports, so that
// we don't get unresolved depenency errors from rollup
// we also add the @emotion deps as they are already included in
// @emotion/core and @emotion/styled
const ignoredExternals = [
  // reachInImports
  'react-select/async-creatable',
  'react-select/async',
  'react-select/creatable',
  'dom-helpers/scrollbarSize',
  // lodash reachIns
  'lodash/omit',
  'lodash/isNil',
  'lodash/has',
  'lodash/has',
  'lodash/pick',
  'lodash/flatMap',
  'lodash/sortBy',
  'lodash/isEqual',
  'lodash/uniq',
  'lodash/memoize',
  'lodash/uniqueId',
  // others
  '@emotion/css',
  '@emotion/styled-base',
];

// NOTE: the order of the plugins is important!
const rollupPlugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.npm_package_version': JSON.stringify(
      process.env.npm_package_version
    ),
  }),
  // See also https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953
  // Transpile sources using our custom babel preset.
  babel({
    exclude: path.join(__dirname, '/node_modules/**'),
    runtimeHelpers: true,
    rootMode: 'upward',
  }),
  // To convert CJS modules to ES6
  commonjs({
    include: path.join(__dirname, '/node_modules/**'),
  }),
  // To convert JSON files to ES6
  json(),
  // To remove comments, trim trailing spaces, compact empty lines,
  // and normalize line endings
  cleanup(),
].filter(Boolean);

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});
const defaultExternal = deps.concat(peerDeps).concat(ignoredExternals);

const createConfig = (cliArgs) => {
  return {
    input: cliArgs.input,
    external: defaultExternal,
    treeshake: { moduleSideEffects: false },
    onwarn(warning, warn) {
      // skip certain warnings
      if (
        warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
        (warning.source === 'react' || warning.source === '@emotion/core')
      )
        return;

      // always throw when unresolved import
      if (warning.code === 'UNRESOLVED_IMPORT') {
        throw new Error(warning.message);
      }
      // Use default for everything else
      warn(warning);
    },
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'esm',
      },
    ],
    plugins: rollupPlugins,
  };
};

export default createConfig;
