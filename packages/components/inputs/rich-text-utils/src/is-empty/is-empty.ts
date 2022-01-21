import html from '../html';

const isEmpty = (rawValue: unknown): boolean =>
  html.deserialize(rawValue).document.text === '';

export default isEmpty;
