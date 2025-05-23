import { type CSSProperties } from 'react';
import {
  Editor,
  Transforms,
  Element as SlateElement,
  Text,
  Range,
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
import isUrl from 'is-url';

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
    case BLOCK_TAGS.a:
      return (
        <a style={style} {...attributes} rel="noopener noreferrer">
          {children}
        </a>
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
  const valueAsArray: Deserialized[] = Array.isArray(value) ? value : [value];
  if (
    SlateElement.isElementList(value) ||
    Text.isTextList(value) ||
    // in case of an array of mixed text and element nodes
    (Array.isArray(value) &&
      value.every((node) => SlateElement.isElement(node) || Text.isText(node)))
  ) {
    return valueAsArray
      .map((node) =>
        Text.isText(node) ? { type: 'text', children: [node] } : node
      )
      .filter(nonNullable);
  }
  return defaultSlateState;
};

const resetEditor = (editor: Editor, resetValue?: string) => {
  Transforms.delete(editor, {
    at: {
      anchor: Editor.start(editor, []),
      focus: Editor.end(editor, []),
    },
  });

  // remove empty node
  Transforms.removeNodes(editor, {
    at: [0],
  });

  const newState = resetValue
    ? validSlateStateAdapter(html.deserialize(resetValue))
    : defaultSlateState;

  // insert all new nodes
  Transforms.insertNodes(editor, newState);
};

const focusEditor = (editor: Editor) => {
  ReactEditor.focus(editor);
  Transforms.select(editor, Editor.end(editor, []));
};

/**
 * Softbreaker is a helper that is used to ensure
 * that slate editor can handle html-linebreaks correctly.
 */
const Softbreaker = {
  /**
   * The character that slate-editor considers a soft-linebreak
   */
  placeholderCharacter: '\n',
  /**
   * Returns a formatted version of the soft-linebreak character
   * which can be used by internal slate editor functions
   */
  getSlatePlaceholder() {
    return {
      text: this.placeholderCharacter,
    };
  },
  /**
   * replaces the slate-placeholder character with the html
   * equivalent = <br/>
   */
  serialize(str: string) {
    return str.split(this.placeholderCharacter).join('<br/>');
  },
  /**
   * Initial HMTL needs to be cleaned from soft-linebreak characters,
   * otherwise they are being transformed into <br/> tags
   */
  cleanHtml(html: string) {
    return html.split(this.placeholderCharacter).join('');
  },
};

export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
  return !!link;
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

export const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const linkNode: SlateElement & { type: 'link'; url: string } = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, linkNode);
  } else {
    Transforms.wrapNodes(editor, linkNode, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

// Keep your existing insertLink if it's different or preferred
export const insertLink = (editor: Editor, url: string) => {
  if (!editor.selection) return;
  wrapLink(editor, url); // Simplified to use wrapLink directly
};

const withLinks = (editor: Editor): Editor => {
  const { insertText, insertData, isInline } = editor;

  // Mark link elements as inline (from example)
  editor.isInline = (element) => {
    return element.type === 'link' || isInline(element);
  };

  // Handle URL pasting/typing to automatically create links (from example)
  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };
  return editor;
};

export {
  Element,
  Leaf,
  Softbreaker,
  isMarkActive,
  isBlockActive,
  toggleMark,
  toggleBlock,
  validSlateStateAdapter,
  resetEditor,
  focusEditor,
  withLinks,
};
