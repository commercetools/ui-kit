/**
 * @type {import('jest').Config}
 */
module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  modulePathIgnorePatterns: [
    'dist',
    'storybook',
    '.spec.js',
    '.visualspec.js',
    '.visualroute.js',
    '.story.js',
  ],
  testMatch: ['<rootDir>/**/*.{js,ts,tsx}'],
  watchPlugins: ['jest-watch-typeahead/filename'],
};
