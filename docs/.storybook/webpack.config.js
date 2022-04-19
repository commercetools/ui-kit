const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const sourceFolders = [
  path.resolve(__dirname),
  path.resolve(__dirname, '../examples'),
  path.resolve(__dirname, '../philosophy'),
  path.resolve(__dirname, '../../design-system'),
  path.resolve(__dirname, '../../packages'),
  path.resolve(__dirname, '../../presets'),
];

module.exports = ({ config }) => {
  config.plugins.push(
    new MomentLocalesPlugin({
      localesToKeep: ['de', 'es', 'fr', 'zh-cn', 'ja'],
    })
  );

  if (process.env.NODE_ENV === 'production') {
    // remove progress plugin
    // progress plugin outputs a lot of console logs, which makes
    // netlify build realllllllllllllllly slow.
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'ProgressPlugin'
    );
    config.devtool = 'none'; // TODO: should we use something differen?
  } else {
    config.devtool = 'cheap-module-source-map'; // TODO: should we use something differen?
  }

  config.devtool = 'cheap-module-source-map'; // TODO: should we use something differen?
  config.module.rules = [
    // Disable require.ensure as it's not a standard language feature.
    { parser: { requireEnsure: false } },
    // add story source
    {
      test: /\.story\.js$/,
      loaders: [require.resolve('@storybook/source-loader')],
      enforce: 'pre',
    },
    // Process JS/TS with Babel.
    {
      test: /\.(js|jsx|ts|tsx)$/,
      include: sourceFolders,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            compact: false,
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            highlightCode: true,
          },
        },
      ],
    },
    // Storybook uses a plugin to load and render markdown files.
    {
      test: /\.md$/,
      use: [
        { loader: require.resolve('html-loader') },
        { loader: require.resolve('markdown-loader') },
      ],
    },
    {
      test: /\.yaml$/,
      use: [{ loader: require.resolve('yaml-loader') }],
    },
    // Fix for react-intl
    // https://github.com/formatjs/formatjs/issues/143#issuecomment-518774786
    {
      test: /\.mjs$/,
      type: 'javascript/auto',
    },
  ];
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.modules.push(path.resolve(__dirname, '../node_modules'));
  return config;
};
