/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

// Ensure UI Kit build (ui-kit.esm.js) exists
// and warn in case it is old.
const info = (() => {
  try {
    return fs.statSync('./dist/ui-kit.esm.js');
  } catch (e) {
    return null;
  }
})();

if (!info) {
  // We can only start ui-kit when it was built first
  console.info(
    '\x1b[33m%s\x1b[0m', // log in yellow
    '⚠️  You need to run "yarn build" or "yarn build:watch" before starting the playground!'
  );
  process.exit(0);
}

module.exports = {
  mode: 'development',
  stats: 'minimal',
  entry: './vrt-examples/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(\.example.js|js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            compact: true,
            presets: [require.resolve('../scripts/get-babel-preset')],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      'ui-kit': path.resolve(__dirname, '..'),
    },
  },
};
