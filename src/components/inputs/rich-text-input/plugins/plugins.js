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

      const alignment = node.data.get('alignment');

      const spreadAttributes = alignment
        ? {
            ...attributes,
            style: {
              textAlign: alignment,
            },
          }
        : attributes;

      switch (node.type) {
        case 'code':
          return (
            <pre>
              <code {...spreadAttributes}>{children}</code>
            </pre>
          );
        case 'paragraph':
          return <p {...spreadAttributes}>{children}</p>;
        case 'block-quote':
          return <blockquote {...spreadAttributes}>{children}</blockquote>;
        case 'bulleted-list':
          return <ul {...spreadAttributes}>{children}</ul>;
        case 'heading-one':
          return <h1 {...spreadAttributes}>{children}</h1>;
        case 'heading-two':
          return <h2 {...spreadAttributes}>{children}</h2>;
        case 'heading-three':
          return <h3 {...spreadAttributes}>{children}</h3>;
        case 'heading-four':
          return <h4 {...spreadAttributes}>{children}</h4>;
        case 'heading-five':
          return <h5 {...spreadAttributes}>{children}</h5>;
        case 'list-item':
          return <li {...spreadAttributes}>{children}</li>;
        case 'numbered-list':
          return <ol {...spreadAttributes}>{children}</ol>;
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
