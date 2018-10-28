module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  testMatch: ['<rootDir>/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/', '.public/', 'dist/'],
  watchPlugins: ['jest-plugin-filename'],
  reporters: process.env.CI === 'true' ? ['jest-silent-reporter'] : ['default'],
};
