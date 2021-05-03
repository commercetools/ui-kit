import React, {
  ReactElement,
  KeyboardEvent,
  MouseEvent,
  ElementType,
} from 'react';
import { Link } from 'react-router-dom';
import isNil from 'lodash/isNil';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import Inline from '@commercetools-uikit/spacings-inline';
import { filterInvalidAttributes, warning } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { getStateStyles, getThemeStyles } from './secondary-button.styles';

export type TSecondaryButtonProps = {
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

  theme?: 'default' | 'info'; // TODO consider renaming this to `tone`
  to?: string;
};

// Gets the color which the icon sho√uld have based on context of button's state/cursor behavior
export const getIconColor = (
  props: Pick<
    TSecondaryButtonProps,
    'isToggleButton' | 'isToggled' | 'theme' | 'isDisabled' | 'iconLeft'
  > & {
    isActive?: boolean;
  }
) => {
  const isActive = props.isToggleButton && props.isToggled;
  // if button has a theme, icon should be the same color as the theme on active state
  if (props.theme !== 'default' && isActive && !props.isDisabled) return 'info'; // returns the passed in theme without overwriting
  // if button is disabled, icon should be grey
  if (props.isDisabled) return 'neutral60';
  // if button is not disabled nor has a theme, return icon's default color
  return props.iconLeft?.props.color;
};

const defaultProps: Pick<
  TSecondaryButtonProps,
  'type' | 'theme' | 'isToggleButton'
> = {
  type: 'button',
  theme: 'default',
  isToggleButton: false,
};

export const SecondaryButton = (props: TSecondaryButtonProps) => {
  const isActive = Boolean(props.isToggleButton && props.isToggled);
  const shouldUseLinkTag = !props.isDisabled && Boolean(props.to);
  const buttonAttributes = {
    'data-track-component': 'SecondaryButton',
    ...filterInvalidAttributes(props),
    ...(shouldUseLinkTag ? { to: props.to } : {}),
  };

  warning(
    !(props.theme !== 'default' && !props.isToggleButton),
    `Invalid prop \`theme\` supplied to \`SecondaryButton\`. Only toggle buttons may have a theme.`
  );

  warning(
    !(props.as && props.type !== 'button'),
    'SecondaryButton: "type" does not have any effect when "as" is set.'
  );

  if (isNil(props.to) && isNil(props.as)) {
    warning(
      typeof props.onClick === 'function',
      'SecondaryButton: "onClick" is required when "to" and "as" are not defined.'
    );
  }

  if (!isNil(props.to)) {
    warning(
      !isNil(props.as),
      'Invalid prop "to" supplied to "SecondaryButton". "to" does not have any effect when "as" is not defined.'
    );
  }

  const containerStyles = [
    css`
      display: flex;
      align-items: center;
      padding: 0 ${vars.spacingM};
      height: ${vars.bigButtonHeight};
    `,
    css`
      display: inline-flex;
      background-color: ${vars.colorSurface};
      border-radius: ${vars.borderRadius6};
      box-shadow: ${vars.shadow7};
      color: ${vars.colorSolid};
      font-size: ${vars.fontSizeDefault};
      transition: background-color ${vars.transitionLinear80Ms},
        box-shadow ${vars.transitionEaseinout150Ms};
    `,
    getStateStyles(props.isDisabled, isActive, props.theme),
    getThemeStyles(props.theme),
  ];

  return (
    <AccessibleButton
      as={(shouldUseLinkTag ? Link : props.as) as ElementType}
      type={props.type}
      buttonAttributes={buttonAttributes}
      label={props.label}
      onClick={props.onClick}
      isToggleButton={props.isToggleButton}
      isToggled={props.isToggled}
      isDisabled={props.isDisabled}
      css={containerStyles}
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
                color: getIconColor(props),
              })}
          </span>
        )}
        <span>{props.label}</span>
      </Inline>
    </AccessibleButton>
  );
};

SecondaryButton.displayName = 'SecondaryButton';
SecondaryButton.defaultProps = defaultProps;

export default SecondaryButton;
