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

export default props => css`
  display: flex;
  flex-direction: column;
  align-items: ${getAlignItem(props.alignItems)};

  > * + * {
    margin: ${getMargin(props.scale)} 0 0;
  }
`;
