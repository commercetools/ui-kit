import {
  ReactElement,
  KeyboardEvent,
  MouseEvent,
  ComponentType,
  ElementType,
  ComponentPropsWithRef,
  cloneElement,
} from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import Inline from '@commercetools-uikit/spacings-inline';
import { filterInvalidAttributes, warning } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import {
  getStateStyles,
  getThemeStyles,
  getSizeStyles,
  getToneStyles,
} from './secondary-button.styles';

export type TSecondaryButtonProps<
  TStringOrComponent extends ElementType = 'button'
> = {
  /**
   * You may pass in a string like "a" to have the button element render an anchor tag, or
   * you could pass in a React Component, like a `Link`.
   * <br />
   * The `<SecondaryButton>` additionally accepts any props or attributes specific to the given element or component.
   */
  as?: TStringOrComponent;
  /**
   * Used as the HTML type attribute.
   */
  type?: 'button' | 'reset' | 'submit';
  /**
   * Should describe what the button does, for accessibility purposes (screen-reader users)
   */
  label: string;
  /**
   * The left icon displayed within the button.
   */
  iconLeft?: ReactElement;
  /**
   * If this is active, it means the button will persist in an "active" state when toggled (see `isToggled`), and back to normal state when untoggled
   */
  isToggleButton?: boolean;
  /**
   * Tells when the button should present a toggled state. It does not have any effect when `isToggleButton` is `false`.
   */
  isToggled?: boolean;
  /**
   * Tells when the button should present a disabled state.
   */
  isDisabled?: boolean;
  /**
   * Handler when the button is clicked.
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Indicates the size of the button.
   */
  size?: 'medium' | 'big';
  /**
   * Indicates the color scheme of the button.
   * @deprecated Use `tone` instead.
   */
  theme?: 'default' | 'info';
  /**
   * Indicates the tone of the button.
   */
  tone?: 'secondary' | 'info';
} & /**
 * Include any props derived from the React component passed to the `as` prop.
 * For example, given `as={Link}`, all props of the `<Link>` component are allowed to be
 * passed to `<SecondaryButton>`: <SecondaryButton as={Link} to="/foo" label="Foo" />.
 */ ComponentPropsWithRef<TStringOrComponent>;

// Gets the color which the icon sho√uld have based on context of button's state/cursor behavior
export const getIconColor = (
  props: Pick<
    TSecondaryButtonProps,
    'isToggleButton' | 'isToggled' | 'theme' | 'isDisabled' | 'iconLeft'
  > & {
    isActive?: boolean;
  }
) => {
  const isActive = props.isToggleButton && props.isToggled;
  // if button has a theme, icon should be the same color as the theme on active state
  if (props.theme !== 'default' && isActive && !props.isDisabled) return 'info'; // returns the passed in theme without overwriting
  // if button is disabled, icon should be grey
  if (props.isDisabled) return 'neutral60';
  // if button is not disabled nor has a theme, return icon's default color
  return props.iconLeft?.props.color;
};

const defaultProps: Pick<
  TSecondaryButtonProps,
  'type' | 'theme' | 'size' | 'isToggleButton' | 'tone'
> = {
  type: 'button',
  theme: 'default',
  tone: 'secondary',
  size: 'big',
  isToggleButton: false,
};

export const SecondaryButton = <
  TStringOrComponent extends ElementType = 'button'
>(
  props: TSecondaryButtonProps<TStringOrComponent>
) => {
  const isActive = Boolean(props.isToggleButton && props.isToggled);
  const shouldUseLinkTag = !props.isDisabled && Boolean(props.to);
  const buttonAttributes = {
    'data-track-component': 'SecondaryButton',
    ...filterInvalidAttributes(props),
    ...(shouldUseLinkTag ? { to: props.to } : {}),
  };

  warning(
    !(props.theme !== 'default' && !props.isToggleButton),
    `Invalid prop \`theme\` supplied to \`SecondaryButton\`. Only toggle buttons may have a theme.`
  );

  const containerStyles = [
    css`
      display: flex;
      align-items: center;
      padding: 0 var(--spacing-30);
      height: ${designTokens.heightForButtonAsBig};
    `,
    css`
      display: inline-flex;
      background-color: ${designTokens.colorSurface};
      border: 1px solid ${designTokens.colorNeutral};
      border-radius: ${designTokens.borderRadius4};
      box-shadow: ${designTokens.shadow0};
      color: ${designTokens.colorSolid};
      transition: background-color ${designTokens.transitionLinear80Ms},
        box-shadow ${designTokens.transitionEaseinout150Ms};
    `,
    getThemeStyles(props.theme),
    getStateStyles(props.isDisabled, isActive, props.theme),
    getSizeStyles(props.size),
    getToneStyles(props.tone, props.isDisabled),
  ];

  return (
    <AccessibleButton
      as={(shouldUseLinkTag ? Link : props.as) as ComponentType}
      type={props.type}
      buttonAttributes={buttonAttributes}
      label={props.label}
      onClick={props.onClick}
      isToggleButton={props.isToggleButton}
      isToggled={props.isToggled}
      isDisabled={props.isDisabled}
      css={containerStyles}
    >
      <Inline alignItems="center" scale="xs">
        {Boolean(props.iconLeft) && (
          <span
            css={css`
              margin: 0 ${designTokens.spacing10} 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            {props.iconLeft &&
              cloneElement(props.iconLeft, {
                color: getIconColor(props),
                size: props.size === 'big' ? 'big' : 'medium',
              })}
          </span>
        )}
        <span>{props.label}</span>
      </Inline>
    </AccessibleButton>
  );
};

SecondaryButton.displayName = 'SecondaryButton';
SecondaryButton.defaultProps = defaultProps;

export default SecondaryButton;
