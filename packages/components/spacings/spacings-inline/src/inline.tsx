import React from 'react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import getStyles from './inline.styles';
import type { TProps } from './types';

const Inline: React.FC<TProps> = (props) => (
  <span css={getStyles(props)} {...filterDataAttributes(props)}>
    {props.children}
  </span>
);
Inline.defaultProps = {
  scale: 's',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};
Inline.displayName = 'Inline';

export default Inline;
