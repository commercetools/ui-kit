import PropTypes from 'prop-types';
import React from 'react';
import isNil from 'lodash.isnil';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Spacings from '../../spacings';
import AccessibleButton from '../accessible-button';
import {
  getButtonLayoutStyles,
  getButtonStyles,
} from './primary-button.styles';

const PrimaryButton = props => {
  const dataProps = {
    'data-track-component': 'PrimaryButton',
    ...filterDataAttributes(props),
  };
  const isActive = props.isToggleButton && props.isToggled;
  return (
    <div css={getButtonLayoutStyles(props.size)}>
      <AccessibleButton
        type={props.type}
        buttonAttributes={dataProps}
        label={props.label}
        onClick={props.onClick}
        isToggleButton={props.isToggleButton}
        isToggled={props.isToggled}
        isDisabled={props.isDisabled}
        css={getButtonStyles(props.isDisabled, isActive, props.tone)}
      >
        <Spacings.Inline alignItems="center" scale="xs">
          {Boolean(props.iconLeft) && (
            <span
              css={css`
                margin: 0 ${vars.spacing4} 0 0;
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              {React.cloneElement(props.iconLeft, {
                theme: props.isDisabled ? 'grey' : 'white',
                size: props.size === 'small' ? 'medium' : 'big',
              })}
            </span>
          )}
          <span>{props.label}</span>
        </Spacings.Inline>
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
