const path = require('path');

const sourceFolders = [
  // path.resolve(__dirname),
  path.resolve(__dirname, './test/percy'),
  // path.resolve(__dirname, './examples'),
  // path.resolve(__dirname, './materials'),
  path.resolve(__dirname, './src'),
];

module.exports = {
  webpack: {
    module: {
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        // Process JS with Babel.
        {
          test: /\.js$/,
          exclude: /\/dist\/ui-kit\.esm/,
          include: sourceFolders,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                compact: false,
                presets: [require.resolve('./scripts/get-babel-preset')],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                highlightCode: true,
              },
            },
          ],
        },
      ],
    },
  },
};
