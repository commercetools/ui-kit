import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import invariant from 'tiny-invariant';
import isNil from 'lodash.isnil';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import withMouseDownState from '../../../hocs/with-mouse-down-state';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import AccessibleButton from '../accessible-button';

const buttonSizes = {
  small: '16px',
  medium: '24px',
  big: '32px',
};

const getStateStyles = (isDisabled, isToggled, theme) => {
  // toggled means active
  if (isToggled) {
    const activeStyle = `
      box-shadow: ${vars['--shadow-9']};
      background-color: ${vars['--color-white']};
      &:hover {
        box-shadow: ${vars['--shadow-9']};
        background-color: ${vars['--color-gray-95']};
      }
    `;
    switch (theme) {
      case 'blue':
        return `
          ${activeStyle}
          ${
            // When the button is active and somehow is disabled it should have
            // a different color to indicate that it's active but can't receive any actions
            isDisabled
              ? `
                background-color: ${vars['--color-blue-85']};
                color: ${vars['--color-white']};
                box-shadow: ${vars['--shadow-9']};
              `
              : ''
          }
          background-color: ${vars['--color-blue']};
          color: ${vars['--color-white']};
          &:hover {
            background-color: ${vars['--color-blue-85']};
          }
        `;
      case 'green':
        return `
          ${activeStyle}
          ${
            // When the button is active and somehow is disabled it should have
            // a different color to indicate that it's active but can't receive any actions
            isDisabled
              ? `
                background-color: ${vars['--color-green-85']};
                color: ${vars['--color-white']};
                box-shadow: ${vars['--shadow-9']};
              `
              : ''
          }
          background-color: ${vars['--color-green']};
          color: ${vars['--color-white']};
          &:hover {
            background-color: ${vars['--color-green-85']};
          }
        `;
      default:
        return activeStyle;
    }
  }
  if (isDisabled) {
    const disabledStyle = `
      background-color: ${vars['--color-navy-98']};
      color: ${vars['--color-gray-60']};
      box-shadow: none;
    `;
    switch (theme) {
      case 'blue':
        return `
          ${disabledStyle}
          &:hover {
            background-color: ${vars['--color-blue-85']};
          }
        `;
      case 'green':
        return `
          ${disabledStyle}
          &:hover {
            background-color: ${vars['--color-green-85']};
          }
        `;
      default:
        return disabledStyle;
    }
  }
  return `
    &:hover {
      box-shadow: ${vars['--shadow-8']};
    }
    &:active {
      box-shadow: ${vars['--shadow-9']};
      background-color: ${vars['--color-white']};
    }
  `;
};

// Gets the color which the icon should have based on context of button's state/cursor behavior
const getIconThemeColor = props => {
  // if button has a theme, icon should be white when hovering/clicking
  if (props.theme !== 'default' && (props.isToggled || props.isMouseOver)) {
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

const getShapeStyles = (shape, size) => {
  switch (shape) {
    case 'round':
      return `border-radius: 50%;`;
    case 'square':
      switch (size) {
        case 'small':
          return `border-radius: ${vars['--border-radius-2']};`;
        case 'medium':
          return `border-radius: ${vars['--border-radius-4']};`;
        case 'big':
          return `border-radius: ${vars['--border-radius-6']};`;
        default:
          return '';
      }
    default:
      return '';
  }
};
const getSizeStyles = size => {
  switch (size) {
    case 'small':
      return `
        height: ${buttonSizes.small};
        width: ${buttonSizes.small};
      `;
    case 'medium':
      return `
        height: ${buttonSizes.medium};
        width: ${buttonSizes.medium};
      `;
    case 'big':
      return `
        height: ${buttonSizes.big};
        width: ${buttonSizes.big};
      `;
    default:
      return '';
  }
};
const getThemeStyles = theme => {
  if (!theme) return '';

  if (theme === 'default') return '';

  switch (theme) {
    case 'green':
      return `
        &:active {
          background-color:  ${vars['--color-green']};
          color:  ${vars['--color-white']};
        }
      `;
    case 'blue':
      return `
        &:hover {
          background-color:  ${vars['--color-blue']};
          color:  ${vars['--color-white']};
        }
      `;
    default: {
      invariant(
        false,
        `ui-kit/IconButton: the specified theme '${theme}' is not supported.`
      );
      return '';
    }
  }
};

export const IconButton = props => {
  const dataProps = {
    'data-track-component': 'IconButton',
    ...filterDataAttributes(props),
  };
  return (
    <div
      onMouseDown={props.handleMouseDown}
      onMouseUp={props.handleMouseUp}
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
      css={css`
        display: inline-block;
        background-color: ${vars['--color-white']};
        box-shadow: ${vars['--shadow-7']};
        color: ${vars['--color-black']};
        transition: background-color ${vars['--transition-linear-80ms']},
          box-shadow 150ms ease-in-out;

        ${getStateStyles(props.isDisabled, props.isToggled, props.theme)}
        ${getShapeStyles(props.shape, props.size)}
        ${getSizeStyles(props.size)}
        ${getThemeStyles(props.theme)}
      `}
    >
      <AccessibleButton
        buttonAttributes={dataProps}
        type={props.type}
        label={props.label}
        onClick={props.onClick}
        isToggled={props.isToggled}
        isDisabled={props.isDisabled}
        css={css`
          ${getSizeStyles(props.size)}
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            ${getSizeStyles(props.size)}
            > * + * {
              margin: 0 0 0 6px;
            }
          `}
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
