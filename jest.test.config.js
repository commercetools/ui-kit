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
  setupFiles: [
    'raf/polyfill',
    '<rootDir>/test/setup-tests.js',
    'jest-localstorage-mock',
  ],
  setupFilesAfterEnv: ['<rootDir>/scripts/setup-test-framework.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  testURL: 'https://mc.commercetools.com/',
  testPathIgnorePatterns: ['node_modules'],
  testRegex: '\\.spec\\.js$',
  transform: {
    '^.+\\.js$': '<rootDir>/test/transform-babel-jest.js',
  },
  transformIgnorePatterns: [`node_modules/(?!(${vendorsToTranspile})/)`],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
