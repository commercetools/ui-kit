module.exports = {
  cliOptions: {
    format: 'stylish',
    rules: {
      'import/no-unresolved': 2,
      'prettier/prettier': [
        'error',
        { trailingComma: 'es5', singleQuote: true },
      ],
    },
  },
};
