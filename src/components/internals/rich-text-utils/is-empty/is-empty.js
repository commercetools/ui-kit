import html from '../html';

const isEmpty = (rawValue) => html.deserialize(rawValue).document.text === '';

export default isEmpty;
