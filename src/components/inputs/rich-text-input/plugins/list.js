import React from 'react';

const TYPE_NAME = 'numbered-list';
const DEFAULT_NODE = 'paragraph';

const hasBlock = (type, editor) =>
  editor.value.blocks.some(node => node.type === type);

const ListPlugin = (options = {}) => {
  const typeName = options.typeName || TYPE_NAME;
  const defaultNode = options.defaultNode || DEFAULT_NODE;
  const query = options.query || 'hasNumberedListBlock';
  const command = options.command || 'toggledNumberedLsitBlock';

  return [
    {
      renderBlock(props, editor, next) {
        const { attributes, children, node } = props;

        switch (node.type) {
          case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>;
          case 'list-item':
            return <li {...attributes}>{children}</li>;
          case 'numbered-list':
            return <ol {...attributes}>{children}</ol>;
          default:
            return next();
        }
      },
      commands: {
        [command]: editor => {
          const isList = hasBlock('list-item', editor);

          const isType = editor.value.blocks.some(block => {
            return !!editor.value.document.getClosest(
              block.key,
              parent => parent.type === typeName
            );
          });

          if (isList && isType) {
            editor.setBlocks(defaultNode).unwrapBlock(typeName);
          } else if (isList) {
            editor.unwrapBlock(typeName).wrapBlock(typeName);
          } else {
            editor.setBlocks('list-item').wrapBlock(typeName);
          }
        },
      },
      queries: {
        [query]: editor => {
          let isActive = hasBlock(typeName, editor);

          const {
            value: { document, blocks },
          } = editor;

          if (blocks.size > 0) {
            const parent = document.getParent(blocks.first().key);
            isActive =
              hasBlock('list-item', editor) &&
              parent &&
              parent.type === typeName;
          }
          return isActive;
        },
      },
    },
  ];
};

export default ListPlugin;
