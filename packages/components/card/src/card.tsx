import { KeyboardEvent, ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import Inset from '@commercetools-uikit/spacings-inset';
import { Link } from 'react-router-dom';
import type { LocationDescriptor } from 'history';

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
  /**
   * The callback function to be executed when the Card component is clicked. Prefer this for managing side effects rather than navigation.
   */
  onClick?: () => void;
  /**
   * The URL that the Card should point to. If provided, the Card will be rendered as an anchor element.
   */
  to?: string | LocationDescriptor;
  /**
   * A flag to indicate if the Card points to an external source.
   */
  isExternalLink?: boolean;
  /**
   * Indicates that a clickable Card should not allow clicks. This allows consumers to temporarily disable a clickable Card.
   */
  isDisabled?: boolean;
};

const Card = (props: TCardProps) => {
  const isClickable = Boolean(!props.isDisabled && (props.onClick || props.to));
  // Only disable styling if the card is not clickable
  const shouldBeDisabled = props.isDisabled && (props.onClick || props.to);

  const commonProps = {
    ...filterDataAttributes(props),
    onClick: isClickable ? props.onClick : undefined,
    'aria-disabled': props.isDisabled ? true : undefined,
    css: css`
      box-sizing: border-box;
      width: 100%;
      font-size: 1rem;
      box-shadow: ${props.type === 'raised' ? designTokens.shadow17 : 'none'};
      border-radius: ${designTokens.borderRadius4};
      border: ${props.type === 'raised'
        ? `1px solid ${designTokens.colorNeutral90}`
        : 'none'};
      background: ${props.theme === 'dark'
        ? designTokens.colorNeutral95
        : designTokens.colorSurface};
      cursor: ${shouldBeDisabled
        ? 'not-allowed'
        : isClickable
        ? 'pointer'
        : 'default'};
      :hover {
        background: ${props.theme === 'dark'
          ? isClickable
            ? designTokens.colorNeutral90
            : undefined
          : isClickable
          ? designTokens.colorNeutral98
          : undefined};
      }
      // Overrides the default link styles
      display: block;
      // Disables link text styling
      color: inherit;
      // Changes the opacity of the content, not the card itself
      & > div {
        opacity: ${shouldBeDisabled ? 0.5 : 1};
      }
    `,
    className: props.className,
  };

  const content =
    props.insetScale === 'none' ? (
      <div>{props.children}</div>
    ) : (
      <Inset scale={props.insetScale} height="expanded">
        {props.children}
      </Inset>
    );

  if (isClickable) {
    if (props.to) {
      if (props.isExternalLink) {
        warning(
          typeof props.to === 'string',
          'ui-kit/Card: "to" property must be a string when "isExternal" value is true'
        );

        return (
          <a
            {...commonProps}
            href={props.to as string}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        );
      } else {
        return (
          <Link {...commonProps} to={props.to}>
            {content}
          </Link>
        );
      }
    }
  }
  console.log('Test preview');

  return (
    <div
      {...commonProps}
      // Support accessibility as a button when the `onClick` prop is provided
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        if (isClickable && props.onClick && event.key === 'Enter') {
          props.onClick();
        }
      }}
    >
      {content}
    </div>
  );
};

const defaultProps: Pick<TCardProps, 'type' | 'theme' | 'insetScale'> = {
  type: 'raised',
  theme: 'light',
  insetScale: 'm',
};

Card.displayName = 'Card';
Card.defaultProps = defaultProps;

export default Card;
