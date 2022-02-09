import html from '../html';

const isEmpty = (rawValue: string): boolean =>
  html.deserialize(rawValue).document.text === '';

export default isEmpty;
