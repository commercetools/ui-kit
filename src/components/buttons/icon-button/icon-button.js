import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import filterAriaAttributes from '../../../utils/filter-aria-attributes';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import AccessibleButton from '../accessible-button';
import {
  getStateStyles,
  getShapeStyles,
  getSizeStyles,
  getThemeStyles,
  getHoverStyles,
} from './icon-button.styles';

// Gets the color which the icon should have based on context of button's state/cursor behavior
const getIconThemeColor = props => {
  const isActive = props.isToggleButton && props.isToggled;

  // if button has a theme, icon should be white when hovering/clicking
  if (props.theme !== 'default' && isActive) {
    if (props.isDisabled) {
      return 'neutral60';
    }
    return 'surface';
  }

  // if button is disabled, icon should be neutral60
  if (props.isDisabled) return 'neutral60';
  // if button is not disabled nor has a theme, return icon's default color
  return props.icon.props.theme;
};

export const IconButton = props => {
  const buttonAttributes = {
    'data-track-component': 'IconButton',
    ...filterAriaAttributes(props),
    ...filterDataAttributes(props),
  };
  const isActive = props.isToggleButton && props.isToggled;
  return (
    <AccessibleButton
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

IconButton.propTypes = {
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  isToggleButton: PropTypes.bool.isRequired,
  isToggled(props, propName, componentName, ...rest) {
    if (props.isToggleButton) {
      return PropTypes.bool.isRequired(props, propName, componentName, ...rest);
    }
    if (!isNil(props[propName]))
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` does not have any effect when the button is not a toggle button.`
      );
    return PropTypes.bool(props, propName, componentName, ...rest);
  },
  isDisabled: PropTypes.bool,
  /* FIXME: onClick should be required.
    There are still some places where we can't pass it yet.
    Check the spreadsheet to see where;
  */
  onClick: PropTypes.func,
  shape: PropTypes.oneOf(['round', 'square']),
  size: PropTypes.oneOf(['small', 'medium', 'big']),
  theme(props, propName, componentName, ...rest) {
    if (props[propName] !== 'default' && !props.isToggleButton) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Only toggle buttons may have a theme.`
      );
    }
    return PropTypes.oneOf(['default', 'primary', 'info'])(
      props,
      propName,
      componentName,
      ...rest
    );
  },
};

IconButton.defaultProps = {
  type: 'button',
  theme: 'default',
  size: 'big',
  shape: 'round',
  isToggleButton: false,
};

IconButton.displayName = 'IconButton';

export default IconButton;
