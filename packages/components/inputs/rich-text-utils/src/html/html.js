/* eslint-disable consistent-return */
import Html from 'slate-html-serializer';
import flatMap from 'lodash/flatMap';
import { MARK_TAGS, BLOCK_TAGS } from '../tags';

const mapper = {
  'font-weight': {
    bold: 'strong',
  },
  'text-decoration-line': {
    underline: 'u',
    'line-through': 'del',
  },
  'text-decoration': {
    underline: 'u',
  },
  'font-style': {
    italic: 'em',
  },
  'vertical-align': {
    sub: 'sub',
    super: 'sup',
  },
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

  {
    // Special case for code blocks, which need to grab the nested childNodes.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'span') {
        const styleAttribute = el.getAttribute('style');
        let tagName = 'span';
        const childNode = el.childNodes[0];

        if (styleAttribute) {
          const marks = flatMap(styleAttribute.split(';'), (val) => {
            const split = val.trim().split(' ');

            const [key, ...values] = split;

            return values.map((value) => ({
              // always remove the : from the key
              [key.slice(0, -1)]: value,
            }));
          })
            .map((val) => {
              const [key, value] = Object.entries(val)[0];
              return mapper[key] && mapper[key][value];
            })
            .filter((val) => Boolean(val));

          let deepestNode = el;

          if (marks && marks.length > 0) {
            tagName = marks[0];

            marks.forEach((mark) => {
              deepestNode.removeChild(childNode);
              const newNode = document.createElement(mark);
              newNode.appendChild(childNode);
              deepestNode.appendChild(newNode);
              deepestNode = newNode;
            });
          }
        }

        return {
          object: 'mark',
          type: MARK_TAGS[tagName],
          nodes: next(el.childNodes),
        };
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
          case 'span':
            return <span>{children}</span>;
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

// Create a new serializer instance with our `rules` from above.
const html = new Html({ rules });

export default html;
