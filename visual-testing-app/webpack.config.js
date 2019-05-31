/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    '⚠️  You need to run "yarn build" or "yarn build:watch" before starting the visual testing app!'
  );
  process.exit(0);
}

module.exports = {
  target: 'web',
  // note: we have to use 'development' for now, because when we use production
  // our emotion styles aren't displayed in our percy snapshots.
  mode: 'development',
  stats: 'minimal',
  entry: './visual-testing-app/src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -20,
        },
        'ui-kit': {
          test: /ui-kit.esm/,
          name: 'ui-kit',
          chunks: 'all',
          priority: -15,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/(node_modules)/, /(ui-kit.esm)/],
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
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'visual-testing-app/index.html',
    }),
  ],
};
