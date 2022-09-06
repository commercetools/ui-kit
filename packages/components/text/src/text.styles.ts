import type {
  TBodyProps,
  THeadlineProps,
  TSubheadlineProps,
  TDetailProps,
} from './text';

import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

const getBaseStyles = () => {
  return `
   color: ${designTokens.colorSolid};
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

const getTone = (tone: string) => {
  switch (tone) {
    case 'information':
      return `color: ${designTokens.colorInfo};`;
    case 'secondary':
      return `color: ${designTokens.colorNeutral60};`;
    case 'positive':
      return `color: ${designTokens.colorPrimary25};`;
    case 'primary':
      return `color: ${designTokens.colorPrimary};`;
    case 'negative':
      return `color: ${designTokens.colorError};`;
    case 'inverted':
      return `color: ${designTokens.colorSurface};`;
    case 'warning':
      return `color: ${designTokens.colorWarning};`;
    default:
      return ``;
  }
};

const getElementFontSize = (elementType?: string) => {
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

export const bodyStyles = (props: TBodyProps) => css`
  ${getBaseStyles()}
  margin: 0;
  font-size: 1rem;
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone)}
  ${props.truncate && truncate}
`;

export const headlineStyles = (props: THeadlineProps) => css`
  ${getBaseStyles()}
  margin: 0;
  font-size: ${getElementFontSize(props.as)};
  font-weight: 300;
  ${props.truncate && truncate}
`;

export const subheadlineStyles = (props: TSubheadlineProps) => css`
  ${getBaseStyles()}
  margin: 0;
  font-size: ${getElementFontSize(props.as)};
  font-weight: normal;
  ${props.truncate && truncate}
  ${props.isBold && bold}
  ${props.tone && getTone(props.tone)}
`;

export const wrapStyles = () => css`
  ${getBaseStyles()}
  font-size: 1rem;
  white-space: pre-wrap;
`;

export const detailStyles = (props: TDetailProps) => css`
  ${getBaseStyles()}
  font-size: 0.9231rem;
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone)}
  ${props.truncate && truncate}
`;
