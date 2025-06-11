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
  font-weight: ${designTokens.fontWeight600};
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
      return `color: ${designTokens.colorSuccess40};`;
    case 'primary':
      return `color: ${designTokens.colorPrimary30};`;
    case 'negative':
      return `color: ${designTokens.fontColorForInputWhenError};`;
    case 'inverted':
      return `color: ${designTokens.colorSurface};`;
    case 'warning':
      return `color: ${designTokens.colorWarning};`;
    case 'critical':
      return `color: ${designTokens.colorError40};`;
    case 'tertiary':
      return `color: ${designTokens.colorNeutral50};`;
    case 'inherit':
      return 'color: inherit;';
    default:
      return ``;
  }
};

const getFontWeight = (props: { isBold?: boolean; fontWeight?: string }) => {
  switch (props.fontWeight) {
    case 'regular':
      return `font-weight: ${designTokens.fontWeight400};`;
    case 'medium':
      return `font-weight: ${designTokens.fontWeight500};`;
    case 'bold':
      return `font-weight: ${designTokens.fontWeight600};`;
    default:
      if (props.isBold) {
        return `font-weight: ${designTokens.fontWeight600};`;
      }
      return ``;
  }
};

const getElementFontSize = (elementType?: string) => {
  switch (elementType) {
    case 'h1':
      return designTokens.fontSize60;
    case 'h2':
      return designTokens.fontSize50;
    case 'h3':
      return designTokens.fontSize40;
    case 'h4':
      return designTokens.fontSize30;
    case 'h5':
      return designTokens.fontSize30;
    default:
      return '1rem';
  }
};

const getElementLineHeight = (elementType?: string) => {
  switch (elementType) {
    case 'h1':
      return designTokens.lineHeight60;
    case 'h2':
      return designTokens.lineHeight50;
    case 'h3':
      return designTokens.lineHeight30;
    case 'h4':
      return designTokens.lineHeight20;
    case 'h5':
      return designTokens.lineHeight20;
    default:
      return designTokens.lineHeight40;
  }
};

const getElementFontWeight = (elementType?: string) => {
  switch (elementType) {
    case 'h1':
      return designTokens.fontWeight600;
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
      return designTokens.fontWeight500;
    default:
      return 'normal';
  }
};

export const bodyStyles = (props: TBodyProps) => css`
  ${getBaseStyles()}
  margin: 0;
  font-size: ${designTokens.fontSize30};
  line-height: ${designTokens.lineHeight40};
  font-weight: ${designTokens.fontWeight400};
  ${props.isItalic && italic}
  ${props.isStrikethrough && strikethrough}
  ${props.tone && getTone(props.tone)}
  ${getFontWeight(props)}
  ${props.truncate && truncate}
  ${props.nowrap && nowrap}
`;

export const headlineStyles = (props: THeadlineProps) => css`
  ${getBaseStyles()}
  margin: 0;
  font-size: ${getElementFontSize(props.as)};
  line-height: ${getElementLineHeight(props.as)};
  font-weight: ${getElementFontWeight(props.as)};
  ${props.tone && getTone(props.tone)}
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
  overflow-wrap: break-word;
`;

export const detailStyles = (props: TDetailProps) => css`
  ${getBaseStyles()}
  font-size: ${designTokens.fontSize20};
  line-height: ${designTokens.lineHeight20};
  font-weight: ${designTokens.fontWeight400};
  ${props.isItalic && italic}
  ${props.isStrikethrough && strikethrough}
  ${props.tone && getTone(props.tone)}
  ${getFontWeight(props)}
  ${props.truncate && truncate}
  ${props.nowrap && nowrap}
`;

export const captionStyles = (props: TDetailProps) => css`
  ${getBaseStyles()}
  font-size: ${designTokens.fontSize10};
  line-height: ${designTokens.lineHeight05};
  font-weight: ${designTokens.fontWeight400};
  ${props.isItalic && italic}
  ${props.isStrikethrough && strikethrough}
  ${props.tone && getTone(props.tone)}
  ${getFontWeight(props)}
  ${props.truncate && truncate}
  ${props.nowrap && nowrap}
`;
