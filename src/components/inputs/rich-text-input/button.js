import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import AccessibleButton from '../../buttons/accessible-button';
import vars from '../../../../materials/custom-properties';

const Button = props => {
  return (
    <AccessibleButton
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      label={props.label}
      css={css`
        background: ${props.isActive ? vars.colorAccent30 : vars.colorSurface};
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        padding: ${vars.spacingXs};

        * {
          fill: ${props.isActive ? vars.colorSurface : vars.colorSolid};
        }

        &:hover {
          background: ${props.isActive
            ? vars.colorAccent30
            : vars.colorNeutral90};
          * {
            fill: ${props.isActive ? vars.colorSurface : vars.colorSolid};
          }
        }
      `}
    >
      {props.icon}
    </AccessibleButton>
  );
};

Button.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  icon: PropTypes.element,
};

Button.displayName = 'Button';

export default Button;
