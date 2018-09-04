module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['css'],
  testMatch: [
    '<rootDir>/src/**/*.css',
    '<rootDir>/**/*.css', // for backwards compatible folders
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  watchPlugins: ['jest-plugin-filename'],
};
