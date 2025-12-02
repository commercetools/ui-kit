module.exports = {
  cliOptions: {
    format: 'stylish', // Built-in ESLint formatter
    rules: {
      'import/no-unresolved': 2,
      'prettier/prettier': [
        'error',
        { trailingComma: 'es5', singleQuote: true },
      ],
    },
  },
};
