import {
  cloneElement,
  MouseEvent,
  KeyboardEvent,
  ElementType,
  ReactElement,
  ComponentPropsWithRef,
} from 'react';
import omit from 'lodash/omit';
import { css } from '@emotion/react';
import Inline from '@commercetools-uikit/spacings-inline';
import {
  filterInvalidAttributes,
  useWarning,
} from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { getButtonStyles } from './primary-button.styles';

const propsToOmit = ['type'];

/**
 * @deprecated Use sizes from `TSizes` instead.
 */
type TLegacySizes = 'small' | 'medium' | 'big';

/**
 * Available sizes for the PrimaryButton.
 */
type TSizes = '10' | '20';

/**
 * Props for child icons
 */
type TButtonIconProps = {
  color?: string;
} & Record<string, unknown>;

/**
 * Mapping of legacy sizes to new sizes.
 */
const sizeMapping: Record<TLegacySizes, TSizes> = {
  small: '10',
  medium: '10',
  big: '20',
};

const PositionedIcon = ({
  icon,
  size,
  isDisabled,
}: {
  icon: TPrimaryButtonProps['iconRight'] | TPrimaryButtonProps['iconLeft'];
  size: TPrimaryButtonProps['size'];
  isDisabled: TPrimaryButtonProps['isDisabled'];
}) => {
  if (!icon) return null;
  return (
    <span
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {cloneElement(icon, {
        color: isDisabled ? 'neutral60' : 'surface',
        size: size === 'big' || size === '20' ? '40' : '20',
      })}
    </span>
  );
};

export type TPrimaryButtonProps<
  TStringOrComponent extends ElementType = 'button'
> = {
  /**
   * You may pass in a string like "a" to have the button element render an anchor tag, or
   * you could pass in a React Component, like a `Link`.
   * <br />
   * The `<PrimaryButton>` additionally accepts any props or attributes specific to the given element or component.
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
  iconLeft?: ReactElement<TButtonIconProps>;
  /**
   * The right icon displayed within the button.
   */
  iconRight?: ReactElement<TButtonIconProps>;
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
   * <br />
   * Required when `as` is `undefined`
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Sets the size of the button.
   * <br />
   * `small`, `medium`, and `big` are deprecated. Use `10`, `20`, instead.
   */
  size?: TLegacySizes | TSizes;
  /**
   * Indicates the color scheme of the button.
   */
  tone?: 'urgent' | 'primary' | 'critical';
} & /**
 * Include any props derived from the React component passed to the `as` prop.
 * For example, given `as={Link}`, all props of the `<Link>` component are allowed to be
 * passed to `<PrimaryButton>`: <PrimaryButton as={Link} to="/foo" label="Foo" />.
 */ ComponentPropsWithRef<TStringOrComponent>;

const PrimaryButton = <TStringOrComponent extends ElementType = 'button'>({
  type = 'button',
  size = '20',
  isToggleButton = false,
  tone = 'primary',
  ...props
}: TPrimaryButtonProps<TStringOrComponent>) => {
  const buttonAttributes = {
    'data-track-component': 'PrimaryButton',
    ...filterInvalidAttributes(
      omit(
        {
          type,
          size,
          isToggleButton,
          tone,
          ...props,
        },
        propsToOmit
      )
    ),
    // if there is a divergence between `isDisabled` and `disabled`,
    // we fall back to `isDisabled`
    disabled: props.isDisabled,
  };

  useWarning(
    !Boolean(Object.keys(sizeMapping).indexOf(size) > -1),
    `PrimaryButton '${size}' value for 'size' property has been deprecated in favor of '${
      sizeMapping[size as TLegacySizes]
    }' Please update that value when using this component`
  );

  const isActive = Boolean(isToggleButton && props.isToggled);

  return (
    <AccessibleButton
      as={props.as}
      type={type}
      buttonAttributes={buttonAttributes}
      label={props.label}
      onClick={props.onClick}
      isToggleButton={isToggleButton}
      isToggled={props.isToggled}
      isDisabled={props.isDisabled}
      css={getButtonStyles(props.isDisabled, isActive, tone, size)}
    >
      <Inline alignItems="center" scale="s">
        {props.iconLeft && (
          <PositionedIcon
            icon={props.iconLeft}
            isDisabled={props.isDisabled}
            size={size}
          />
        )}
        <span>{props.label}</span>
        {props.iconRight && (
          <PositionedIcon
            icon={props.iconRight}
            isDisabled={props.isDisabled}
            size={size}
          />
        )}
      </Inline>
    </AccessibleButton>
  );
};

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
