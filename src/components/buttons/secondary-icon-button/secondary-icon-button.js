import React from 'react';
import PropTypes from 'prop-types';
import filterAriaAttributes from '../../../utils/filter-aria-attributes';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import AccessibleButton from '../accessible-button';
import { getBaseStyles } from './secondary-icon-button.styles';

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
      css={getBaseStyles(props)}
    >
      {props.icon &&
        React.cloneElement(props.icon, {
          size: props.size,
        })}
    </AccessibleButton>
  );
};

SecondaryIconButton.displayName = 'SecondaryIconButton';
SecondaryIconButton.propTypes = {
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  icon: PropTypes.element.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'big']),
  color: PropTypes.oneOf(['solid', 'primary']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

SecondaryIconButton.defaultProps = {
  size: 'big',
  color: 'solid',
  type: 'button',
  isDisabled: false,
};

export default SecondaryIconButton;
