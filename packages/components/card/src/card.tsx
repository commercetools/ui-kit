import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Inset from '@commercetools-uikit/spacings-inset';

type TCardProps = {
  /**
   * Determines the visual effect of the card. A raised card has a box shadow while a flat card has just a border.
   */
  type: 'raised' | 'flat';
  /**
   * Determinse the padding (inset spacing) that the content should have from the card borders
   */
  insetSpace: 's' | 'm';
  /**
   * Determines the background color of the card.
   */
  theme: 'light' | 'dark';
  /**
   * Pass a custom CSS class, useful to override the styles.
   * <br>
   * NOTE: This is not recommended and should only be used for building new components
   * that require special style adjustments.
   */
  className?: string;
  children?: ReactNode;
};

const Card = (props: TCardProps) => (
  <div
    {...filterDataAttributes(props)}
    css={css`
      box-sizing: border-box;
      width: 100%;
      font-size: 1rem;
      box-shadow: ${props.type === 'raised' ? vars.shadow1 : 'none'};
      border-radius: ${vars.borderRadius6};
      background: ${props.theme === 'dark'
        ? vars.colorNeutral95
        : vars.colorSurface};
    `}
    // Allow to override the styles by passing a `className` prop.
    // Custom styles can also be passed using the `css` prop from emotion.
    // https://emotion.sh/docs/css-prop#style-precedence
    className={props.className}
  >
    <Inset scale={props.insetSpace}>{props.children}</Inset>
  </div>
);

const defaultProps: Pick<TCardProps, 'type' | 'theme' | 'insetSpace'> = {
  type: 'raised',
  theme: 'light',
  insetSpace: 'm',
};

Card.displayName = 'Card';
Card.defaultProps = defaultProps;

export default Card;
