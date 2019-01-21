module.exports = {
  runner: 'jest-runner-tslint',
  displayName: 'tslint',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testMatch: ['<rootDir>/**/*.js', '<rootDir>/**/*.ts', '<rootDir>/**/*.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '.public/', 'dist/'],
  watchPlugins: ['jest-plugin-filename'],
};
