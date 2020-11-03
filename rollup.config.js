import fs from 'fs';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import peerDeps from 'rollup-plugin-peer-deps-external';
import builtins from 'rollup-plugin-node-builtins';
import readPkgUp from 'read-pkg-up';

const { packageJson: pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});
const packageName = pkg.name.replace(/^@commercetools-(\w+)\/(\w+)$/, '$2');
const extensions = ['.js', '.ts', '.tsx'];

// NOTE: the order of the plugins is important!
const rollupPlugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  peerDeps({
    includeDependencies: true,
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
  nodeResolve({
    extensions,
    mainFields: ['module', 'main', 'jsnext'],
    preferBuiltins: true,
    modulesOnly: true,
  }),
  json({ namedExports: false }),
  builtins(),
].filter(Boolean);

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
      plugins: rollupPlugins,
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
      plugins: rollupPlugins,
    },
  ];
};

export default createConfig;
