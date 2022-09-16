process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

/**
 * @type {import('jest').Config}
 */
module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.visualspec\\.js$',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  globals: {
    HOST: 'http://localhost:3000',
  },
  setupFiles: ['<rootDir>/test/setup-globals.js'],
  watchPlugins: ['jest-watch-typeahead/filename'],
};
