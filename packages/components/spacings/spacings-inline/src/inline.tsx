import { ReactNode } from 'react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import getStyles from './inline.styles';

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

export type TJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type TScale = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

export type TInlineProps = {
  /**
   * Spacing between the children
   */
  scale: TScale;
  /**
   * Translates to `align-items` in CSS
   */
  alignItems: TAlignItem;
  /**
   * Translates to `justify-content` in CSS
   */
  justifyContent: TJustifyContent;
  children: ReactNode;
};

const Inline = (props: TInlineProps) => (
  <span css={getStyles(props)} {...filterDataAttributes(props)}>
    {props.children}
  </span>
);
const defaultProps: Pick<
  TInlineProps,
  'scale' | 'alignItems' | 'justifyContent'
> = {
  scale: 's',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};
Inline.defaultProps = defaultProps;
Inline.displayName = 'Inline';

export default Inline;
