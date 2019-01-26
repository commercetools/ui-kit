import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const baseStyles = `
  font-family: ${vars.fontFamilyDefault};
  color: ${vars.colorBlack};
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
      return `color: ${vars.colorBlue};`;
    case 'secondary':
      return `color: ${vars.colorGray60};`;
    case 'positive':
      return `color: ${vars.colorGreen25};`;
    case 'primary':
      return `color: ${vars.colorGreen};`;
    case 'negative':
      return `color: ${vars.colorRed};`;
    case 'inverted':
      return `color: ${vars.colorWhite};`;
    case 'warning':
      return `color: ${vars.colorOrange};`;
    default:
      return ``;
  }
};

const getElementFontSize = elementType => {
  switch (elementType) {
    case 'h1':
      return '2.461538461rem';
    case 'h2':
      return '1.8461538461rem';
    case 'h3':
      return '1.5384615384rem';
    case 'h4':
      return '1.2307692307rem';
    case 'h5':
      return '1.0769230769rem';
    default:
      return '';
  }
};

export const bodyStyles = props => css`
  ${baseStyles}
  margin: 0;
  font-size: 1rem;
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone)}
  ${props.truncate && truncate}
`;

export const headlineStyles = props => css`
  ${baseStyles}
  margin: 0;
  font-size: ${getElementFontSize(props.elementType)};
  font-weight: 300;
  ${props.truncate && truncate}
`;

export const subheadlineStyles = props => css`
  ${baseStyles}
  margin: 0;
  font-size: ${getElementFontSize(props.elementType)};
  font-weight: normal;
  ${props.truncate && truncate}
  ${props.isBold && bold}
  ${props.tone && getTone(props.tone)}
`;

export const wrapStyles = () => css`
  ${baseStyles}
  font-size: 1rem;
  white-space: pre-wrap;
`;

export const detailStyles = props => css`
  ${baseStyles}
  display: block;
  font-size: 0.923076923rem;
  ${props.isInline && inline}
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone)}
  ${props.truncate && truncate}
`;
