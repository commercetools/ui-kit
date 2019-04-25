import React from 'react';
import PropTypes from 'prop-types';
import { Button, Track, Toggle } from './toggle-input.styles';

const ToggleSwitch = props => (
  <Toggle {...props}>
    <Button {...props} />
    <Track {...props} />
  </Toggle>
);

ToggleSwitch.displayName = 'ToggleSwitch';
ToggleSwitch.propTypes = {
  size: PropTypes.oneOf(['small', 'big']).isRequired,
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default ToggleSwitch;
