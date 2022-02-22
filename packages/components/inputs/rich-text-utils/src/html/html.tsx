import Html from 'slate-html-serializer';
import flatMap from 'lodash/flatMap';
import { MARK_TAGS, BLOCK_TAGS } from '../tags';
import type { ReactNode } from 'react';

type TSerializableObject = {
  object: string;
  type: string;
  data: {
    get: (arg0: string) => string | undefined;
  };
};

type TAttributes = Record<string, string>;
type TMapper = Record<string, TAttributes>;

const mapper: TMapper = {
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
    deserialize(el: Element, next: (arg0: NodeListOf<ChildNode>) => unknown) {
      const type =
        BLOCK_TAGS[el.tagName.toLowerCase() as keyof typeof BLOCK_TAGS];
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
      return;
    },
    serialize(obj: TSerializableObject, children: ReactNode) {
      if (obj.object === 'block') {
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
      return;
    },
  },

  {
    // Special case for code blocks, which need to grab the nested childNodes.
    deserialize(el: Element, next: (arg0: NodeListOf<ChildNode>) => void) {
      if (el.tagName.toLowerCase() === 'span') {
        const styleAttribute = el.getAttribute('style');
        let tagName = 'span';
        const childNode = el.childNodes[0];

        if (styleAttribute) {
          const marks = flatMap(styleAttribute.split(';'), (val) => {
            const split = val.trim().split(' ');

            const [key, ...values] = split;

            return values.map<TAttributes>((value) => ({
              // always remove the : from the key
              [key.slice(0, -1)]: value,
            }));
          })
            .map((val) => {
              const [key, value] = Object.entries(val)[0];
              return mapper[key]?.[value];
            })
            .filter((val) => Boolean(val));

          let deepestNode = el;

          if (marks && marks.length > 0) {
            tagName = marks[0];

            marks.forEach((mark: string) => {
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
          type: MARK_TAGS[tagName as keyof typeof MARK_TAGS],
          nodes: next(el.childNodes),
        };
      }
      return;
    },
  },

  // Add a new rule that handles marks...
  {
    deserialize(el: Element, next: (arg0: NodeListOf<ChildNode>) => void) {
      const type =
        MARK_TAGS[el.tagName.toLowerCase() as keyof typeof MARK_TAGS];
      if (type) {
        return {
          object: 'mark',
          type,
          nodes: next(el.childNodes),
        };
      }
      return;
    },
    serialize(obj: TSerializableObject, children: ReactNode) {
      if (obj.object === 'mark') {
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
      return;
    },
  },
];

// Create a new serializer instance with our `rules` from above.
const html = new Html({ rules });

export default html;
