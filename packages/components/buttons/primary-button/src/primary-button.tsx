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
import { designTokens } from '@commercetools-uikit/design-system';
import { filterInvalidAttributes } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { getButtonStyles } from './primary-button.styles';

const propsToOmit = ['type'];

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
   * <br />
   * Required when `as` is `undefined`
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Indicates the size of the button.
   */
  size?: 'small' | 'big';
  /**
   * Indicates the color scheme of the button.
   */
  tone?: 'urgent' | 'primary';
} & /**
 * Include any props derived from the React component passed to the `as` prop.
 * For example, given `as={Link}`, all props of the `<Link>` component are allowed to be
 * passed to `<PrimaryButton>`: <PrimaryButton as={Link} to="/foo" label="Foo" />.
 */ ComponentPropsWithRef<TStringOrComponent>;

const defaultProps: Pick<
  TPrimaryButtonProps,
  'type' | 'tone' | 'size' | 'isToggleButton'
> = {
  type: 'button',
  size: 'big',
  isToggleButton: false,
  tone: 'primary',
};

const PrimaryButton = <TStringOrComponent extends ElementType = 'button'>(
  props: TPrimaryButtonProps<TStringOrComponent>
) => {
  const buttonAttributes = {
    'data-track-component': 'PrimaryButton',
    ...filterInvalidAttributes(omit(props, propsToOmit)),
    // if there is a divergence between `isDisabled` and `disabled`,
    // we fall back to `isDisabled`
    disabled: props.isDisabled,
  };

  const isActive = Boolean(props.isToggleButton && props.isToggled);
  return (
    <AccessibleButton
      as={props.as}
      type={props.type}
      buttonAttributes={buttonAttributes}
      label={props.label}
      onClick={props.onClick}
      isToggleButton={props.isToggleButton}
      isToggled={props.isToggled}
      isDisabled={props.isDisabled}
      css={getButtonStyles(props.isDisabled, isActive, props.tone, props.size)}
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
                color: props.isDisabled ? 'neutral60' : 'surface',
                size: props.size === 'small' ? 'medium' : 'big',
              })}
          </span>
        )}
        <span>{props.label}</span>
      </Inline>
    </AccessibleButton>
  );
};

PrimaryButton.defaultProps = defaultProps;
PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
