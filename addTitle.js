const { parse: pathParse } = require('path');
const svgo = require('svgo');

module.exports = {
  name: 'addTitle',
  type: 'visitor',
  active: true,
  fn: (ast, params, { path } = {}) => {
    return {
      element: {
        enter: (node, parentNode) => {
          const isRoot = node.name === 'svg' && parentNode.type === 'root';
          if (isRoot && path) {
            const hasTitle = node.children.some(
              (child) => child.type === 'element' && child.name === 'title'
            );
            if (!hasTitle) {
              const filename = pathParse(path).name;
              const title = svgo.createContentItem(
                {
                  type: 'element',
                  name: 'title',
                  children: [],
                },
                node
              );
              title.attributes.id = params.id;
              const text = svgo.createContentItem(
                { type: 'text', value: filename.split('.')[0] },
                title
              );
              title.children.push(text);
              node.children.unshift(title);
            }
          }
        },
      },
    };
  },
};
