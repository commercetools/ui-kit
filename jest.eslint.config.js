/**
 * @type {import('jest').Config}
 */
module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  modulePathIgnorePatterns: ['.yarn', '.cache', 'storybook', 'dist'],
  testMatch: ['<rootDir>/**/*.js', '<rootDir>/**/*.ts', '<rootDir>/**/*.tsx'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-runner-eslint/watch-fix',
  ],
};
