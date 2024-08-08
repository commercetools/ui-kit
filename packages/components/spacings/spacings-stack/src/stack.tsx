import { ReactNode } from 'react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import getStyles from './stack.styles';

export type TAlignItem =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  /**
   * @deprecated Use `flex-start` instead.
   */
  | 'flexStart'
  /**
   * @deprecated Use `flex-end` instead.
   */
  | 'flexEnd';

export type TScale = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

export type TStackProps = {
  /** specifies the spacing between individual items */
  scale: TScale;
  /**
   * sets the `align-self` value on all direct children.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/align-items */
  alignItems: TAlignItem;
  children: ReactNode;
};

const Stack = (props: TStackProps) => (
  <div css={getStyles(props)} {...filterDataAttributes(props)}>
    {props.children}
  </div>
);
const defaultProps: Pick<TStackProps, 'scale' | 'alignItems'> = {
  scale: 's',
  alignItems: 'stretch',
};
Stack.displayName = 'Stack';
Stack.defaultProps = defaultProps;

export default Stack;
