const path = require('path');
const createWebpackConfigForDevelopment = require('@commercetools-frontend/mc-scripts/config/create-webpack-config-for-development');
const createWebpackConfigForProduction = require('@commercetools-frontend/mc-scripts/config/create-webpack-config-for-production');

const sourceFolders = [
  // This points to `packages-shared`
  path.resolve(__dirname, '../..'),
];

const mcWebpackConfigDev = createWebpackConfigForDevelopment({
  distPath: '', // not important
  entryPoint: '', // not important
  sourceFolders,
});
const mcWebpackConfigProd = createWebpackConfigForProduction({
  distPath: '', // not important
  entryPoint: '', // not important
  sourceFolders,
});
const uikitWebpackConfig = {
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
    ],
  },
};

const getRulesConfig = configType => {
  const config =
    configType === 'PRODUCTION' ? mcWebpackConfigProd : mcWebpackConfigDev;
  return config.module.rules;
};

module.exports = (storybookBaseConfig, configType) => {
  // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  storybookBaseConfig.module.rules = getRulesConfig(configType).concat(
    uikitWebpackConfig.module.rules
  );

  return storybookBaseConfig;
};
