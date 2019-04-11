const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const sourceFolders = [
  path.resolve(__dirname),
  path.resolve(__dirname, '../examples'),
  path.resolve(__dirname, '../materials'),
  path.resolve(__dirname, '../philosophy'),
  path.resolve(__dirname, '../src'),
];

module.exports = ({ config }) => {
  config.plugins.push(
    new MomentLocalesPlugin({ localesToKeep: ['de', 'es', 'fr', 'zh-cn'] })
  );

  if (process.env.NODE_ENV === 'production') {
    // remove progress plugin
    // progress plugin outputs a lot of console logs, which makes
    // netlify build realllllllllllllllly slow.
    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== 'ProgressPlugin'
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
      loaders: [require.resolve('@storybook/addon-storysource/loader')],
      enforce: 'pre',
    },
    // Process JS with Babel.
    {
      test: /\.js$/,
      include: sourceFolders,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            compact: false,
            presets: [require.resolve('../scripts/get-babel-preset')],
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            highlightCode: true,
          },
        },
      ],
    },
    // For svg icons, we want to get them transformed into React components
    // when we import them.
    {
      test: /\.react\.svg$/,
      include: sourceFolders,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            presets: [require.resolve('../scripts/get-babel-preset')],
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            highlightCode: true,
          },
        },
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            // NOTE: disable this and manually add `removeViewBox: false` in the SVGO plugins list
            // See related PR: https://github.com/smooth-code/svgr/pull/137
            icon: false,
            svgoConfig: {
              plugins: [
                { removeViewBox: false },
                // Keeps ID's of svgs so they can be targeted with CSS
                { cleanupIDs: false },
              ],
            },
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
      use: [
        { loader: require.resolve('json-loader') },
        { loader: require.resolve('yaml-loader') },
      ],
    },
  ];

  return config;
};
