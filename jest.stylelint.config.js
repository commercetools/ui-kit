module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['css'],
  testMatch: ['<rootDir>/src/**/*.css'],
  watchPlugins: ['jest-plugin-filename'],
};
