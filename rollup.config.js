import fs from 'fs';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import peerDeps from 'rollup-plugin-peer-deps-external';
import builtins from 'rollup-plugin-node-builtins';
import readPkgUp from 'read-pkg-up';

const getBabelPreset = require('./babel.config');

const { packageJson: pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});
const packageName = pkg.name.replace(
  /^@commercetools-([\w-]+)\/([\w-]+)$/,
  '$2'
);
const extensions = ['.js', '.ts', '.tsx'];
const babelOptions = getBabelPreset();

// NOTE: the order of the plugins is important!
const createPlugins = (format) => {
  const isFormatEs = format === 'es';
  return [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    peerDeps({
      includeDependencies: true,
    }),
    babel({
      extensions,
      babelHelpers: 'runtime',
      ...babelOptions,
      plugins: [
        ...babelOptions.plugins,
        isFormatEs && [
          'transform-rename-import',
          {
            replacements: [{ original: 'lodash', replacement: 'lodash-es' }],
          },
        ],
      ].filter(Boolean),
    }),
    // To convert CJS modules to ES6
    commonjs({
      include: path.join(__dirname, '/node_modules/**'),
    }),
    nodeResolve({
      extensions,
      mainFields: isFormatEs ? ['module', 'main', 'jsnext'] : ['main'],
      preferBuiltins: true,
      modulesOnly: true,
    }),
    json({ namedExports: false }),
    builtins(),
  ].filter(Boolean);
};

const createConfig = (cliArgs) => {
  return [
    // Bundle for cjs format
    {
      input: cliArgs.input,
      treeshake: { moduleSideEffects: false },
      output: {
        format: 'cjs',
        // Determine by the existence of the `--dir` option if the bundle should generate
        // multiple chunks, as `--file` and `--dir` cannot be used together.
        ...(cliArgs.dir
          ? {
              chunkFileNames: `${packageName}-[name]-[hash].cjs.js`,
              entryFileNames: `${packageName}-[name].cjs.js`,
            }
          : {
              file: `dist/${packageName}.cjs.js`,
            }),
        sourcemap: true,
      },
      plugins: createPlugins('cjs'),
    },
    // Bundle for es format
    {
      input: cliArgs.input,
      treeshake: { moduleSideEffects: false },
      output: {
        format: 'es',
        // Determine by the existence of the `--dir` option if the bundle should generate
        // multiple chunks, as `--file` and `--dir` cannot be used together.
        ...(cliArgs.dir
          ? {
              chunkFileNames: `${packageName}-[name]-[hash].es.js`,
              entryFileNames: `${packageName}-[name].es.js`,
            }
          : {
              file: `dist/${packageName}.es.js`,
            }),
        sourcemap: true,
      },
      plugins: createPlugins('es'),
    },
  ];
};

export default createConfig;
