import type { TAlignItem, TInlineProps, TScale } from './inline';

import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

// @TODO remove this when we deprecate `flexStart`/`flexEnd`
const getAlignItem = (alignment?: TAlignItem) => {
  switch (alignment) {
    case 'flexStart':
      return `flex-start`;
    case 'flexEnd':
      return `flex-end`;
    default:
      return alignment;
  }
};

const getMargin = (scale?: TScale): string | number => {
  switch (scale) {
    case 'xs':
      return designTokens.spacing10;
    case 's':
      return designTokens.spacing20;
    case 'm':
      return designTokens.spacing30;
    case 'l':
      return designTokens.spacing40;
    case 'xl':
      return designTokens.spacing50;
    case 'xxl':
      return designTokens.spacing60;
    case 'xxxl':
      return designTokens.spacing70;
    default:
      return 0;
  }
};

/**
 * We need to force the margin for the child elements as ome children
 * might have `margin: 0` defined, which results in a higher CSS specificity,
 * causing the margings of the spacing components to be ignored.
 * See https://github.com/commercetools/ui-kit/issues/542
 */
const getStyles = (props: TInlineProps) => css`
  display: flex;
  align-items: ${getAlignItem(props.alignItems)};
  justify-content: ${props.justifyContent};

  > * + * {
    margin: 0 0 0 ${getMargin(props.scale)} !important;
  }
`;

export default getStyles;
