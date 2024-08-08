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
  /** sets the amount of spacing between individual items */
  scale: TScale;
  /**
   * sets the `align-self` value on all direct children.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/align-items */
  alignItems: TAlignItem;
  /**
   * defines how the browser distributes space between and around content items along the main-axis.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content */
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
