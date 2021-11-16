process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

// Resolve the absolute path of the caller location.
const rootPath = process.cwd();

/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  displayName: 'test',
  globals: {
    'process.env': {
      NODE_ENV: 'test',
    },
    // Without this option, somehow CI fails to run the tests with the following error:
    //   TypeError: Unable to require `.d.ts` file.
    //   This is usually the result of a faulty configuration or import. Make sure there is a `.js`, `.json` or another executable extension available alongside `core.ts`.
    // Fix is based on this comment:
    // - https://github.com/kulshekhar/ts-jest/issues/805#issuecomment-456055213
    // - https://github.com/kulshekhar/ts-jest/blob/master/docs/user/config/isolatedModules.md
    'ts-jest': {
      isolatedModules: true,
      babelConfig: true,
    },
  },
  moduleDirectories: ['packages', 'node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/transform-file.js',
    '\\.css$': 'identity-obj-proxy',
  },
  clearMocks: true,
  rootDir: rootPath,
  setupFiles: ['<rootDir>/test/setup-tests.js', 'jest-localstorage-mock'],
  setupFilesAfterEnv: ['<rootDir>/scripts/setup-test-framework.js'],
  testEnvironment: 'jsdom',
  testURL: 'https://mc.commercetools.com/',
  testPathIgnorePatterns: ['generators', '/node_modules/'],
  testRegex: '\\.spec\\.[j|t]sx?$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': 'babel-jest',
  },
  watchPlugins: ['jest-watch-typeahead/filename'],
};
