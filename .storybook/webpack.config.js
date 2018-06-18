const path = require('path');
const postcssImport = require('postcss-import');
const postcssCssNext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');

const sourceFolders = [
  // This points to `packages-shared`
  path.resolve(__dirname, '../..'),
];

module.exports = {
  devtool: 'source-map',
  module: {
    // Makes missing exports an error instead of warning.
    strictExportPresence: true,

    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        // For svg icons, we want to get them transformed into React components
        // when we import them.
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [
                require.resolve('@commercetools-frontend/babel-preset-mc-app'),
              ],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              highlightCode: true,
            },
          },
          {
            loader: require.resolve('svgr/webpack'),
            options: {
              icon: true,
            },
          },
        ],
      },
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
        ],
      },
      {
        test: function testForNormalCssFiles(fileName) {
          return (
            // Use this only for plain CSS.
            // For css-modules, see loader below.
            fileName.endsWith('.css') && !fileName.endsWith('.mod.css')
          );
        },
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssImport(),
                postcssCssNext({
                  browsers: '> 1%',
                  features: { autoprefixer: { grid: true } },
                }),
                postcssReporter(),
              ],
            },
          },
        ],
        include: sourceFolders,
      },
      {
        test: /\.mod\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssImport({ path: sourceFolders }),
                postcssCssNext({
                  browsers: '> 1%',
                  features: { autoprefixer: { grid: true } },
                }),
                postcssReporter(),
              ],
            },
          },
        ],
        include: sourceFolders,
      },
    ],
  },
};
