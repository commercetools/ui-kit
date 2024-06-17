import {
  MouseEvent,
  KeyboardEvent,
  ElementType,
  ReactElement,
  ComponentPropsWithRef,
  cloneElement,
} from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import {
  filterInvalidAttributes,
  useWarning,
  warning,
} from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import {
  getShapeStyles,
  getSizeStyles,
  getBaseStyles,
  getIconThemeColor,
  getHoverStyles,
} from './icon-button.styles';

/**
 * @deprecated Use sizes from `TSizes` instead.
 */
type TLegacySizes = 'small' | 'medium' | 'big';

/**
 * Available sizes for the IconButton.
 */
type TSizes = '10' | '20' | '30' | '40';

/**
 * Mapping of legacy sizes to new sizes.
 */
const sizeMapping: Record<TLegacySizes, TSizes> = {
  small: '10',
  medium: '30',
  big: '40',
};

export type TIconButtonProps<
  TStringOrComponent extends ElementType = 'button'
> = {
  /**
   * You may pass in a string like "a" to have the button element render an anchor tag, or
   * you could pass in a React Component, like a `Link`.
   * <br />
   * The `<IconButton>` additionally accepts any props or attributes specific to the given element or component.
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
   * an <Icon /> component
   */
  icon?: ReactElement;
  /**
   * If this is active, it means the button will persist in an "active" state when toggled (see `isToggled`), and back to normal state when untoggled.
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
   * Handler when the button is clicked
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * @deprecated This prop is only used in the old theme. For the new theme this prop will not be taken into account and `square` is used by default
   */
  shape?: 'round' | 'square';
  /**
   * The component may have a theme only if `isToggleButton` is `true`
   */
  theme?: 'default' | 'primary' | 'info';
  /**
   * Indicates the size of the icon. Available sizes are '10', '20', '30', '40'.
   */
  size?: TLegacySizes | TSizes;
} & /**
 * Include any props derived from the React component passed to the `as` prop.
 * For example, given `as={Link}`, all props of the `<Link>` component are allowed to be
 * passed to `<IconButton>`: <IconButton as={Link} to="/foo" label="Foo" />.
 */ ComponentPropsWithRef<TStringOrComponent>;

const defaultProps: Pick<
  TIconButtonProps,
  'type' | 'theme' | 'size' | 'shape' | 'isToggleButton'
> = {
  type: 'button',
  theme: 'default',
  size: '40',
  shape: 'round',
  isToggleButton: false,
};

const IconButton = <TStringOrComponent extends ElementType = 'button'>(
  props: TIconButtonProps<TStringOrComponent>
) => {
  warning(
    !(props.theme !== 'default' && !props.isToggleButton),
    `Invalid prop \`theme\` supplied to \`IconButton\`. Only toggle buttons may have a theme.`
  );

  useWarning(
    !Boolean(Object.keys(sizeMapping).indexOf(props.size) > -1),
    `IconButton '${
      props.size
    }' value for 'size' property has been deprecated in favor of '${
      sizeMapping[props.size as TLegacySizes]
    }' Please update that value when using this component`
  );

  const buttonAttributes = {
    'data-track-component': 'IconButton',
    ...filterInvalidAttributes(props),
  };
  const isActive = Boolean(props.isToggleButton && props.isToggled);

  return (
    <AccessibleButton
      as={props.as}
      buttonAttributes={buttonAttributes}
      type={props.type}
      label={props.label}
      onClick={props.onClick}
      isToggleButton={props.isToggleButton}
      isToggled={props.isToggled}
      isDisabled={props.isDisabled}
      css={[
        css`
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background-color: ${designTokens.colorSurface};
          box-shadow: ${designTokens.shadow0};
          color: ${designTokens.fontColorForButtonAsSecondary};
          * {
            fill: ${designTokens.fontColorForButtonAsSecondary};
          }
          transition: background-color ${designTokens.transitionLinear80Ms},
            box-shadow 150ms ease-in-out;
        `,
        getBaseStyles(props.theme, props.isDisabled, isActive),
        getShapeStyles('square', props.size),
        getSizeStyles(props.size),
        getHoverStyles(props.isDisabled, props.theme),
      ]}
    >
      {props.icon &&
        cloneElement(props.icon, {
          size: props.size,
          color: getIconThemeColor(props),
        })}
    </AccessibleButton>
  );
};

IconButton.defaultProps = defaultProps;
IconButton.displayName = 'IconButton';

export default IconButton;
