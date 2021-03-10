/* eslint-disable no-console */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'production',
  stats: 'minimal',
  entry: path.join(__dirname, '/src/index.js'),
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
          test: /[\\/]packages[\\/]/,
          name: 'ui-kit',
          chunks: 'all',
          minSize: 0,
          priority: -15,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/(node_modules)/, /(dist)/],
        use: {
          loader: 'babel-loader',
          options: {
            compact: true,
            configFile: '../babel.config.js',
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
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['de', 'es', 'fr', 'zh-cn', 'ja'],
    }),
  ],
};
