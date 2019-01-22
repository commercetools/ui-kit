import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import isNil from 'lodash.isnil';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import withMouseDownState from '../../../hocs/with-mouse-down-state';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import AccessibleButton from '../accessible-button';
import {
  getStateStyles,
  getShapeStyles,
  getSizeStyles,
  getThemeStyles,
} from './icon-button.styles';

// Gets the color which the icon should have based on context of button's state/cursor behavior
const getIconThemeColor = props => {
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

export const IconButton = props => {
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
          background-color: ${vars['--color-white']};
          box-shadow: ${vars['--shadow-7']};
          color: ${vars['--color-black']};
          transition: background-color ${vars['--transition-linear-80ms']},
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
    return PropTypes.oneOf(['default', 'green', 'blue'])(
      props,
      propName,
      componentName,
      ...rest
    );
  },

  // HoC
  isMouseDown: PropTypes.bool.isRequired,
  isMouseOver: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
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
