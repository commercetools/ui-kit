/* eslint-disable consistent-return */
import React from 'react';

const BLOCK_TAGS = {
  blockquote: 'quote',
  p: 'paragraph',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  h4: 'heading-four',
  h5: 'heading-five',
  pre: 'code',
  li: 'list-item',
};

// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underlined',
  sup: 'superscript',
  sub: 'subscript',
  del: 'strikethrough',
};

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'block',
          type,
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block') {
        // eslint-disable-next-line default-case
        switch (obj.type) {
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
          case 'bulleted-list':
            return <ul>{children}</ul>;
          case 'numbered-list':
            return <ol>{children}</ol>;
          case 'list-item':
            return <li>{children}</li>;
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>;
          case 'heading-one':
            return <h1 className={obj.data.get('className')}>{children}</h1>;
          case 'heading-two':
            return <h2 className={obj.data.get('className')}>{children}</h2>;
          case 'heading-three':
            return <h3 className={obj.data.get('className')}>{children}</h3>;
          case 'heading-four':
            return <h4 className={obj.data.get('className')}>{children}</h4>;
          case 'heading-five':
            return <h5 className={obj.data.get('className')}>{children}</h5>;
          case 'block-quote':
            return <blockquote>{children}</blockquote>;
        }
      }
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'mark',
          type,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        // eslint-disable-next-line default-case
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'underlined':
            return <u>{children}</u>;
          case 'superscript':
            return <sup>{children}</sup>;
          case 'subscript':
            return <sub>{children}</sub>;
          case 'strikethrough':
            return <del>{children}</del>;
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
        }
      }
    },
  },
];

export default rules;
