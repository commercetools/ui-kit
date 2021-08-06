import { ReactNode } from 'react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import getStyles from './stack.styles';

export type TAlignItem =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  // Deprecated
  | 'flexStart'
  | 'flexEnd';

export type TScale = 'xs' | 's' | 'm' | 'l' | 'xl';

export type TProps = {
  scale: TScale;
  alignItems: TAlignItem;
  children: ReactNode;
};

const Stack = (props: TProps) => (
  <div css={getStyles(props)} {...filterDataAttributes(props)}>
    {props.children}
  </div>
);
const defaultProps: Pick<TProps, 'scale' | 'alignItems'> = {
  scale: 's',
  alignItems: 'stretch',
};
Stack.displayName = 'Stack';
Stack.defaultProps = defaultProps;

export default Stack;
