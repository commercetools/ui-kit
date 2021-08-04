const esModules = [
  'vfile',
  'vfile-message',
  'to-vfile',
  'unist-util-stringify-position',
  'unified',
  'bail',
  'is-plain-obj',
  'trough',
  'remark-parse',
  'mdast-util-from-markdown',
  'mdast-util-to-markdown',
  'mdast-util-to-string',
  'micromark',
  'micromark-core-commonmark',
  'parse-entities',
  'character-entities',
  'remark-stringify',
  'zwitch',
  'longest-streak',
].join('|');

module.exports = {
  preset: 'ts-jest',
  displayName: 'test-node',
  testEnvironment: 'node',
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['generators', 'node_modules'],
  testPathIgnorePatterns: ['packages', '/node_modules/'],
  // https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
};
