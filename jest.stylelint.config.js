module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['css'],
  testMatch: [
    '<rootDir>/materials/*.css',
    '<rootDir>/materials/**/*.css',
    '<rootDir>/src/**/*.css',
  ],
  watchPlugins: ['jest-plugin-filename'],
};
