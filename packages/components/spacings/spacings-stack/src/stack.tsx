import React from 'react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import getStyles from './stack.styles';
import { TProps } from './types';

const Stack: React.FC<TProps> = (props) => (
  <div css={getStyles(props)} {...filterDataAttributes(props)}>
    {props.children}
  </div>
);

Stack.displayName = 'Stack';
Stack.defaultProps = {
  scale: 's',
  alignItems: 'stretch',
};

export default Stack;
