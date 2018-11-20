import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import omit from 'lodash.omit';
import styles from './date-calendar-suggestion.mod.css';

const DateCalendarSuggestion = props => (
  <li
    {...omit(props, ['isHighlighted'])}
    className={classname(styles.suggestion, {
      [styles.highlighted]: props.isHighlighted,
    })}
  />
);

DateCalendarSuggestion.displayName = 'DateCalendarSuggestion';

DateCalendarSuggestion.propTypes = {
  children: PropTypes.node.isRequired,
  isHighlighted: PropTypes.bool,
};

export default DateCalendarSuggestion;
