import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import AccessibleButton from '../../buttons/accessible-button';
import vars from '../../../../materials/custom-properties';

const RichTextInputButton = props => {
  return (
    <div>
      <AccessibleButton
        isDisabled={props.isDisabled}
        label={props.label}
        css={css`
          background: ${props.isActive ? vars.colorAccent30 : 'transparent'};
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
        {...props}
      >
        {props.icon}
      </AccessibleButton>
    </div>
  );
};

RichTextInputButton.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  icon: PropTypes.element.isRequired,
};

RichTextInputButton.displayName = 'Button';

export default RichTextInputButton;
