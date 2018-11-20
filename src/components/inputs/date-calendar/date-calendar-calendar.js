import React from 'react';
import PropTypes from 'prop-types';
import styles from './date-calendar-calendar.mod.css';

const DateCalendarCalendar = props => (
  <ul className={styles.calendar}>{props.children}</ul>
);

DateCalendarCalendar.displayName = 'DateCalendarCalendar';

DateCalendarCalendar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DateCalendarCalendar;
