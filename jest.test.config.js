const vendorsToTranspile = require('./vendors-to-transpile');
// Resolve the absolute path of the caller location.
const rootPath = process.cwd();

module.exports = {
  displayName: 'test',
  globals: {
    'process.env': {
      NODE_ENV: 'test',
    },
  },
  moduleDirectories: ['src', 'packages', 'node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/transform-file.js',
    '\\.css$': 'identity-obj-proxy',
  },
  clearMocks: true,
  rootDir: rootPath,
  setupFiles: ['<rootDir>/test/setup-tests.js', 'jest-localstorage-mock'],
  setupFilesAfterEnv: ['<rootDir>/scripts/setup-test-framework.js'],
  testEnvironment: 'jest-environment-jsdom-sixteen',
  testURL: 'https://mc.commercetools.com/',
  testPathIgnorePatterns: ['node_modules'],
  testRegex: '\\.spec\\.js$',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [`node_modules/(?!(${vendorsToTranspile})/)`],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
