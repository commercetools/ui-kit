import React, { ComponentType, MouseEvent, KeyboardEvent } from 'react';
import { useTheme } from '@emotion/react';
import omit from 'lodash/omit';
import { warning, filterInvalidAttributes } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { getBaseStyles } from './secondary-icon-button.styles';

const propsToOmit = ['type'];

export type TSecondaryButtonProps = {
  /**
   * a `ComponentType`. <br />
   * You may pass in a string like "a" to have the button render as an anchor tag instead.
   */
  as?: string | ComponentType;
  /**
   * Used as the HTML type attribute.
   */
  type?: 'submit' | 'reset' | 'button';
  /**
   * An <Icon /> component.
   */
  icon?: React.ReactElement;
  /**
   * Sets the color of the icon
   */
  color?: 'solid' | 'primary'; // used in `getBaseStyles`
  /**
   * Should describe what the button does, for accessibility purposes (screen-reader users)
   */
  label: string;
  /**
   * Tells when the button should present a disabled state
   */
  isDisabled?: boolean;
  /**
   * Handler when the button is clicked.
   * <br />
   * This is required if `as` is not defined.
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

const SecondaryIconButton = (props: TSecondaryButtonProps) => {
  if (!Boolean(props.as)) {
    warning(
      typeof props.onClick === 'function',
      'SecondaryIconButton: "onClick" is required when "as" is not defined.'
    );
  }
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
