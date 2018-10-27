/* eslint-disable no-console */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

const twoMinutesAgo = Date.now() - 2 * 60 * 1000;
if (!info) {
  // We can only start ui-kit when it was built first
  console.info(
    '\x1b[33m%s\x1b[0m', // log in yellow
    '⚠️  You need to run "yarn build" or "yarn build:watch" before starting the playground!'
  );
  process.exit(0);
} else if (info.mtime < twoMinutesAgo) {
  console.info(
    '\x1b[33m%s\x1b[0m', // log in yellow
    "⏳  The ui-kit build is more than two minutes old! Are you sure you're running on the latest version?"
  );
}

module.exports = {
  mode: 'development',
  stats: 'minimal',
  entry: './playground/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          // Avoid "Note: The code generator has deoptimised the styling of .."
          // warning as the ui-kit is too big to optimize.
          query: { compact: true },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'UI Kit Playground',
    }),
  ],
  resolve: {
    alias: {
      'ui-kit': path.resolve(__dirname, '..'),
    },
  },
};
