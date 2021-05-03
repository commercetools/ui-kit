import React, { ComponentType, MouseEvent, KeyboardEvent } from 'react';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import { css } from '@emotion/react';
import Inline from '@commercetools-uikit/spacings-inline';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterInvalidAttributes, warning } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { getButtonStyles } from './primary-button.styles';

const propsToOmit = ['type'];

export type TPrimaryButtonProps = {
  /**
   * an `ComponentType`. <br />
   * You may pass in a string like "a" to have the button render as an anchor tag instead.
   */
  as?: string | ComponentType;
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
  iconLeft?: React.ReactElement;
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
   * The component may have a theme only if `isToggleButton` is `true`
   */
  size?: 'small' | 'big';
  tone?: 'urgent' | 'primary';
};

const defaultProps: Pick<
  TPrimaryButtonProps,
  'type' | 'tone' | 'size' | 'isToggleButton'
> = {
  type: 'button',
  size: 'big',
  isToggleButton: false,
  tone: 'primary',
};

const PrimaryButton = (props: TPrimaryButtonProps) => {
  const dataProps = {
    'data-track-component': 'PrimaryButton',
    ...filterInvalidAttributes(omit(props, propsToOmit)),
    // if there is a divergence between `isDisabled` and `disabled`,
    // we fall back to `isDisabled`
    disabled: props.isDisabled,
  };

  if (!isNil(props.as)) {
    warning(
      props.onClick,
      'PrimaryButton: `onClick` is required when `as` is not provided.'
    );
  }

  if (props.isToggleButton) {
    warning(
      !isNil(props.isToggled),
      '`PrimaryButton`: `isToggled` is required when `isToggleButton` is provided.'
    );
  }

  const isActive = Boolean(props.isToggleButton && props.isToggled);
  return (
    <AccessibleButton
      as={props.as}
      type={props.type}
      buttonAttributes={dataProps}
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
              margin: 0 ${vars.spacingXs} 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            {props.iconLeft &&
              React.cloneElement(props.iconLeft, {
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
