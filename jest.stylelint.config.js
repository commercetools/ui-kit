module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['js'],
  modulePathIgnorePatterns: [
    'dist',
    'docs/public',
    '.spec.js',
    '.visualspec.js',
    '.visualroute.js',
    '.story.js',
  ],
  testMatch: ['<rootDir>/**/*.js'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
