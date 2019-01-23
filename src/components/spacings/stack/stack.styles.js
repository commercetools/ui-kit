import { css } from '@emotion/core';
import * as vars from '../../../../materials/custom-properties';

const getAlignItems = alignment => {
  switch (alignment) {
    case 'center':
      return `align-items: center;`;
    case 'flexStart':
      return `align-items: flex-start;`;
    case 'flexEnd':
      return `align-items: flex-end;`;
    case 'stretch':
      return `align-items: stretch;`;
    default:
      return ``;
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
  ${getAlignItems(props.alignItems)}

  > * + * {
    margin: ${getMargin(props.scale)} 0 0;
  }
`;
