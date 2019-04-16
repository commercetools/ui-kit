module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  testMatch: ['<rootDir>/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/', '.public/', 'dist/'],
  watchPlugins: ['jest-watch-typeahead/filename'],
};
