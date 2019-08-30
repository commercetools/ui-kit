import React from 'react';

const NUMBERED_LIST = 'numbered-list';
const BULLETED_LIST = 'bulleted-list';
const LIST_ITEM = 'list-item';
const DEFAULT_NODE = 'paragraph';

const hasBlock = (type, editor) =>
  editor.value.blocks.some(node => node.type === type);

const toggle = (editor, typeName) => {
  // Handle the extra wrapping required for list buttons.
  console.log('here');
  const isList = hasBlock('list-item', editor);
  const isType = editor.value.blocks.some(block => {
    return !!editor.value.document.getClosest(
      block.key,
      parent => parent.type === typeName
    );
  });

  if (isList && isType) {
    editor
      .setBlocks(DEFAULT_NODE)
      .unwrapBlock(BULLETED_LIST)
      .unwrapBlock(NUMBERED_LIST);
  } else if (isList) {
    editor
      .unwrapBlock(typeName === BULLETED_LIST ? NUMBERED_LIST : BULLETED_LIST)
      .wrapBlock(typeName);
  } else {
    editor.setBlocks(LIST_ITEM).wrapBlock(typeName);
  }
};

const query = (editor, typeName) => {
  let isActive = hasBlock(typeName, editor);

  if (editor.value.blocks.size > 0) {
    const parent = editor.value.document.getParent(
      editor.value.blocks.first().key
    );
    isActive =
      hasBlock(LIST_ITEM, editor) && parent && parent.type === typeName;
  }
  return isActive;
};

const ListPlugin = () => {
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
        toggleBulletedListBlock: editor => toggle(editor, BULLETED_LIST),
        toggleNumberedListBlock: editor => toggle(editor, NUMBERED_LIST),
      },
      queries: {
        hasBulletedListBlock: editor => query(editor, BULLETED_LIST),

        hasNumberedListBlock: editor => query(editor, NUMBERED_LIST),
      },
    },
  ];
};

export default ListPlugin;
