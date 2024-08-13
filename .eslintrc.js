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
      files: ['*.visualroute.js'],
      rules: {
        'react/display-name': 'off',
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
