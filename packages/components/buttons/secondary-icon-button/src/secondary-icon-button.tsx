import {
  MouseEvent,
  KeyboardEvent,
  ElementType,
  ReactElement,
  ComponentPropsWithRef,
} from 'react';
import { useTheme } from '@emotion/react';
import omit from 'lodash/omit';
import { filterInvalidAttributes } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { getBaseStyles } from './secondary-icon-button.styles';

const propsToOmit = ['type'];

export type TSecondaryButtonProps<
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
  color?: 'solid' | 'primary';
  /**
   * Should describe what the button does, for accessibility purposes (screen-reader users)
   */
  label: string;
  /**
   * Tells when the button should present a disabled state.
   */
  isDisabled?: boolean;
  /**
   * Handler when the button is clicked.
   * <br />
   * Signature: (event: MouseEvent<HTMLButtonElement) => void
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
  props: TSecondaryButtonProps<TStringOrComponent>
) => {
  const buttonAttributes = {
    ...filterInvalidAttributes(omit(props, propsToOmit)),
    'data-track-component': 'SecondaryIconButton',
    // if there is a divergence between `isDisabled` and `disabled`,
    // we fall back to `isDisabled`
    disabled: props.isDisabled,
  };
  const theme = useTheme();
  return (
    <AccessibleButton
      as={props.as}
      type={props.type}
      buttonAttributes={buttonAttributes}
      label={props.label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      css={getBaseStyles(props, theme)}
    >
      {props.icon}
    </AccessibleButton>
  );
};

SecondaryIconButton.displayName = 'SecondaryIconButton';
SecondaryIconButton.defaultProps = {
  color: 'solid',
  type: 'button',
  isDisabled: false,
};

export default SecondaryIconButton;
