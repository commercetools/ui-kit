import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import filterAriaAttributes from '../../../utils/filter-aria-attributes';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import AccessibleButton from '../accessible-button';

export const SecondaryIconButton = props => {
  const buttonAttributes = {
    'data-track-component': 'SecondaryIconButton',
    ...filterAriaAttributes(props),
    ...filterDataAttributes(props),
  };
  let iconColor = 'solid';
  if (props.isDisabled) iconColor = 'neutral60';
  else if (props.isMouseOver) iconColor = 'primary';
  return (
    <div
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
      css={css`
        display: inline-flex;
        align-items: center;
        border: none;
        background: none;
        padding: 0;
        min-height: initial;
        cursor: pointer;
      `}
    >
      <AccessibleButton
        type={props.type}
        buttonAttributes={buttonAttributes}
        label={props.label}
        onClick={props.onClick}
        isDisabled={props.isDisabled}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          {React.cloneElement(props.icon, { color: iconColor })}
        </div>
      </AccessibleButton>
    </div>
  );
};

SecondaryIconButton.displayName = 'SecondaryIconButton';
SecondaryIconButton.propTypes = {
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,

  // HoC
  isMouseOver: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
};
SecondaryIconButton.defaultProps = {
  type: 'button',
  isDisabled: false,
};

export default withMouseOverState(SecondaryIconButton);
