module.exports = {
  runner: 'jest-runner-stylelint',
  displayName: 'stylelint',
  moduleFileExtensions: ['css'],
  testMatch: ['<rootDir>/**/*.css'],
  testPathIgnorePatterns: ['/node_modules/', '.public/', 'dist/'],
  watchPlugins: ['jest-plugin-filename'],
  reporters: process.env.CI === 'true' ? ['jest-silent-reporter'] : ['default'],
};
