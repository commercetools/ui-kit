const path = require('path');
const createWebpackConfigForDevelopment = require('@commercetools-frontend/mc-scripts/config/create-webpack-config-for-development');
const createWebpackConfigForProduction = require('@commercetools-frontend/mc-scripts/config/create-webpack-config-for-production');

const sourceFolders = [
  path.resolve(__dirname),
  path.resolve(__dirname, '../examples'),
  path.resolve(__dirname, '../src'),
];

const mcWebpackConfigDev = createWebpackConfigForDevelopment({
  distPath: '', // not important
  entryPoint: '', // not important
  sourceFolders,
  toggleFlags: {
    // Disable generation of index.html
    generateIndexHtml: false,
  },
});
const mcWebpackConfigProd = createWebpackConfigForProduction({
  distPath: '', // not important
  entryPoint: '', // not important
  sourceFolders,
  toggleFlags: {
    // Disable extract CSS, as building the production bundles for Storybook
    // fails with that.
    enableExtractCss: false,
    // Disable generation of index.html
    generateIndexHtml: false,
  },
});
const uikitWebpackConfig = {
  devtool: 'source-map',
  module: {
    rules: [
      // Storybook uses a plugin to load and render markdown files.
      {
        test: /\.md$/,
        use: [
          { loader: require.resolve('html-loader') },
          { loader: require.resolve('markdown-loader') },
        ],
      },
      {
        test: /\.svg$/,
        oneOf: [
          // For svg icons, we want to get them transformed into React components
          // when we import them.
          {
            include: [/src\/.*\/icons/],
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  babelrc: false,
                  presets: [
                    require.resolve(
                      '@commercetools-frontend/babel-preset-mc-app'
                    ),
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
            // SVG images are included in ui-kit.
            include: /src/,
            exclude: [/src\/.*\/icons/],
            use: [
              {
                loader: require.resolve('svg-url-loader'),
                options: { noquotes: true },
              },
            ],
          },
        ],
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: /\.png$/,
        include: /src/,
        use: [require.resolve('url-loader')],
      },
    ],
  },
};

const rulesToFilterOut = [/\.svg$/, /\.png$/].map(r => r.toString());

const getRulesConfig = configType => {
  const config =
    configType === 'PRODUCTION' ? mcWebpackConfigProd : mcWebpackConfigDev;
  return config.module.rules.filter(rule => {
    if (!rule.test) return true;
    return !rulesToFilterOut.includes(rule.test.toString());
  });
};

module.exports = (storybookBaseConfig, configType) => {
  // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  storybookBaseConfig.devtool = uikitWebpackConfig.devtool;
  storybookBaseConfig.module.rules = getRulesConfig(configType).concat(
    uikitWebpackConfig.module.rules
  );

  return storybookBaseConfig;
};
