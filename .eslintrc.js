process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const path = require('path');

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ['@commercetools-frontend/eslint-config-mc-app'],
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
      // Storybook related files still require "React in scope".
      files: ['*.story.js'],
      rules: {
        'react/jsx-uses-react': 'error',
        'react/react-in-jsx-scope': 'error',
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
