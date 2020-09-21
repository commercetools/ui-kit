import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getBaseStyles = (props, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return `
   color: ${overwrittenVars.colorSolid};
`;
};

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

const getTone = (tone, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };
  switch (tone) {
    case 'information':
      return `color: ${overwrittenVars.colorInfo};`;
    case 'secondary':
      return `color: ${overwrittenVars.colorNeutral60};`;
    case 'positive':
      return `color: ${overwrittenVars.colorPrimary25};`;
    case 'primary':
      return `color: ${overwrittenVars.colorPrimary};`;
    case 'negative':
      return `color: ${overwrittenVars.colorError};`;
    case 'inverted':
      return `color: ${overwrittenVars.colorSurface};`;
    case 'warning':
      return `color: ${overwrittenVars.colorWarning};`;
    default:
      return ``;
  }
};

const getElementFontSize = (elementType) => {
  switch (elementType) {
    case 'h1':
      return '2.4615rem';
    case 'h2':
      return '1.8462rem';
    case 'h3':
      return '1.5385rem';
    case 'h4':
      return '1.2308rem';
    case 'h5':
      return '1.0769rem';
    default:
      return '';
  }
};

export const bodyStyles = (props, theme) => css`
  ${getBaseStyles(props, theme)}
  margin: 0;
  font-size: 1rem;
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone, theme)}
  ${props.truncate && truncate}
`;

export const headlineStyles = (props, theme) => css`
  ${getBaseStyles(props, theme)}
  margin: 0;
  font-size: ${getElementFontSize(props.as || props.elementType)};
  font-weight: 300;
  ${props.truncate && truncate}
`;

export const subheadlineStyles = (props, theme) => css`
  ${getBaseStyles(props, theme)}
  margin: 0;
  font-size: ${getElementFontSize(props.as || props.elementType)};
  font-weight: normal;
  ${props.truncate && truncate}
  ${props.isBold && bold}
  ${props.tone && getTone(props.tone, theme)}
`;

export const wrapStyles = (props, theme) => css`
  ${getBaseStyles(props, theme)}
  font-size: 1rem;
  white-space: pre-wrap;
`;

export const detailStyles = (props, theme) => css`
  ${getBaseStyles(props, theme)}
  display: block;
  font-size: 0.9231rem;
  ${props.isInline && inline}
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone, theme)}
  ${props.truncate && truncate}
`;
