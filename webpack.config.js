const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCustomMediaQueries = require('postcss-custom-media');
const postcssPostcssColorModFunction = require('postcss-color-mod-function');

const browserslist = {
  development: ['chrome', 'firefox'].map(
    browser => `last 2 ${browser} versions`
  ),
  production: ['>1%', 'not op_mini all', 'ie 11'],
};

const sourceFolders = [
  path.resolve(__dirname),
  path.resolve(__dirname, '../examples'),
  path.resolve(__dirname, '../src'),
];

module.exports = {
  entry: {
    main: './src/index.js',
    utils: './src/utils/index.js',
  },
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    library: 'McUiKit',
    libraryTarget: 'umd',
    filename: chunkData =>
      chunkData.chunk.name === 'main' ? 'index.js' : '[name]/index.js',
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // We copy everything we want to be in the bundle to "dist",
    // as we publish from "dist".
    //
    // We do this to enable consumers to import without having "lib"
    // in the path, and to avoid having to bundle onto the main folder.
    //
    // This is also why the "main" field in package.json says
    // "index.js" instead of "dist/index.js", as package.json gets copied
    // to "dist" as well.
    new CopyWebpackPlugin([
      { from: './package.json' },
      { from: './README.md' },
    ]),
    // Adds peerDependencies as externals
    // See: https://webpack.js.org/guides/author-libraries/#externalize-lodash
    new PeerDepsExternalsPlugin(),
  ],
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      // Process JS with Babel.
      {
        test: /\.js$/,
        include: sourceFolders,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              compact: false,
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
        ],
      },
      // For svg icons, we want to get them transformed into React components
      // when we import them.
      {
        test: /\.react\.svg$/,
        include: sourceFolders,
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
      // For normal svg files (not icons) we should load the file normally
      // and simply use it as a `<img src/>`.
      {
        test: function testForNormalSvgFiles(fileName) {
          return (
            // Use this only for plain SVG.
            // For SVG as React components, see loader above.
            fileName.endsWith('.svg') && !fileName.endsWith('.react.svg')
          );
        },
        use: [
          {
            loader: require.resolve('svg-url-loader'),
            options: { noquotes: true },
          },
        ],
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: /\.png$/,
        use: [require.resolve('url-loader')],
      },
      // "postcss" loader applies autoprefixer to our CSS
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      {
        test: /\.mod\.css$/,
        include: sourceFolders,
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
                postcssPresetEnv({
                  browsers: browserslist.development,
                  autoprefixer: { grid: true },
                }),
                postcssCustomProperties({
                  preserve: false,
                }),
                postcssCustomMediaQueries(),
                postcssPostcssColorModFunction(),
                postcssReporter(),
              ],
            },
          },
        ],
      },
      {
        test: function testForNormalCssFiles(fileName) {
          return (
            // Use this only for plain CSS.
            // For css-modules, see loader above.
            fileName.endsWith('.css') && !fileName.endsWith('.mod.css')
          );
        },
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        oneOf: [
          {
            // Use "postcss" for all the included source folders.
            include: sourceFolders,
            use: [
              require.resolve('style-loader'),
              require.resolve('css-loader'),
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    postcssImport(),
                    postcssPresetEnv({
                      browsers: browserslist.development,
                      autoprefixer: { grid: true },
                    }),
                    postcssCustomProperties({
                      preserve: false,
                    }),
                    postcssCustomMediaQueries(),
                    postcssPostcssColorModFunction(),
                    postcssReporter(),
                  ],
                },
              },
            ],
          },
          {
            // For all other vendor CSS, do not use "postcss" loader.
            include: /node_modules/,
            loaders: [
              require.resolve('style-loader'),
              require.resolve('css-loader'),
            ],
          },
        ],
      },
    ],
  },
};
