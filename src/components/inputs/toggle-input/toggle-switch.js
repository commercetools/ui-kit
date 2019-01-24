import React from 'react';
import PropTypes from 'prop-types';
import Icons from './icons';
import {
  getToggleSwitchStyles,
  getToggleButtonStyles,
  getToggleBarStyles,
} from './toggle-input.styles';

export const ToggleButton = props => (
  <Icons.ButtonDefault css={getToggleButtonStyles(props)} />
);
ToggleButton.displayName = 'ToggleButton';
ToggleButton.propTypes = {
  size: PropTypes.oneOf(['small', 'big']).isRequired,
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export const ToggleBar = props => (
  <Icons.BarDefault css={getToggleBarStyles(props)} />
);
ToggleBar.displayName = 'ToggleBar';
ToggleBar.propTypes = {
  size: PropTypes.oneOf(['small', 'big']).isRequired,
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const ToggleSwitch = props => (
  <div css={getToggleSwitchStyles(props)}>
    <ToggleButton {...props} />
    <ToggleBar {...props} />
  </div>
);

ToggleSwitch.displayName = 'ToggleSwitch';
ToggleSwitch.propTypes = {
  size: PropTypes.oneOf(['small', 'big']).isRequired,
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default ToggleSwitch;
