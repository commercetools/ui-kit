module.exports = {
  runner: '<rootDir>/test/jest-styles-runner/index.js',
  displayName: 'stylelint',
  moduleFileExtensions: ['js'],
  modulePathIgnorePatterns: [
    'dist',
    '.spec.js',
    '.visualspec.js',
    '.visualroute.js',
    '.story.js',
  ],
  testMatch: ['<rootDir>/src/components/**/*.js', ''],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
