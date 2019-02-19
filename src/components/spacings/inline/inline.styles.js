import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const getAlignItem = alignment => {
  switch (alignment) {
    case 'flexStart':
      return `flex-start`;
    case 'flexEnd':
      return `flex-end`;
    default:
      return alignment;
  }
};

const getMargin = scale => {
  switch (scale) {
    case 'xs':
      return vars.spacing4;
    case 's':
      return vars.spacing8;
    case 'm':
      return vars.spacing16;
    case 'l':
      return vars.spacing24;
    case 'xl':
      return vars.spacing32;
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
export default props => css`
  display: flex;
  align-items: ${getAlignItem(props.alignItems)};
  justify-content: ${props.justifyContent};

  > * + * {
    margin: 0 0 0 ${getMargin(props.scale)} !important;
  }
`;
