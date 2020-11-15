import React from 'react';
import { BLOCK_TAGS } from '../../rich-text-utils/tags';

const DEFAULT_NODE = BLOCK_TAGS.p;

const hasBlock = (type, editor) =>
  editor.value.blocks.some((node) => node.type === type);

const toggle = (editor, typeName) => {
  // Handle the extra wrapping required for list buttons.
  const isList = hasBlock(BLOCK_TAGS.li, editor);
  const isType = editor.value.blocks.some((block) => {
    return Boolean(
      editor.value.document.getClosest(
        block.key,
        (parent) => parent.type === typeName
      )
    );
  });

  if (isList && isType) {
    editor
      .setBlocks(DEFAULT_NODE)
      .unwrapBlock(BLOCK_TAGS.ul)
      .unwrapBlock(BLOCK_TAGS.ol);
  } else if (isList) {
    editor
      .unwrapBlock(typeName === BLOCK_TAGS.ul ? BLOCK_TAGS.ol : BLOCK_TAGS.ul)
      .wrapBlock(typeName);
  } else {
    editor.setBlocks(BLOCK_TAGS.li).wrapBlock(typeName);
  }
};

const query = (editor, typeName) => {
  let isActive = hasBlock(typeName, editor);

  if (editor.value.blocks.size > 0) {
    const parent = editor.value.document.getParent(
      editor.value.blocks.first().key
    );
    isActive =
      hasBlock(BLOCK_TAGS.li, editor) && parent && parent.type === typeName;
  }
  return isActive;
};

const ListPlugin = () => {
  return [
    {
      renderBlock(props, editor, next) {
        const { attributes, children, node } = props;

        switch (node.type) {
          case BLOCK_TAGS.ul:
            return <ul {...attributes}>{children}</ul>;
          case BLOCK_TAGS.li:
            return <li {...attributes}>{children}</li>;
          case BLOCK_TAGS.ol:
            return <ol {...attributes}>{children}</ol>;
          default:
            return next();
        }
      },
      commands: {
        toggleBulletedListBlock: (editor) => {
          if (!editor.value.selection.isFocused) {
            editor.focus();
          }
          toggle(editor, BLOCK_TAGS.ul);
        },
        toggleNumberedListBlock: (editor) => {
          if (!editor.value.selection.isFocused) {
            editor.focus();
          }
          toggle(editor, BLOCK_TAGS.ol);
        },
      },
      queries: {
        hasBulletedListBlock: (editor) => query(editor, BLOCK_TAGS.ul),
        hasNumberedListBlock: (editor) => query(editor, BLOCK_TAGS.ol),
      },
    },
  ];
};

export default ListPlugin;
