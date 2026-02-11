/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: [
    [
      '@commercetools-frontend/babel-preset-mc-app',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    require('./babel-plugin-package-version'),
    [
      require('babel-plugin-formatjs').default,
      {
        ast: true,
      },
    ],
  ],
};
