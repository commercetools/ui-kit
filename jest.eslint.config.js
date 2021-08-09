/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  modulePathIgnorePatterns: [
    '.yarn',
    '.cache',
    'docs/.public',
    'docs/public',
    'dist',
  ],
  testMatch: ['<rootDir>/**/*.js', '<rootDir>/**/*.ts', '<rootDir>/**/*.tsx'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-runner-eslint/watch-fix',
  ],
};
