import React from 'react';
import PropTypes from 'prop-types';
import styles from './date-calendar-time-input.mod.css';

const DateCalendarTimeInput = props => (
  <input
    ref={props.timeInputRef}
    type="text"
    className={styles.timeInput}
    value={props.value}
    onChange={props.onChange}
    onKeyDown={props.onKeyDown}
  />
);

DateCalendarTimeInput.displayName = 'DateCalendarTimeInput';

DateCalendarTimeInput.propTypes = {
  timeInputRef: PropTypes.object.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default DateCalendarTimeInput;
