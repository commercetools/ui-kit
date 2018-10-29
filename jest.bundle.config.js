// Resolve the absolute path of the caller location.
const rootPath = process.cwd();
const fs = require('fs');

// Ensure UI Kit build (ui-kit.esm.js) exists
// and warn in case it is old.
const info = (() => {
  try {
    return fs.statSync('./dist/ui-kit.esm.js');
  } catch (e) {
    return null;
  }
})();
const twoMinutesAgo = Date.now() - 2 * 60 * 1000;
if (!info) {
  // We can only test ui-kit when it was built first
  // eslint-disable-next-line no-console
  console.info(
    '\x1b[33m%s\x1b[0m', // log in yellow
    '⚠️  You need to run "yarn build" or "yarn build:watch" before starting the bundle tests!'
  );
  process.exit(1);
} else if (info.mtime < twoMinutesAgo) {
  // eslint-disable-next-line no-console
  console.info(
    '\x1b[33m%s\x1b[0m', // log in yellow
    "⏳  The ui-kit build is more than two minutes old! Are you sure you're testing the latest version?"
  );
}

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
