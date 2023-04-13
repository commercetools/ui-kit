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

const nowrap = `
  white-space: nowrap;
`;

const bold = `
  font-weight: ${designTokens.fontWeightForTextAsBold};
`;

const italic = `
  font-style: italic;
`;

const strikethrough = `
  text-decoration: line-through;
`;

const getTone = (tone: string) => {
  switch (tone) {
    case 'information':
      return `color: ${designTokens.colorInfo};`;
    case 'secondary':
      return `color: ${designTokens.colorNeutral40};`;
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
    case 'critical':
      return `color: ${designTokens.colorError40};`;
    case 'inherit':
      return 'color: inherit;';
    default:
      return ``;
  }
};

const getElementFontSize = (elementType?: string) => {
  switch (elementType) {
    case 'h1':
      return designTokens.fontSizeForTextAsH1;
    case 'h2':
      return designTokens.fontSizeForTextAsH2;
    case 'h3':
      return designTokens.fontSizeForTextAsH3;
    case 'h4':
      return designTokens.fontSizeForTextAsH4;
    case 'h5':
      return designTokens.fontSizeForTextAsH5;
    default:
      return '1rem';
  }
};

const getElementLineHeight = (elementType?: string) => {
  switch (elementType) {
    case 'h1':
      return designTokens.lineHeightForTextAsH1;
    case 'h2':
      return designTokens.lineHeightForTextAsH2;
    case 'h3':
      return designTokens.lineHeightForTextAsH3;
    case 'h4':
      return designTokens.lineHeightForTextAsH4;
    case 'h5':
      return designTokens.lineHeightForTextAsH5;
    default:
      return designTokens.lineHeight40;
  }
};

const getElementFontWeight = (elementType?: string) => {
  switch (elementType) {
    case 'h1':
      return designTokens.fontWeightForTextAsH1;
    case 'h2':
      return designTokens.fontWeightForTextAsH2;
    case 'h3':
      return designTokens.fontWeightForTextAsH3;
    case 'h4':
      return designTokens.fontWeightForTextAsH4;
    case 'h5':
      return designTokens.fontWeightForTextAsH5;
    default:
      return 'normal';
  }
};

export const bodyStyles = (props: TBodyProps) => css`
  ${getBaseStyles()}
  margin: 0;
  font-size: ${designTokens.fontSizeForTextAsBody};
  line-height: ${designTokens.lineHeightForTextAsBody};
  font-weight: ${designTokens.fontWeightForTextAsBody};
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.isStrikethrough && strikethrough}
  ${props.tone && getTone(props.tone)}
  ${props.truncate && truncate}
  ${props.nowrap && nowrap}
`;

export const headlineStyles = (props: THeadlineProps) => css`
  ${getBaseStyles()}
  margin: 0;
  font-size: ${getElementFontSize(props.as)};
  line-height: ${getElementLineHeight(props.as)};
  font-weight: ${getElementFontWeight(props.as)};
  ${props.truncate && truncate}
  ${props.nowrap && nowrap}
`;

export const subheadlineStyles = (props: TSubheadlineProps) => css`
  ${getBaseStyles()}
  margin: 0;
  font-size: ${getElementFontSize(props.as)};
  line-height: ${getElementLineHeight(props.as)};
  font-weight: ${getElementFontWeight(props.as)};
  ${props.truncate && truncate}
  ${props.nowrap && nowrap}
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
  font-size: ${designTokens.fontSizeForTextAsDetail};
  line-height: ${designTokens.lineHeightForTextAsDetail};
  font-weight: ${designTokens.fontWeightForTextAsDetail};
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.isStrikethrough && strikethrough}
  ${props.tone && getTone(props.tone)}
  ${props.truncate && truncate}
  ${props.nowrap && nowrap}
`;
