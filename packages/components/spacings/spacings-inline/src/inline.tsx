import React, { FC } from 'react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import getStyles from './inline.styles';

export type TAlignItem =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  // Deprecated
  | 'flexStart'
  | 'flexEnd';

export type TJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type TScale = 'xs' | 's' | 'm' | 'l' | 'xl';

export type TProps = {
  scale?: TScale;
  alignItems?: TAlignItem;
  justifyContent?: TJustifyContent;
  children: React.ReactNode;
};

const Inline: FC<TProps> = (props) => (
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
