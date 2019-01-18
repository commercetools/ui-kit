import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties.json';

const baseStyles = `
  font-family: ${vars['--font-family-default']};
  margin: 0;
  color: ${vars['--color-black']};
`;

const truncate = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const bold = `
  font-weight: bold;
`;

const italic = `
  font-style: italic;
`;

const inline = `
  display: inline-block;
`;

const getTone = tone => {
  switch (tone) {
    case 'information':
      return `color: ${vars['--color-blue']};`;
    case 'secondary':
      return `color: ${vars['--color-gray-60']};`;
    case 'positive':
      return `color: ${vars['--color-green-25']};`;
    case 'primary':
      return `color: ${vars['--color-green']};`;
    case 'negative':
      return `color: ${vars['--color-red']};`;
    case 'inverted':
      return `color: ${vars['--color-white']};`;
    case 'warning':
      return `color: ${vars['--color-orange']};`;
    default:
      return ``;
  }
};

const getElementFontSize = elementType => {
  switch (elementType) {
    case 'h1':
      return '32px';
    case 'h2':
      return '24px';
    case 'h3':
      return '20px';
    case 'h4':
      return '16px';
    case 'h5':
      return '14px';
    default:
      return '';
  }
};

export const bodyStyles = props => css`
  ${baseStyles}
  font-size: 13px;
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone)}
  ${props.truncate && truncate}
`;

export const headlineStyles = props => css`
  ${baseStyles}
  font-size: ${getElementFontSize(props.elementType)};
  font-weight: 300;
  ${props.truncate && truncate}
`;

export const subheadlineStyles = props => css`
  ${baseStyles}
  font-size: ${getElementFontSize(props.elementType)};
  font-weight: normal;
  ${props.truncate && truncate}
  ${props.isBold && bold}
  ${props.tone && getTone(props.tone)}
`;

export const wrapStyles = () => css`
  ${baseStyles}
  font-size: 13px;
  white-space: pre-wrap;
`;

export const detailStyles = props => css`
  ${baseStyles}
  display: block;
  font-size: 12px;
  ${props.isInline && inline}
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone)}
  ${props.truncate && truncate}
`;
