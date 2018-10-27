// Resolve the absolute path of the caller location.
const rootPath = process.cwd();

module.exports = {
  displayName: 'bundle',
  globals: { 'process.env': { NODE_ENV: 'test' } },
  moduleDirectories: ['node_modules'],
  rootDir: rootPath,
  setupFiles: [
    'raf/polyfill',
    '<rootDir>/test/setup-tests.js',
    'jest-localstorage-mock',
  ],
  setupTestFrameworkScriptFile:
    '<rootDir>/scripts/setup-test-framework-for-bundle.js',
  testEnvironment: 'jsdom',
  testURL: 'https://mc.commercetools.com/',
  testPathIgnorePatterns: ['node_modules'],
  testRegex: '\\.bundlespec\\.js$',
  transformIgnorePatterns: ['node_modules/(?!(flatpickr)/)'],
  transform: {
    '^.+\\.js$': '<rootDir>/test/transform-babel-jest.js',
    '^.+\\.css$': 'jest-transform-css',
    '^(?!.*\\.(js|css|json)$)': '<rootDir>/test/transform-file.js',
  },
  watchPlugins: ['jest-plugin-filename', 'jest-watch-master'],
};
