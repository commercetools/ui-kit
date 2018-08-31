module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  testMatch: [
    '<rootDir>/.storybook/**/*.js',
    '<rootDir>/examples/**/*.js',
    '<rootDir>/scripts/**/*.js',
    '<rootDir>/src/**/*.js',
  ],
  watchPlugins: ['jest-plugin-filename'],
};
