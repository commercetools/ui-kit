import PropTypes from 'prop-types';
import React from 'react';
import isNil from 'lodash.isnil';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import AccessibleButton from '../accessible-button';

const getButtonLayoutStyles = size => {
  const baseLayoutStyles = `
    display: inline-flex;
    align-items: center;
    color: ${vars['--color-white']};
    transition: background-color ${vars['--transition-linear-80ms']};
  `;
  switch (size) {
    case 'small':
      return `
        ${baseLayoutStyles}
        border-radius: ${vars['--border-radius-4']};
        > button {
          padding: 0 ${vars['--spacing-8']} 0 ${vars['--spacing-8']};
          height: ${vars['--big-button-height']};
          border-radius: ${vars['--border-radius-4']};
        }
      `;
    case 'big':
      return `
        ${baseLayoutStyles}
        border-radius: ${vars['--border-radius-6']};
        > button {
          padding: 0 ${vars['--spacing-16']} 0 ${vars['--spacing-16']};
          height: ${vars['--big-button-height']};
          border-radius: ${vars['--border-radius-6']};
        }
      `;
    default:
      return '';
  }
};
const getButtonStyles = (isDisabled, isToggled, tone) => {
  const baseStyles = `
    display: flex;
    align-items: center;
    font-size:  ${vars['--font-size-default']};
  `;
  // toggled means active
  if (isToggled) {
    const baseActiveStyles = `
      ${baseStyles}
      box-shadow: inset ${vars['--shadow-7-first']}, inset ${
      vars['--shadow-7-second']
    };
      &:hover,
      &:focus {
        box-shadow: ${vars['--shadow-8']};
      }
    `;
    switch (tone) {
      case 'primary':
        return `
          ${baseActiveStyles}
          &:hover {
            background-color: ${vars['--color-green-25']};
          }
          &:active {
            background-color: ${vars['--color-green']};
          }
        `;
      case 'urgent':
        return `
          ${baseActiveStyles}
          &:hover {
            background-color: ${vars['--color-green-25']};
          }
          &:active {
            background-color: ${vars['--color-orange']};
          }
        `;
      default:
        return baseActiveStyles;
    }
  }
  if (isDisabled) {
    return `
      ${baseStyles}
      &:active,
      &:hover {
        background-color: ${vars['--color-navy-98']};
        color: ${vars['--color-gray-60']};
        box-shadow: 0 0 0 1px ${vars['--color-gray']} inset;
      }
    `;
  }
  const baseDefaultStyles = `
    ${baseStyles}
    box-shadow: ${vars['--shadow-7']};
    &:hover,
    &:focus {
      box-shadow: ${vars['--shadow-8']};
    }
    &:active {
      box-shadow: inset ${vars['--shadow-7-first']}, inset ${
    vars['--shadow-7-second']
  };
    }
  `;
  switch (tone) {
    case 'primary':
      return `
        ${baseDefaultStyles}
        background-color: ${vars['--color-green']};
        &:hover {
          background-color: ${vars['--color-green-25']};
        }
        &:active {
          background-color: ${vars['--color-green']};
        }
      `;
    case 'urgent':
      return `
        ${baseDefaultStyles}
        background-color: ${vars['--color-orange']};
        &:hover {
          background-color: ${vars['--color-green-25']};
        }
        &:active {
          background-color: ${vars['--color-orange']};
        }
      `;
    default:
      return baseDefaultStyles;
  }
};

const PrimaryButton = props => {
  const dataProps = {
    'data-track-component': 'PrimaryButton',
    ...filterDataAttributes(props),
  };
  return (
    <div
      css={css`
        ${getButtonLayoutStyles(props.size)}
      `}
    >
      <AccessibleButton
        type={props.type}
        buttonAttributes={dataProps}
        label={props.label}
        onClick={props.onClick}
        isToggled={props.isToggled}
        isDisabled={props.isDisabled}
        css={css`
          ${getButtonStyles(props.isDisabled, props.isToggled, props.tone)}
        `}
      >
        {Boolean(props.iconLeft) && (
          <span
            css={css`
              margin: 0 ${vars['--spacing-4']} 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            {React.cloneElement(props.iconLeft, {
              theme: props.isDisabled ? 'grey' : 'white',
            })}
          </span>
        )}
        <span>{props.label}</span>
      </AccessibleButton>
    </div>
  );
};

PrimaryButton.propTypes = {
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  label: PropTypes.string.isRequired,
  buttonAttributes: PropTypes.object,
  iconLeft: PropTypes.node,
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
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['big', 'small']),
  tone: PropTypes.oneOf(['urgent', 'primary']),
};
PrimaryButton.defaultProps = {
  type: 'button',
  size: 'big',
  isToggleButton: false,
  tone: 'primary',
};
PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
