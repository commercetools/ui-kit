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
import { filterInvalidAttributes, warning } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import {
  getShapeStyles,
  getSizeStyles,
  getBaseStyles,
  getIconThemeColor,
  getHoverStyles,
} from './icon-button.styles';

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
   * Indicates the size of the icon.
   */
  size?: 'small' | 'medium' | 'big';
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
  size: 'big',
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
          border: 1px solid ${designTokens.borderColorForButtonAsIcon};
          background-color: ${designTokens.colorSurface};
          box-shadow: ${designTokens.shadow0};
          color: ${designTokens.colorSolid};
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
