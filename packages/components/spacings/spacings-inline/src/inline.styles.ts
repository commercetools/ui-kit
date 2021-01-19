import type { TAlignItem, TProps, TScale } from './inline';

import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';

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
      return vars.spacingXs;
    case 's':
      return vars.spacingS;
    case 'm':
      return vars.spacingM;
    case 'l':
      return vars.spacingL;
    case 'xl':
      return vars.spacingXl;
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
  align-items: ${getAlignItem(props.alignItems)};
  justify-content: ${props.justifyContent};

  > * + * {
    margin: 0 0 0 ${getMargin(props.scale)} !important;
  }
`;

export default getStyles;
