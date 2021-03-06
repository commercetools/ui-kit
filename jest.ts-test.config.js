module.exports = {
  preset: 'ts-jest',
  displayName: 'test-node',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['generators', 'node_modules'],
  testPathIgnorePatterns: ['packages', '/node_modules/'],
};
