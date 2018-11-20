import React from 'react';
import PropTypes from 'prop-types';
import styles from './date-calendar-suggestions.mod.css';

const DateCalendarSuggestions = props => (
  <ul className={styles.suggestions}>{props.children}</ul>
);

DateCalendarSuggestions.displayName = 'DateCalendarSuggestions';

DateCalendarSuggestions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DateCalendarSuggestions;
