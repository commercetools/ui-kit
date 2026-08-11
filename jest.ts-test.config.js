process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

/**
 * @type {import('jest').Config}
 */
module.exports = {
  displayName: 'test-node',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['generators', 'node_modules'],
  // Component and design-system specs need a DOM; they belong to the jsdom
  // project in jest.test.config.js.
  testPathIgnorePatterns: ['packages', 'design-system', '/node_modules/'],
};
