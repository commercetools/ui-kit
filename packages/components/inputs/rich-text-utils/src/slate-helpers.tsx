import type { CSSProperties } from 'react';
import {
  Editor,
  Transforms,
  Element as SlateElement,
  Text,
  type Editor as TEditor,
  type Descendant,
} from 'slate';
import {
  ReactEditor,
  type RenderElementProps,
  type RenderLeafProps,
} from 'slate-react';
import { BLOCK_TAGS } from './tags';
import html, {
  defaultSlateState,
  type Deserialized,
  type Format,
  type CustomElement,
} from './html';

const LIST_TYPES = [BLOCK_TAGS.ol, BLOCK_TAGS.ul];

/* 
  From Slate's own implementation of rich text editor
  https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx#L133:L179
 */
const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style = { textAlign: element.align } as CSSProperties;
  switch (element.type) {
    case BLOCK_TAGS.blockquote:
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case BLOCK_TAGS.ul:
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case BLOCK_TAGS.h1:
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case BLOCK_TAGS.h2:
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case BLOCK_TAGS.h3:
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case BLOCK_TAGS.h4:
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case BLOCK_TAGS.h5:
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      );
    case BLOCK_TAGS.li:
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case BLOCK_TAGS.ol:
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

/* 
  From Slate's own implementation of rich text editor
  https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx#L181:L199
 */
const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }
  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }
  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
};

/* 
  From Slate's own implementation of rich text editor
  https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx#L128:L131
 */
const isMarkActive = (editor: TEditor, format: Format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof marks] === true : false;
};

/* 
  From Slate's own implementation of rich text editor
  https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx#L101:L09
 */
const toggleMark = (editor: Editor, format: Format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

/* 
  From Slate's own implementation of rich text editor
  https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx#L111:L126
 */
const isBlockActive = (editor: TEditor, format: Format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return Boolean(match);
};

/* 
  From slate's own implementation of rich text editor
  https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx#L67:L99
 */
const toggleBlock = (editor: TEditor, format: Format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties: Partial<CustomElement> = {
    type: isActive ? BLOCK_TAGS.p : isList ? BLOCK_TAGS.li : format,
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block: CustomElement = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

const validSlateStateAdapter = (
  value: Deserialized | Deserialized[]
): Descendant[] => {
  if (SlateElement.isElement(value) || Text.isText(value)) {
    return [value];
  }
  if (
    SlateElement.isElementList(value) ||
    Text.isTextList(value) ||
    // in case of an array of mixed text and element nodes
    (Array.isArray(value) &&
      value.every((node) => SlateElement.isElement(node) || Text.isText(node)))
  ) {
    return value.filter(nonNullable);
  }
  return defaultSlateState;
};

const resetEditor = (editor: Editor, resetValue?: string) => {
  const children = [...editor.children];
  children.forEach((node) =>
    editor.apply({ type: 'remove_node', path: [0], node })
  );
  const newState = resetValue
    ? validSlateStateAdapter(html.deserialize(resetValue))
    : defaultSlateState;
  editor.apply({
    type: 'insert_node',
    path: [0],
    node: newState[0],
  });
};

const focusEditor = (editor: Editor) => {
  ReactEditor.focus(editor);
  Transforms.select(editor, Editor.end(editor, []));
};

export {
  Element,
  Leaf,
  isMarkActive,
  isBlockActive,
  toggleMark,
  toggleBlock,
  validSlateStateAdapter,
  resetEditor,
  focusEditor,
};
