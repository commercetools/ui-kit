const path = require('path');

const rootPath = path.resolve(__dirname, '../../../');
const sourceFolders = [
  path.join(rootPath, 'packages-application'),
  path.join(rootPath, 'packages-shared'),
  path.join(rootPath, 'test'),
  path.join(rootPath, 'assets'),
];

// Extends the default storybook webpack (CRA) with the miminal configuration
// necessary to run the stories in the Ui-Kit.
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?(.*))?$/,
        use: 'file-loader',
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: function testForNormalCssFiles(fileName) {
          return fileName.endsWith('.css') && !fileName.endsWith('.mod.css');
        },
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: [...sourceFolders, path.join(rootPath, 'assets')],
      },
      {
        test: /\.mod\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  sourceFolders,
                },
              },
            },
          },
        ],
      },
    ],
  },
};
