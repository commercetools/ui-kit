import type { CSSProperties } from 'react';
import {
  Editor,
  Transforms,
  Element as SlateElement,
  Text,
  type BaseEditor,
  type BaseText,
  type Editor as TEditor,
  type Descendant,
} from 'slate';
import {
  ReactEditor,
  type ReactEditor as TReactEditor,
  type RenderElementProps,
  type RenderLeafProps,
} from 'slate-react';
import type { HistoryEditor } from 'slate-history';
import { BLOCK_TAGS, MARK_TAGS } from './tags';
import { defaultSlateState, type Deserialized } from './html';

type CustomElement = {
  type: Format;
  children: CustomText[];
  align?: string;
};
type CustomText = BaseText & {
  bold?: boolean;
  code?: string;
  italic?: string;
  underline?: string;
  superscript?: string;
  subscript?: string;
  strikethrough?: string;
};
type Format = typeof BLOCK_TAGS[keyof typeof BLOCK_TAGS] &
  typeof MARK_TAGS[keyof typeof MARK_TAGS];

// Slate's way of providing custom type annotations comes down to extending `CustomTypes` interface
// more: https://docs.slatejs.org/concepts/12-typescript
// example: https://github.com/ianstormtaylor/slate/blob/main/packages/slate-react/src/custom-types.ts
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & TReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const LIST_TYPES = [BLOCK_TAGS.ol, BLOCK_TAGS.ul];

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
    case BLOCK_TAGS.p:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

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

const isMarkActive = (editor: TEditor, format: Format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof marks] === true : false;
};

const toggleMark = (editor: Editor, format: Format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

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

const validSlateStateAdapter = (
  value: Deserialized | Deserialized[]
): Descendant[] => {
  if (SlateElement.isElement(value) || Text.isText(value)) {
    return [value];
  }
  if (SlateElement.isElementList(value) || Text.isTextList(value)) {
    return value;
  }
  return defaultSlateState;
};

const resetEditor = (editor: Editor, resetValue?: Descendant[]) => {
  const totalNodes = editor.children.length;
  Transforms.removeNodes(editor, {
    at: [0, totalNodes - 1],
  });
  if (resetValue) {
    Transforms.insertNodes(editor, resetValue, { at: [0, totalNodes - 1] });
    Transforms.unwrapNodes(editor, { at: [0] });
  }
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
