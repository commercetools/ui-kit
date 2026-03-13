process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const globals = require('globals');
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app');

module.exports = [
  // Ignores replace .eslintignore (directory patterns end with /)
  {
    ignores: [
      'dist/',
      '**/dist/',
      'proxy_exports/**/*.js',
      'node_modules/*',
      '**/node_modules/*',
      'vendors/*',
      '**/raw-components',
      'generators/**',
    ],
  },

  // Spread the base config (replaces "extends")
  ...mcAppConfig,

  // testing-library overrides for spec/test files
  {
    files: ['**/*.{spec,test}.{js,jsx,ts,tsx}'],
    rules: {
      'testing-library/no-node-access': 'off',
      'testing-library/no-container': 'off',
    },
  },

  // testing-library overrides for test utility files
  {
    files: [
      '**/test-utils/**/*.{jsx,tsx}',
      '**/*test-utils.{jsx,tsx}',
      '**/*test-helpers.{jsx,tsx}',
    ],
    rules: {
      'testing-library/no-node-access': 'off',
      'testing-library/no-container': 'off',
    },
  },

  // React display-name override for visual routes and docs
  // (react plugin is registered for *.js, *.jsx, *.tsx)
  {
    files: ['**/*.visualroute.js', '**/docs/*.js'],
    rules: {
      'react/display-name': 'off',
    },
  },

  // Globals for visual spec files
  {
    files: ['**/*.visualspec.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        page: 'readonly',
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

  // Version files — allow anonymous default exports
  {
    files: ['**/version.js', '**/version.ts'],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
];
