process.env.ENABLE_NEW_JSX_TRANSFORM = 'false';

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  rules: {
    'react/jsx-uses-react': 'error',
    'react/react-in-jsx-scope': 'error',
  },
};
