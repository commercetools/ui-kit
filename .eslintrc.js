process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';
const path = require('path');

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: [
    '@commercetools-frontend/eslint-config-mc-app',
    'plugin:storybook/recommended',
  ],
  rules: {
    'testing-library/no-node-access': 'off',
    'testing-library/no-container': 'off',
  },
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
        globalThis: true,
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
