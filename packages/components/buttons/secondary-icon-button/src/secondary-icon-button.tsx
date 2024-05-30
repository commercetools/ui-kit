import {
  type MouseEvent,
  type KeyboardEvent,
  type ElementType,
  type ReactElement,
  type ComponentPropsWithRef,
  cloneElement,
} from 'react';
import omit from 'lodash/omit';
import { filterInvalidAttributes } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { getBaseStyles } from './secondary-icon-button.styles';

const propsToOmit = ['type'];

/**
 * @deprecated Use '10' from `TSizes` instead.
 */
type TSmall = 'small';

/**
 * @deprecated Use '30' from `TSizes` instead.
 */
type TMedium = 'medium';

/**
 * @deprecated Use '40' from `TSizes` instead.
 */
type TBig = 'big';

/**
 * @deprecated Use sizes from `TSizes` instead.
 */
type TLegacySizes = TSmall | TMedium | TBig;

/**
 * Available sizes for the SecondaryIconButton.
 */
type TSizes = '10' | '20' | '30' | '40';

export type TSecondaryButtonIconProps<
  TStringOrComponent extends ElementType = 'button'
> = {
  /**
   * You may pass in a string like "a" to have the button element render an anchor tag, or
   * you could pass in a React Component, like a `Link`.
   * <br />
   * The `<SecondaryIconButton>` additionally accepts any props or attributes specific to the given element or component.
   */
  as?: TStringOrComponent;
  /**
   * Used as the HTML type attribute.
   */
  type?: 'submit' | 'reset' | 'button';
  /**
   * An <Icon /> component.
   */
  icon?: ReactElement;
  /**
   * Indicates the color scheme of the button.
   */
  color?: 'solid' | 'primary' | 'info';
  /**
   * Should describe what the button does, for accessibility purposes (screen-reader users)
   */
  label: string;
  /**
   * Tells when the button should present a disabled state.
   */
  isDisabled?: boolean;
  /**
   * Indicates the size of the icon. Available sizes are '10', '20', '30', '40'.
   */
  size?: TLegacySizes | TSizes;
  /**
   * Handler when the button is clicked.
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
} & /**
 * Include any props derived from the React component passed to the `as` prop.
 * For example, given `as={Link}`, all props of the `<Link>` component are allowed to be
 * passed to `<SecondaryIconButton>`: <SecondaryIconButton as={Link} to="/foo" label="Foo" />.
 */ ComponentPropsWithRef<TStringOrComponent>;

const SecondaryIconButton = <TStringOrComponent extends ElementType = 'button'>(
  props: TSecondaryButtonIconProps<TStringOrComponent>
) => {
  const buttonAttributes = {
    ...filterInvalidAttributes(omit(props, propsToOmit)),
    'data-track-component': 'SecondaryIconButton',
    // if there is a divergence between `isDisabled` and `disabled`,
    // we fall back to `isDisabled`
    disabled: props.isDisabled,
  };
  return (
    <AccessibleButton
      as={props.as}
      type={props.type}
      buttonAttributes={buttonAttributes}
      label={props.label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      css={getBaseStyles(props)}
    >
      {props.icon &&
        cloneElement(props.icon, {
          size: props.size,
        })}
    </AccessibleButton>
  );
};

SecondaryIconButton.displayName = 'SecondaryIconButton';
SecondaryIconButton.defaultProps = {
  color: 'solid',
  type: 'button',
  size: 'big',
  isDisabled: false,
};

export default SecondaryIconButton;
