module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  testMatch: [
    '<rootDir>/.storybook/**/*.js',
    '<rootDir>/examples/**/*.js',
    '<rootDir>/materials/**/*.js',
    '<rootDir>/scripts/**/*.js',
    '<rootDir>/src/**/*.js',
    '<rootDir>/**/*.js', // for backwards compatible folders
  ],
  watchPlugins: ['jest-plugin-filename'],
};
