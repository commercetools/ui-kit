import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import AccessibleButton from '../../buttons/accessible-button';
import vars from '../../../../materials/custom-properties';

const RichTextBodyButton = props => {
  const { onMouseDown } = props;
  const handleMouseDown = React.useCallback(
    event => {
      event.preventDefault();
      onMouseDown(event);
    },
    [onMouseDown]
  );
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
        onMouseDown={handleMouseDown}
      >
        {props.icon}
      </AccessibleButton>
    </div>
  );
};

RichTextBodyButton.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  icon: PropTypes.element.isRequired,
};

RichTextBodyButton.displayName = 'RichTextInputButton';

export default RichTextBodyButton;
