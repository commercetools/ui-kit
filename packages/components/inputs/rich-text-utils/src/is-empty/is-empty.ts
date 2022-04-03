import {
  Text,
  Element,
  type Text as TText,
  type Element as TElement,
} from 'slate';
import html from '../html';

const isTextNodeNonEmpty = (node: TText) =>
  Text.isText(node) && node.text !== '';

const isElementNodeNonEmpty = (node: TElement) =>
  node.children.some(isTextNodeNonEmpty);

/*
  Slate editor must contain at least one element.
  more: https://github.com/ianstormtaylor/slate/issues/3613

  Therefore, editor is considered non-empty if has at least one child element with non-empty text.
*/
const isEmpty = (rawValue: string): boolean => {
  const deserialized = html.deserialize(rawValue);

  if (Element.isElement(deserialized)) {
    return !deserialized.children.some(isTextNodeNonEmpty);
  }
  if (Element.isElementList(deserialized)) {
    return deserialized.some(
      (node) =>
        !(
          Element.isElement(node) &&
          node.children.some((node) =>
            Text.isText(node)
              ? isTextNodeNonEmpty(node)
              : isElementNodeNonEmpty(node as TElement)
          )
        ) ||
        (Text.isText(node) && node.text === '')
    );
  }
  return true;
};

export default isEmpty;
