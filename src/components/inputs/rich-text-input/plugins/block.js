import React from 'react';
import invariant from 'tiny-invariant';

const requiredOptions = ['typeName', 'command', 'query', 'RenderBlock'];

const DEFAULT_NODE = 'paragraph';

const hasBlock = (typeName, blocks) =>
  blocks.some(blockNode => blockNode.type === typeName);

const validate = options => {
  // eslint-disable-next-line consistent-return
  const missingRequiredOptions = requiredOptions.filter(
    option => !options[option]
  );
  return missingRequiredOptions;
};

const BlockPlugin = (options = {}) => {
  const missingRequiredOptions = validate(options);

  if (missingRequiredOptions.length > 0) {
    invariant(
      false,
      `ui-kit/rich-text-input/Block: missing required options: ${missingRequiredOptions.join(
        ','
      )}`
    );
  }

  const { typeName, command, query, RenderBlock } = options;

  return [
    {
      renderBlock(props, editor, next) {
        const { children, node, attributes } = props;

        switch (node.type) {
          case typeName:
            return <RenderBlock {...attributes}>{children}</RenderBlock>;
          default:
            return next();
        }
      },
      commands: {
        [command]: editor => {
          const isActive = hasBlock(typeName, editor.value.blocks);
          editor.setBlocks(isActive ? DEFAULT_NODE : typeName);
        },
      },
      queries: {
        [query]: editor => hasBlock(typeName, editor.value.blocks),
      },
    },
  ];
};

export default BlockPlugin;
