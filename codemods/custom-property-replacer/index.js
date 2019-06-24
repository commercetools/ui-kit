const postcss = require('postcss');
const parser = require('postcss-value-parser');
const fs = require('fs');

module.exports = postcss.plugin('postcss-var-replacer', opts => {
  let variables = {};
  if (opts && opts.file) {
    variables = JSON.parse(fs.readFileSync(opts.file));
  }

  return css => {
    css.walkDecls(decl => {
      if (!opts || !opts.file) {
        throw new Error(
          'postcss-var-replacer must be configured with the JSON file to use'
        );
      }

      let variableFound = false;

      const parsedValue = parser(decl.value);
      parsedValue.walk(node => {
        if (node.type === 'word' && variables[node.value]) {
          variableFound = true;
          // eslint-disable-next-line no-param-reassign
          node.value = variables[node.value];
        }
      });
      if (variableFound) {
        decl.replaceWith(decl.clone({ value: parsedValue.toString() }));
      }
    });
  };
});
