const jestBabelPreset = require('babel-preset-jest');
const getBabelPreset = require('../scripts/get-babel-preset');

const mcAppBabelConfig = getBabelPreset();

const jestBabelConfig = {
  ...mcAppBabelConfig,
  plugins: [...mcAppBabelConfig.plugins, ...jestBabelPreset.plugins],
};

module.exports = require('babel-jest').createTransformer(jestBabelConfig);
