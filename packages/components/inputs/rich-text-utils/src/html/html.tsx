import escapeHtml from 'escape-html';
import {
  Text,
  Element as SlateElement,
  type Descendant,
  type Node as TNode,
  type Element as TElement,
  type Text as TText,
  type BaseEditor,
  type BaseText,
} from 'slate';
import { type ReactEditor as TReactEditor } from 'slate-react';
import { jsx } from 'slate-hyperscript';
import parse from 'style-to-object';
import isEmpty from 'lodash/isEmpty';
import type { HistoryEditor } from 'slate-history';
import { BLOCK_TAGS, MARK_TAGS } from '../tags';
import { Softbreaker } from '../slate-helpers';

type Html = string;

export type CustomElement = {
  type: Format;
  children: CustomText[];
  align?: string;
  url?: string;
  htmlAttributes?: Record<string, string>;
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
export type Format = (typeof BLOCK_TAGS)[keyof typeof BLOCK_TAGS] &
  (typeof MARK_TAGS)[keyof typeof MARK_TAGS];

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

const serializeNode = (node: TNode): Html => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.code) {
      string = `<code>${string}</code>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    if (node.superscript) {
      string = `<sup>${string}</sup>`;
    }
    if (node.subscript) {
      string = `<sub>${string}</sub>`;
    }
    if (node.strikethrough) {
      string = `<del>${string}</del>`;
    }

    // Replace all Linebreaks (that are caused by the editor) with a br-tag
    string = Softbreaker.serialize(string);

    return string;
  }

  const children = node.children.map(serializeNode).join('');
  const element = node as CustomElement; // Use updated CustomElement

  switch (element.type) {
    case 'block-quote':
      return `<blockquote>${children}</blockquote>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'code':
      return `<pre>
            <code>${children}</code>`;
    case 'span':
      return `<span>${children}</span>`;
    case 'bulleted-list':
      return `<ul>${children}</ul>`;
    case 'numbered-list':
      return `<ol>${children}</ol>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case BLOCK_TAGS.a: // Handle link serialization
      // eslint-disable-next-line no-case-declarations
      let hrefAttr = '';
      if (element.url) {
        // Sanitize href to prevent javascript: URLs during serialization as well
        const sanitizedUrl = (() => {
          const url = String(element.url).trim().toLowerCase();
          if (url.startsWith('javascript:') || url.startsWith('data:') || url.startsWith('vbscript:')) {
            return '#';
          }
          return String(element.url);
        })();
        hrefAttr = ` href="${escapeHtml(sanitizedUrl)}"`;
      }
      // eslint-disable-next-line no-case-declarations
      let otherAttrsString = '';
      if (
        element.htmlAttributes &&
        typeof element.htmlAttributes === 'object'
      ) {
        for (const [key, value] of Object.entries(element.htmlAttributes)) {
          // Strip event handlers during serialization too
          if (!key.toLowerCase().startsWith('on')) {
            otherAttrsString += ` ${escapeHtml(key)}="${escapeHtml(
              String(value)
            )}"`;
          }
        }
      }
      return `<a${hrefAttr}${otherAttrsString}>${children}</a>`;
    case 'heading-one':
      return `<h1>${children}</h1>`;
    case 'heading-two':
      return `<h2>${children}</h2>`;
    case 'heading-three':
      return `<h3>${children}</h3>`;
    case 'heading-four':
      return `<h4>${children}</h4>`;
    case 'heading-five':
      return `<h5>${children}</h5>`;
    default:
      return children;
  }
};

const isEmptyParagraph = (value: Deserialized): boolean =>
  SlateElement.isElement(value) &&
  value.type === 'paragraph' &&
  value.children.length === 1 &&
  value.children[0].text === '';

const serializeSingle = (value: Deserialized): Html => {
  if (value === null || isEmptyParagraph(value)) return '';
  return serializeNode(value);
};

const serialize = (value: Deserialized | Deserialized[]): Html => {
  let outputHtml = '';
  if (value === null || !Array.isArray(value)) {
    outputHtml = serializeSingle(value);
  } else {
    outputHtml = value.map((node) => serializeSingle(node)).join('');
  }
  return outputHtml;
};

const ELEMENT_TAGS: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (el: HTMLElement) => Record<string, any>
> = {
  A: (el: HTMLElement) => {
    const props: Record<string, unknown> = { type: BLOCK_TAGS.a };
    const htmlAttributes: Record<string, string> = {};

    for (const attr of Array.from(el.attributes)) {
      const attrName = attr.name.toLowerCase();
      const attrValue = attr.value;

      if (attrName === 'href') {
        // Sanitize href to prevent javascript: URLs
        const sanitizedValue = decodeURI(attrValue).trim().toLowerCase();
        if (sanitizedValue.startsWith('javascript:') || sanitizedValue.startsWith('data:') || sanitizedValue.startsWith('vbscript:')) {
          props.url = '#'; // Replace with a safe value
        } else {
          props.url = attrValue;
        }
      } else if (!attrName.startsWith('on')) {
        // Strip event handlers
        htmlAttributes[attrName] = attrValue;
      }
    }

    if (Object.keys(htmlAttributes).length > 0) {
      props.htmlAttributes = htmlAttributes;
    }
    return props;
  },
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
};

const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  SUP: () => ({ superscript: true }),
  SUB: () => ({ subscript: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

type TAttributes = Record<string, boolean>;
type TMapper = Record<string, Record<string, TAttributes>>;
const mapper: TMapper = {
  'font-weight': {
    bold: { bold: true },
  },
  'text-decoration-line': {
    underline: { underline: true },
    'line-through': { strikethrough: true },
  },
  'text-decoration': {
    underline: { underline: true },
  },
  'font-style': {
    italic: { italic: true },
  },
  'vertical-align': {
    sup: { superscript: true },
    sub: { subscript: true },
  },
};

const wrapWithParagraph = (
  textContent: TElement | TText | (TElement | TText)[]
) => jsx('element', { type: 'paragraph' }, textContent);

const wrapWithParagraphIfRootElement = (
  el: HTMLElement | ChildNode,
  textContent: TElement | TText | (TElement | TText)[]
) =>
  el.parentNode?.nodeName === 'BODY' // root element, because body is eventually turned to React fragment
    ? wrapWithParagraph(textContent)
    : textContent;

export type Deserialized = Descendant | null;

const deserializeElement = (
  el: HTMLElement | ChildNode
): Deserialized | Deserialized[] => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#value
  if (el.nodeType === 3) {
    return wrapWithParagraphIfRootElement(el, { text: el.textContent || '' }); // for root TEXT_NODE -> wrap with <p>
  } else if (el.nodeType !== 1) {
    return null; // for non-ELEMENT_NODE
  }

  const { nodeName } = el;
  let parent = el;

  if (nodeName === 'BR') {
    return Softbreaker.getSlatePlaceholder();
  }

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0];
  }
  let children: Deserialized[] = Array.from(parent.childNodes)
    .map(deserializeElement)
    .flat();

  if (children.length === 0) {
    children = [{ text: '' }];
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (el.nodeName === 'SPAN') {
    let attrs = {};
    const styleStr = (el as HTMLElement).getAttribute('style');
    const styleObj = parse(styleStr || '');

    if (isEmpty(styleObj)) {
      // if no style attrs -> just use `span`
      return wrapWithParagraphIfRootElement(
        el,
        jsx('element', { type: 'span' }, children)
      );
    } else {
      attrs = Object.entries(styleObj || {}).reduce(
        (mappedAttrObj, [key, value]) => {
          const values = value.split(' '); // to cover the case of space-separated values e.g. `text-decoration-line: "underline line-through"`

          values.forEach((splittedValue) => {
            if (mapper[key]?.[splittedValue]) {
              // checking if the parsed style attr value has representation in the mapper obj
              mappedAttrObj = {
                ...mappedAttrObj,
                ...mapper[key][splittedValue],
              };
            }
          });
          return mappedAttrObj;
        },
        {}
      );
      if (isEmpty(attrs)) {
        // if all style attr values are irrelevant -> just use `span`
        return wrapWithParagraphIfRootElement(
          el,
          jsx('element', { type: 'span' }, children)
        );
      }
      return wrapWithParagraphIfRootElement(
        el,
        // children mapping to cover nested elements within text e.g. <span>Some <span>text</span></span>
        children.map((child) =>
          Text.isText(child)
            ? jsx('text', attrs, child)
            : jsx('element', attrs, child)
        )
      );
    }
  }

  // Modified to use the updated ELEMENT_TAGS for 'A'
  if (ELEMENT_TAGS[nodeName as keyof typeof ELEMENT_TAGS]) {
    const attrs = ELEMENT_TAGS[nodeName as keyof typeof ELEMENT_TAGS](
      el as HTMLElement // Pass element to access its attributes
    );
    return jsx('element', attrs, children);
  }

  if (TEXT_TAGS[nodeName as keyof typeof TEXT_TAGS]) {
    const attrs = TEXT_TAGS[nodeName as keyof typeof TEXT_TAGS]();
    return children.map((child) =>
      jsx('text', attrs, Text.isText(child) ? child : 'Invalid markup')
    );
  }

  return children;
};
const deserialize = (html: Html) => {
  const document = new DOMParser().parseFromString(
    Softbreaker.cleanHtml(html) || '<p></p>',
    'text/html'
  );
  return deserializeElement(document.body);
};

export const defaultSlateState: Descendant[] = [
  { type: 'paragraph', children: [{ text: '' }] },
];

const html = {
  serialize,
  deserialize,
};

export default html;
