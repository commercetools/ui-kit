import React from 'react';
import { compose } from 'recompose';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import withMouseDownState from '../../../hocs/with-mouse-down-state';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import AccessibleButton from '../accessible-button';
import invariant from 'tiny-invariant';
import {
  getStateStyles,
  getShapeStyles,
  getSizeStyles,
  getThemeStyles,
} from './icon-button.styles';

type IconButtonProps = {
  type: 'submit' | 'reset' | 'button';
  label: string;
  icon: React.ReactElement<any>;
  isToggleButton: boolean;
  isToggled: boolean;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<any>) => void;
  shape: 'round' | 'square';
  size: 'small' | 'medium' | 'big';
  theme: 'default' | 'green' | 'blue';

  // HoC
  isMouseDown: boolean;
  isMouseOver: () => void;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
};

// Gets the color which the icon should have based on context of button's state/cursor behavior
const getIconThemeColor = (props: IconButtonProps) => {
  const isActive = props.isToggleButton && props.isToggled;
  // if button has a theme, icon should be white when hovering/clicking
  if (props.theme !== 'default' && (isActive || props.isMouseOver)) {
    if (props.isDisabled) {
      return 'grey';
    }
    return 'white';
  }

  // if button is disabled, icon should be grey
  if (props.isDisabled) return 'grey';
  // if button is not disabled nor has a theme, return icon's default color
  return props.icon.props.theme;
};

export const IconButton: React.FC<IconButtonProps> = props => {
  invariant(
    props.isToggleButton && typeof props.isToggled === 'undefined',
    'ui-kit/IconButton: when `isToggleButton` is passed `isToggled` is required.'
  );
  invariant(
    !props.isToggleButton && typeof props.isToggled !== 'undefined',
    'ui-kit/IconButton: when not `isToggleButton` `isToggled` does not affect the component.'
  );
  invariant(
    !props.isToggleButton && props.theme !== 'default',
    'ui-kit/IconButton: when not `isToggleButton` a `theme` is not supported.'
  );

  const buttonAttributes = {
    'data-track-component': 'IconButton',
    ...filterDataAttributes(props),
  };
  const isActive = props.isToggleButton && props.isToggled;
  return (
    <div
      onMouseDown={props.handleMouseDown}
      onMouseUp={props.handleMouseUp}
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
      css={[
        css`
          display: inline-block;
          background-color: ${vars.colorWhite};
          box-shadow: ${vars.shadow7};
          color: ${vars.colorBlack};
          transition: background-color ${vars.transitionLinear80Ms},
            box-shadow 150ms ease-in-out;
        `,
        getStateStyles(props.isDisabled, isActive, props.theme),
        getShapeStyles(props.shape, props.size),
        getSizeStyles(props.size),
        getThemeStyles(props.theme),
      ]}
    >
      <AccessibleButton
        buttonAttributes={buttonAttributes}
        type={props.type}
        label={props.label}
        onClick={props.onClick}
        isToggleButton={props.isToggleButton}
        isToggled={props.isToggled}
        isDisabled={props.isDisabled}
        css={getSizeStyles(props.size)}
      >
        <div
          css={[
            css`
              display: flex;
              align-items: center;
              justify-content: center;
            `,
            getSizeStyles(props.size),
          ]}
        >
          {props.icon &&
            React.cloneElement(props.icon, {
              size: props.size,
              theme: getIconThemeColor(props),
            })}
        </div>
      </AccessibleButton>
    </div>
  );
};

IconButton.defaultProps = {
  type: 'button',
  theme: 'default',
  size: 'big',
  shape: 'round',
  isToggleButton: false,
};

IconButton.displayName = 'IconButton';

export default compose(
  withMouseOverState,
  withMouseDownState
)(IconButton);
