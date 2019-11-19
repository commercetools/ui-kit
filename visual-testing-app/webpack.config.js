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
  mode: 'production',
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
      // For svg icons, we want to get them transformed into React components
      // when we import them.
      {
        test: /\.react\.svg$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [require.resolve('../scripts/get-babel-preset')],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              highlightCode: true,
            },
          },
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              // NOTE: disable this and manually add `removeViewBox: false` in the SVGO plugins list
              // See related PR: https://github.com/smooth-code/svgr/pull/137
              icon: false,
              svgoConfig: {
                plugins: [
                  { removeViewBox: false },
                  // Keeps ID's of svgs so they can be targeted with CSS
                  { cleanupIDs: false },
                ],
              },
            },
          },
        ],
      },
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
      // Fix for react-intl
      // https://github.com/formatjs/formatjs/issues/143#issuecomment-518774786
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
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
