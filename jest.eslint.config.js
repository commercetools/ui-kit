module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  testMatch: [
    '<rootDir>/.storybook/**/*.js',
    '<rootDir>/examples/**/*.js',
    '<rootDir>/scripts/**/*.js',
    '<rootDir>/src/**/*.js',
    '<rootDir>/**/*.js', // for backwards compatible folders
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/proxy-exports'],
  watchPlugins: ['jest-plugin-filename'],
};
