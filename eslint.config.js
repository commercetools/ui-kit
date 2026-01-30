process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app-flat');
const globals = require('globals');

module.exports = [
  // Global ignores (replaces .eslintignore)
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.cache/**',
      '**/build/**',
    ],
  },

  // Base config from mc-app-flat
  ...mcAppConfig,

  // Custom rules for ui-kit
  {
    rules: {
      'testing-library/no-node-access': 'off',
      'testing-library/no-container': 'off',
    },
  },

  // Overrides for specific file patterns
  {
    files: ['*.bundlespec.js', '**/*.bundlespec.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ['*.visualroute.js', '**/docs/*.js'],
    rules: {
      'react/display-name': 'off',
    },
  },
  {
    files: ['*.visualspec.js', '**/*.visualspec.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        page: true,
        HOST: true,
        globalThis: true,
      },
    },
  },
  {
    files: ['version.js', 'version.ts'],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
  {
    files: ['**/test/fixtures/**/*.js'],
    rules: {
      'import/no-unresolved': 'off',
      'react/no-unused-prop-types': 'off',
    },
  },
];
