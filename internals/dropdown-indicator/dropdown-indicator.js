import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { CaretDownIcon } from '../../icons';

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    {/* FIXME: add proper tone when tones are refactored */}
    <CaretDownIcon theme={props.isDisabled && 'grey'} size="small" />
  </components.DropdownIndicator>
);

DropdownIndicator.displayName = 'DropdownIndicator';

DropdownIndicator.propTypes = {
  isDisabled: PropTypes.bool,
};

export default DropdownIndicator;
