import React from 'react';
import PropTypes from 'prop-types';
import styles from './calendar-calendar.mod.css';

const CalendarCalendar = props => (
  <ul className={styles.calendar}>{props.children}</ul>
);

CalendarCalendar.displayName = 'CalendarCalendar';

CalendarCalendar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CalendarCalendar;
