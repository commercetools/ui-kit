const path = require('path');

module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
  overrides: [
    {
      files: ['*.story.js', '*.visualroute.js', '**/docs/*.js'],
      rules: {
        'react/display-name': 'off',
      },
      settings: {
        'import/resolver': {
          node: {
            paths: [path.resolve('docs/node_modules')],
          },
        },
      },
    },
    {
      files: ['*.visualspec.js'],
      globals: {
        page: true,
        HOST: true,
      },
    },
    {
      files: ['version.js', 'version.ts'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
