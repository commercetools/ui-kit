import { ReactNode } from 'react';
import { BLOCK_TAGS } from '../tags';
import type { TEditor } from '../editor.types';

type TType = {
  type: string;
};

type TListPlugin = {
  attributes: unknown;
  children: ReactNode;
  node: TType;
};

const DEFAULT_NODE = BLOCK_TAGS.p;

const hasBlock = (type: string, editor: TEditor) =>
  editor.value.blocks.some((node: { type: string }) => {
    return node.type === type;
  });

const toggle = (editor: TEditor, typeName: string) => {
  // Handle the extra wrapping required for list buttons.
  const isList = hasBlock(BLOCK_TAGS.li, editor);
  const isType = editor.value.blocks.some(
    (block: { key: { key: unknown } }) => {
      return Boolean(
        editor.value.document.getClosest(
          block.key,
          (parent: { type: string }) => {
            return parent.type === typeName;
          }
        )
      );
    }
  );

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

const query = (editor: TEditor, typeName: string) => {
  let isActive = hasBlock(typeName, editor);

  if (
    typeof editor.value.blocks.size === 'number' &&
    editor.value.blocks.size > 0
  ) {
    const parent = editor.value.document.getParent?.(
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
      renderBlock(
        props: TListPlugin,
        _editor: TEditor,
        next: () => JSX.Element
      ) {
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
        toggleBulletedListBlock: (editor: TEditor) => {
          if (!editor.value.selection.isFocused) {
            editor.focus();
          }
          toggle(editor, BLOCK_TAGS.ul);
        },
        toggleNumberedListBlock: (editor: TEditor) => {
          if (!editor.value.selection.isFocused) {
            editor.focus();
          }
          toggle(editor, BLOCK_TAGS.ol);
        },
      },
      queries: {
        hasBulletedListBlock: (editor: TEditor) => query(editor, BLOCK_TAGS.ul),
        hasNumberedListBlock: (editor: TEditor) => query(editor, BLOCK_TAGS.ol),
      },
    },
  ];
};

export default ListPlugin;
