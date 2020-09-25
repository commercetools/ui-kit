const fs = require('fs');
const parser = require('postcss-value-parser');

module.exports = (opts = {}) => {
  let variables;

  if (opts && opts.file) {
    variables = JSON.parse(fs.readFileSync(opts.file));
  }

  if (!variables) {
    throw new Error(
      'postcss-var-replacer must be configured with the JSON file to use'
    );
  }

  return {
    postcssPlugin: 'postcss-var-replacer',
    Root(css) {
      css.walkDecls((decl) => {
        let variableFound = false;

        const parsedValue = parser(decl.value);
        parsedValue.walk((node) => {
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
    },
  };
};
module.exports.postcss = true;
