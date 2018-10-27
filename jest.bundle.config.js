// Resolve the absolute path of the caller location.
const rootPath = process.cwd();

module.exports = {
  displayName: 'bundle',
  globals: { 'process.env': { NODE_ENV: 'test' } },
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/transform-file.js',
    '\\.css$': 'identity-obj-proxy',
  },
  rootDir: rootPath,
  setupFiles: [
    'raf/polyfill',
    '<rootDir>/test/setup-tests.js',
    'jest-localstorage-mock',
  ],
  testEnvironment: 'jsdom',
  testURL: 'https://mc.commercetools.com/',
  testPathIgnorePatterns: ['node_modules'],
  testRegex: '\\.bundlespec\\.js$',
  transform: {
    '^.+\\.js$': '<rootDir>/test/transform-babel-jest.js',
  },
  watchPlugins: ['jest-plugin-filename', 'jest-watch-master'],
};
