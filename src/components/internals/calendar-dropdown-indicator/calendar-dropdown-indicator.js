import React from 'react';
import PropTypes from 'prop-types';
import { components as SelectComponents } from 'react-select';
import { CalendarIcon } from '../../icons';

const CalendarDropdownIndicator = props => (
  <SelectComponents.DropdownIndicator {...props}>
    <CalendarIcon size="big" theme={props.isDisabled ? 'grey' : 'black'} />
  </SelectComponents.DropdownIndicator>
);
CalendarDropdownIndicator.displayName = 'CalendarDropdownIndicator';
CalendarDropdownIndicator.propTypes = {
  isDisabled: PropTypes.bool,
};

export default CalendarDropdownIndicator;
