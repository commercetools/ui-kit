import type { LocationDescriptor } from 'history';
import { ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import {
  filterDataAttributes,
  filterInvalidAttributes,
} from '@commercetools-uikit/utils';
import Inset from '@commercetools-uikit/spacings-inset';

export type TCardProps = {
  /**
   * Determines the visual effect of the card. A raised card has a box shadow while a flat card has just a border.
   */
  type: 'raised' | 'flat';
  /**
   * Determines the spacing (padding) that the content should have from the card borders. In case there is no space needed, you can pass `none`.
   */
  insetScale: 'none' | 's' | 'm' | 'l' | 'xl';
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
  to?: string | LocationDescriptor;
  isExternal?: boolean;
  isDisabled?: boolean;
};

const disableA = (props: TCardProps) =>
  props.isDisabled && {
    css: css`
      cursor: not-allowed;
      a {
        display: block;
        pointer-events: none;
      }
    `,
  };

const ClickableCardWrapper = (props: TCardProps) => {
  const remainingProps = filterInvalidAttributes(props);
  if (props.to) {
    if (props.isExternal) {
      if (typeof props.to !== 'string') {
        throw new Error(
          '`to` must be a `string` when `isExternal` is provided.'
        );
      }

      return (
        <a
          href={props.to}
          target="_blank"
          rel="noopener noreferrer"
          {...disableA(props)}
          {...remainingProps}
        >
          {props.children}
        </a>
      );
    }
    return (
      <ReactRouterLink to={props.to} {...disableA(props)} {...remainingProps}>
        {props.children}
      </ReactRouterLink>
    );
  }
  return <>{props.children}</>;
};

const Card = (props: TCardProps) => (
  <ClickableCardWrapper {...props}>
    <div
      {...filterDataAttributes(props)}
      css={css`
        box-sizing: border-box;
        width: 100%;
        font-size: 1rem;
        box-shadow: ${props.type === 'raised'
          ? designTokens.shadowForCardWhenRaised
          : 'none'};
        border-radius: ${designTokens.borderRadiusForCard};
        border: ${props.type === 'raised'
          ? designTokens.borderForCardWhenRaised
          : 'none'};
        background: ${props.theme === 'dark'
          ? designTokens.colorNeutral95
          : designTokens.colorSurface};
      `}
      // Allow to override the styles by passing a `className` prop.
      // Custom styles can also be passed using the `css` prop from emotion.
      // https://emotion.sh/docs/css-prop#style-precedence
      className={props.className}
    >
      {props.insetScale === 'none' ? (
        // Use a `<div>` to ensure that there is always a wrapper container.
        // This is mostly useful in case custom styles are targeting this element.
        <div>{props.children}</div>
      ) : (
        <Inset scale={props.insetScale} height="expanded">
          {props.children}
        </Inset>
      )}
    </div>
  </ClickableCardWrapper>
);

const defaultProps: Pick<
  TCardProps,
  'type' | 'theme' | 'insetScale' | 'isDisabled'
> = {
  type: 'raised',
  theme: 'light',
  insetScale: 'm',
  isDisabled: false,
};

Card.displayName = 'Card';
Card.defaultProps = defaultProps;

export default Card;
