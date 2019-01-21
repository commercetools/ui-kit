import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

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
      return vars['--spacing-4'];
    case 's':
      return vars['--spacing-8'];
    case 'm':
      return vars['--spacing-16'];
    case 'l':
      return vars['--spacing-24'];
    case 'xl':
      return vars['--spacing-32'];
    default:
      return vars['--spacing-8'];
  }
};

export default props => css`
  display: flex;
  ${getAlignItems(props.alignItems)}

  > * + * {
    margin: 0 0 0 ${getMargin(props.scale)};
  }
`;
