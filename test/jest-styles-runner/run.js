// copied from https://github.com/keplersj/jest-runner-stylelint/blob/master/src/run.js
// because it uses an older version of stylelint as a dep (not peer dep)
// we need new version of stylelint for css in js support
const { pass, fail } = require('create-jest-runner');
const stylelint = require('stylelint');

module.exports = ({ testPath }) => {
  const start = new Date();

  return stylelint
    .lint({
      files: testPath,
      formatter: 'string',
    })
    .then(data => {
      if (data.errored) {
        return fail({
          start,
          end: new Date(),
          test: {
            path: testPath,
            errorMessage: data.output,
          },
        });
      }

      return pass({
        start,
        end: new Date(),
        test: { path: testPath },
      });
    })
    .catch(err => {
      throw err;
    });
};
