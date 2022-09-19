process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

/**
 * @type {import('jest').Config}
 */
module.exports = {
  preset: 'ts-jest',
  displayName: 'test-node',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['generators', 'node_modules'],
  testPathIgnorePatterns: ['packages', '/node_modules/'],
};
