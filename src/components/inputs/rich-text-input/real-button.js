import React from 'react';
// import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { BoldIcon } from './icons';
import AccessibleButton from '../../buttons/accessible-button';
import vars from '../../../../materials/custom-properties';

const Button = props => {
  return (
    <AccessibleButton
      onClick={props.onClick}
      css={css`
        background: ${props.isActive ? vars.colorAccent30 : vars.colorSurface};
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        padding: 2px;

        * {
          fill: ${props.isActive ? vars.colorSurface : vars.colorSolid};
        }
      `}
    >
      {React.cloneElement(props.icon, {
        size: 'medium',
      })}
    </AccessibleButton>
  );
};

Button.displayName = 'Button';

export default Button;
