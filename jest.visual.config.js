module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.visualspec\\.js$',
  transform: {
    '^.+\\.js$': '<rootDir>/test/transform-babel-jest.js',
  },
};
