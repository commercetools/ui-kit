import React from 'react';
import { isKeyHotkey } from 'is-hotkey';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');

export const MarkHotkeyPlugin = () => {
  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    // eslint-disable-next-line consistent-return
    onKeyDown(event, editor, next) {
      let mark;

      if (isBoldHotkey(event)) {
        mark = 'bold';
      } else if (isItalicHotkey(event)) {
        mark = 'italic';
      } else if (isUnderlinedHotkey(event)) {
        mark = 'underlined';
      } else {
        return next();
      }

      event.preventDefault();
      editor.toggleMark(mark);
    },
  };
};

export const RenderBlockPlugin = () => {
  return {
    renderBlock(props, editor, next) {
      const { attributes, children, node } = props;

      switch (node.type) {
        case 'code':
          return (
            <pre>
              <code {...attributes}>{children}</code>
            </pre>
          );
        case 'block-quote':
          return <blockquote {...attributes}>{children}</blockquote>;
        case 'bulleted-list':
          return <ul {...attributes}>{children}</ul>;
        case 'heading-one':
          return <h1 {...attributes}>{children}</h1>;
        case 'heading-two':
          return <h2 {...attributes}>{children}</h2>;
        case 'heading-three':
          return <h3 {...attributes}>{children}</h3>;
        case 'heading-four':
          return <h4 {...attributes}>{children}</h4>;
        case 'heading-five':
          return <h5 {...attributes}>{children}</h5>;
        case 'list-item':
          return <li {...attributes}>{children}</li>;
        case 'numbered-list':
          return <ol {...attributes}>{children}</ol>;
        default:
          return next();
      }
    },
  };
};

// eslint-disable-next-line import/prefer-default-export
export const RenderMarkPlugin = () => {
  return {
    renderMark(props, editor, next) {
      const { children, mark, attributes } = props;

      switch (mark.type) {
        case 'superscript':
          return <sup {...attributes}>{children}</sup>;
        case 'subscript':
          return <sub {...attributes}>{children}</sub>;
        case 'strikethrough':
          return <del {...attributes}>{children}</del>;
        case 'bold':
          return <strong {...attributes}>{children}</strong>;
        case 'code':
          return <code {...attributes}>{children}</code>;
        case 'italic':
          return <em {...attributes}>{children}</em>;
        case 'underlined':
          return <u {...attributes}>{children}</u>;
        default:
          return next();
      }
    },
  };
};
