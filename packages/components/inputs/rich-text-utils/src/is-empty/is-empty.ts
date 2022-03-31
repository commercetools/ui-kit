import { Text, Element } from 'slate';
import html from '../html';

const isTextNodeNonEmpty = (node: Text) =>
  Text.isText(node) && node.text !== '';

const isEmpty = (rawValue: string): boolean => {
  const deserialized = html.deserialize(rawValue);
  if (Element.isElement(deserialized)) {
    return !deserialized.children.some(isTextNodeNonEmpty);
  }
  if (Element.isElementList(deserialized)) {
    return deserialized.some(
      (node) =>
        !(Element.isElement(node) && node.children.some(isTextNodeNonEmpty)) ||
        (Text.isText(node) && node.text === '')
    );
  }
  return true;
};

export default isEmpty;
