module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  testMatch: [
    '<rootDir>/.storybook/**/*.js',
    '<rootDir>/examples/**/*.js',
    '<rootDir>/materials/**/*.js',
    '<rootDir>/scripts/**/*.js',
    '<rootDir>/src/**/*.js',
    '<rootDir>/*.js',
  ],
  watchPlugins: ['jest-plugin-filename'],
};
