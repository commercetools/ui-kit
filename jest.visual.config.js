process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.visualspec\\.js$',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  globals: {
    HOST: 'http://localhost:3000',
  },
  testTimeout: 10000,
};
