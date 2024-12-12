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
import {
  filterInvalidAttributes,
  useWarning,
  warning,
} from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import {
  getStateStyles,
  getThemeStyles,
  getSizeStyles,
  getToneStyles,
} from './secondary-button.styles';

/**
 * @deprecated Use sizes from `TSizes` instead.
 */
type TLegacySizes = 'small' | 'medium' | 'big';

/**
 * Available sizes for the SecondaryButton.
 */
type TSizes = '10' | '20';

/**
 * Mapping of legacy sizes to new sizes.
 */
const sizeMapping: Record<TLegacySizes, TSizes> = {
  small: '10',
  medium: '10',
  big: '20',
};

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
   * The righr icon displayed within the button.
   */
  iconRight?: ReactElement;
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
   * Sets the size of the button.
   * <br />
   * `small`, `medium`, and `big` are deprecated. Use `10` or `20`, instead.
   */
  size?: TLegacySizes | TSizes;
  /**
   * Indicates the color scheme of the button.
   * @deprecated Use `tone` instead.
   */
  theme?: 'default' | 'info';
  /**
   * Indicates the tone of the button.
   */
  tone?: 'secondary' | 'info';
  /**
   * The URL to link to when the button is clicked.
   */
  to?: string;
} & /**
 * Include any props derived from the React component passed to the `as` prop.
 * For example, given `as={Link}`, all props of the `<Link>` component are allowed to be
 * passed to `<SecondaryButton>`: <SecondaryButton as={Link} to="/foo" label="Foo" />.
 */ ComponentPropsWithRef<TStringOrComponent>;

// Gets the color which the icon sho√uld have based on context of button's state/cursor behavior
export const getIconColor = (
  props: Pick<
    TSecondaryButtonProps,
    'isToggleButton' | 'isToggled' | 'theme' | 'isDisabled'
  > & {
    isActive?: boolean;
  },
  icon: TSecondaryButtonProps['iconLeft'] | TSecondaryButtonProps['iconRight']
) => {
  const isActive = props.isToggleButton && props.isToggled;
  // if button has a theme, icon should be the same color as the theme on active state
  if (props.theme !== 'default' && isActive && !props.isDisabled) return 'info'; // returns the passed in theme without overwriting
  // if button is disabled, icon should be grey
  if (props.isDisabled) return 'neutral60';
  // if button is not disabled nor has a theme, return icon's default color
  return icon?.props.color;
};

const PositionedIcon = ({
  size,
  icon,
  color,
}: {
  size: string;
  icon: ReactElement;
  color: string;
}) => {
  return (
    <span
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {cloneElement(icon, {
        color,
        size: size === 'big' || size === '20' ? '40' : '20',
      })}
    </span>
  );
};

export const SecondaryButton = ({
  type = 'button',
  theme = 'default',
  tone = 'secondary',
  size = '20',
  isToggleButton = false,
  ...props
}: TSecondaryButtonProps) => {
  const isActive = Boolean(isToggleButton && props.isToggled);
  const shouldUseLinkTag = !props.isDisabled && Boolean(props.to);
  const buttonAttributes = {
    'data-track-component': 'SecondaryButton',
    ...filterInvalidAttributes(props),
    ...(shouldUseLinkTag ? { to: props.to } : {}),
  };

  warning(
    !(theme !== 'default' && !isToggleButton),
    `Invalid prop \`theme\` supplied to \`SecondaryButton\`. Only toggle buttons may have a theme.`
  );

  useWarning(
    !Boolean(Object.keys(sizeMapping).indexOf(size) > -1),
    `SecondaryButton '${size}' value for 'size' property has been deprecated in favor of '${
      sizeMapping[size as TLegacySizes]
    }' Please update that value when using this component`
  );

  const containerStyles = [
    css`
      display: flex;
      align-items: center;
      padding: 0 ${designTokens.spacing30};
      height: ${designTokens.heightForButtonAs40};
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
    getThemeStyles(theme),
    getStateStyles(props.isDisabled as boolean, isActive, tone),
    getSizeStyles(size),
    getToneStyles(tone, props.isDisabled as boolean, isActive),
  ];

  return (
    <AccessibleButton
      as={(shouldUseLinkTag ? Link : props.as) as ComponentType}
      type={type}
      buttonAttributes={buttonAttributes}
      label={props.label}
      onClick={props.onClick}
      isToggleButton={isToggleButton}
      isToggled={props.isToggled}
      isDisabled={props.isDisabled}
      css={containerStyles}
    >
      <Inline alignItems="center" scale="s">
        {props.iconLeft && (
          <PositionedIcon
            icon={props.iconLeft}
            size={size}
            color={getIconColor(props, props.iconLeft)}
          />
        )}
        <span>{props.label}</span>
        {props.iconRight && (
          <PositionedIcon
            icon={props.iconRight}
            size={size}
            color={getIconColor(props, props.iconRight)}
          />
        )}
      </Inline>
    </AccessibleButton>
  );
};

SecondaryButton.displayName = 'SecondaryButton';

export default SecondaryButton;
