import { ReactNode } from 'react';
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
  scale: TScale;
  alignItems: TAlignItem;
  justifyContent: TJustifyContent;
  children: ReactNode;
};

const Inline = (props: TProps) => (
  <span css={getStyles(props)} {...filterDataAttributes(props)}>
    {props.children}
  </span>
);
const defaultProps: Pick<TProps, 'scale' | 'alignItems' | 'justifyContent'> = {
  scale: 's',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};
Inline.defaultProps = defaultProps;
Inline.displayName = 'Inline';

export default Inline;
