/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

// Ensure UI Kit build (ui-kit.esm.js) exists
// and warn in case it is old.
(() => {
  try {
    return fs.statSync(path.join(__dirname, './dist/ui-kit.esm.js'));
  } catch (e) {
    return null;
  }
})();

exports.onCreateWebpackConfig = ({
  // stage,
  // rules,
  getConfig,
  loaders,
  actions,
}) => {
  const config = getConfig();

  config.resolve.alias = {
    ...config.resolve.alias,
    'ui-kit': path.resolve(__dirname, '..'),
  };

  config.module.rules = [
    // Omit the default rule where test === '\.jsx?$'
    ...config.module.rules.filter(
      rule => String(rule.test) !== String(/\.jsx?$/)
    ),
    // Recreate it with custom exclude filter
    {
      // Called without any arguments, `loaders.js` will return an
      // object like:
      // {
      //   options: undefined,
      //   loader: '/path/to/node_modules/gatsby/dist/utils/babel-loader.js',
      // }
      // Unless you're replacing Babel with a different transpiler, you probably
      // want this so that Gatsby will apply its required Babel
      // presets/plugins.  This will also merge in your configuration from
      // `babel.config.js`.
      ...loaders.js(),

      test: /\.jsx?$/,

      // Exclude all node_modules from transpilation, except for 'swiper' and 'dom7'
      exclude: [/(node_modules)/, /(ui-kit.esm)/],
    },
  ];

  config.plugins = [
    ...config.plugins,
    // See https://github.com/FormidableLabs/react-live/issues/5
    new webpack.IgnorePlugin(/^(xor|props)$/),
  ];

  // This will completely replace the webpack config with the modified object.
  actions.replaceWebpackConfig(config);
};

exports.createPages = async ({ actions, graphql }) => {
  const allMarkdown = await graphql(`
    {
      allMdx(limit: 1000) {
        edges {
          node {
            frontmatter {
              id
              title
              permalink
            }
          }
        }
      }
    }
  `);

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors);
    throw Error(allMarkdown.errors);
  }

  allMarkdown.data.allMdx.edges.forEach(edge => {
    const template = path.resolve(`src/templates/markdown.js`);
    actions.createPage({
      path: edge.node.frontmatter.permalink,
      component: template,
      // The context is passed as props to the component as well
      // as into the component's GraphQL query.
      context: {
        id: edge.node.frontmatter.id,
      },
    });
  });
};
