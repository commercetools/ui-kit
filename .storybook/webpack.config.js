const path = require('path');
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
  path.resolve(__dirname, '../materials'),
  path.resolve(__dirname, '../src'),
];

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.devtool = 'cheap-module-source-map'; // TODO: should we use something differen?
  storybookBaseConfig.module.rules = [
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
                { removeAttrs: { attrs: '(stroke|fill)' } },
                { removeViewBox: false },
                // Keeps ID's of svgs so they can be targeted with CSS
                { cleanupIDs: false },
              ],
            },
          },
        },
      ],
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
    // Storybook uses a plugin to load and render markdown files.
    {
      test: /\.md$/,
      use: [
        { loader: require.resolve('html-loader') },
        { loader: require.resolve('markdown-loader') },
      ],
    },
  ];

  return storybookBaseConfig;
};
