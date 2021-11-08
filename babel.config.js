/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: [
    [
      '@commercetools-frontend/babel-preset-mc-app',
      {
        runtime: 'automatic',
        keepPropTypes: true,
      },
    ],
  ],
  plugins: [
    'babel-plugin-typescript-to-proptypes',
    require('./babel-plugin-package-version'),
  ],
};
