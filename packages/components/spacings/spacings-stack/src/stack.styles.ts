import type { TAlignItem, TScale, TProps } from './stack';

import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

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

const getMargin = (scale?: TScale) => {
  switch (scale) {
    case 'xs':
      return customProperties.spacingXs;
    case 's':
      return customProperties.spacingS;
    case 'm':
      return customProperties.spacingM;
    case 'l':
      return customProperties.spacingL;
    case 'xl':
      return customProperties.spacingXl;
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
const getStyles = (props: TProps) => css`
  display: flex;
  flex-direction: column;
  align-items: ${getAlignItem(props.alignItems)};

  > * + * {
    margin: ${getMargin(props.scale)} 0 0 !important;
  }
`;

export default getStyles;
