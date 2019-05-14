import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import filterAriaAttributes from '../../../utils/filter-aria-attributes';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import vars from '../../../../materials/custom-properties';
import AccessibleButton from '../accessible-button';

const hoverStyle = props => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };

  return css`
    &:hover {
      svg * {
        fill: ${overwrittenVars.colorPrimary};
      }
    }
  `;
};

const fillStyle = props => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };
  return css`
    svg * {
      fill: ${props.isDisabled
        ? overwrittenVars.colorNeutral60
        : overwrittenVars.colorSolid};
    }
  `;
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${fillStyle}

  ${props => !props.isDisabled && hoverStyle}
`;

export const SecondaryIconButton = props => {
  const buttonAttributes = {
    'data-track-component': 'SecondaryIconButton',
    ...filterAriaAttributes(props),
    ...filterDataAttributes(props),
  };
  return (
    <AccessibleButton
      type={props.type}
      buttonAttributes={buttonAttributes}
      label={props.label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
    >
      <IconContainer isDisabled={props.isDisabled}>
        {React.cloneElement(props.icon)}
      </IconContainer>
    </AccessibleButton>
  );
};

SecondaryIconButton.displayName = 'SecondaryIconButton';
SecondaryIconButton.propTypes = {
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

SecondaryIconButton.defaultProps = {
  type: 'button',
  isDisabled: false,
};

export default SecondaryIconButton;
