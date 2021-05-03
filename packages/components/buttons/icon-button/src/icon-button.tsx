import React, { ComponentType, MouseEvent, KeyboardEvent } from 'react';
import { css } from '@emotion/react';
import isNil from 'lodash/isNil';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterInvalidAttributes, warning } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import {
  getStateStyles,
  getShapeStyles,
  getSizeStyles,
  getThemeStyles,
  getHoverStyles,
  getIconThemeColor,
} from './icon-button.styles';

export type TIconButtonProps = {
  /**
   * an `ElementType`. <br />
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
   * an <Icon /> component
   */
  icon?: React.ReactElement;
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
   * <br />
   * Signature: (event: MouseEvent<HTMLButtonElement) => void
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * The container shape of the button.
   */
  shape?: 'round' | 'square';
  /**
   * The component may have a theme only if `isToggleButton` is `true`
   */
  theme?: 'default' | 'primary' | 'info';
  size?: 'small' | 'medium' | 'big';
};

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

const IconButton = (props: TIconButtonProps) => {
  if (props.isToggleButton) {
    warning(
      !isNil(props.isToggled),
      '`IconButton`: `isToggled` is required when `isToggleButton` is provided.'
    );
  }
  // the type defaults to `button`, so we don't need to handle undefined
  warning(
    !(props.as && props.type !== 'button'),
    'IconButton`: "type" does not have any effect when "as" is set.'
  );
  warning(
    !(props.theme !== 'default' && !props.isToggleButton),
    `Invalid prop \`theme\` supplied to \`IconButton\`. Only toggle buttons may have a theme.`
  );

  const attributes = {
    'data-track-component': 'IconButton',
    ...filterInvalidAttributes(props),
  };
  const isActive = Boolean(props.isToggleButton && props.isToggled);

  return (
    <AccessibleButton
      as={props.as}
      buttonAttributes={attributes}
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
          border: 1px solid ${vars.colorSurface};
          background-color: ${vars.colorSurface};
          box-shadow: ${vars.shadow7};
          color: ${vars.colorSolid};
          transition: background-color ${vars.transitionLinear80Ms},
            box-shadow 150ms ease-in-out;
        `,
        getStateStyles(props.isDisabled, isActive, props.theme),
        getShapeStyles(props.shape, props.size),
        getSizeStyles(props.size),
        getThemeStyles(props.theme),
        getHoverStyles(props.isDisabled, props.theme),
      ]}
    >
      {props.icon &&
        React.cloneElement(props.icon, {
          size: props.size,
          color: getIconThemeColor(props),
        })}
    </AccessibleButton>
  );
};

IconButton.defaultProps = defaultProps;
IconButton.displayName = 'IconButton';

export default IconButton;
