process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const globals = require('globals');
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app');

module.exports = [
  {
    ignores: [
      'dist/',
      '**/dist/',
      'proxy_exports/**/*.js',
      'node_modules/',
      '**/node_modules/',
      'vendors/',
      '**/raw-components/',
      'generators/readme/test/',
    ],
  },

  ...mcAppConfig,

  {
    rules: {
      'testing-library/no-node-access': 'off',
      'testing-library/no-container': 'off',
    },
  },

  {
    files: ['**/*.visualroute.js', '**/docs/*.js'],
    rules: {
      'react/display-name': 'off',
    },
  },

  // Visual spec files run in jest-puppeteer — need jest globals + puppeteer's `page`
  {
    files: ['**/*.visualspec.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        page: 'writable',
        HOST: 'readonly',
        globalThis: 'readonly',
      },
    },
  },

  // Bundle spec files use jest globals but don't match *.{spec,test}.js pattern
  {
    files: ['**/*.bundlespec.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  {
    files: ['version.js', 'version.ts'],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
];
