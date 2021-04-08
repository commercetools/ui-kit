import type { Theme } from '@emotion/react';
import type {
  TBodyProps,
  THeadlineProps,
  TSubheadlineProps,
  TDetailProps,
} from './text';

import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getBaseStyles = (theme: Theme) => {
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

const getTone = (tone: string, theme: Theme) => {
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

export const bodyStyles = (props: TBodyProps, theme: Theme) => css`
  ${getBaseStyles(theme)}
  margin: 0;
  font-size: 1rem;
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone, theme)}
  ${props.truncate && truncate}
`;

export const headlineStyles = (props: THeadlineProps, theme: Theme) => css`
  ${getBaseStyles(theme)}
  margin: 0;
  font-size: ${getElementFontSize(props.as)};
  font-weight: 300;
  ${props.truncate && truncate}
`;

export const subheadlineStyles = (
  props: TSubheadlineProps,
  theme: Theme
) => css`
  ${getBaseStyles(theme)}
  margin: 0;
  font-size: ${getElementFontSize(props.as)};
  font-weight: normal;
  ${props.truncate && truncate}
  ${props.isBold && bold}
  ${props.tone && getTone(props.tone, theme)}
`;

export const wrapStyles = (theme: Theme) => css`
  ${getBaseStyles(theme)}
  font-size: 1rem;
  white-space: pre-wrap;
`;

export const detailStyles = (props: TDetailProps, theme: Theme) => css`
  ${getBaseStyles(theme)}
  display: block;
  font-size: 0.9231rem;
  ${props.isInline && inline}
  ${props.isBold && bold}
  ${props.isItalic && italic}
  ${props.tone && getTone(props.tone, theme)}
  ${props.truncate && truncate}
`;
