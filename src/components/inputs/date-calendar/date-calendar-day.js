import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import classname from 'classnames';
import styles from './date-calendar-day.mod.css';

const DateCalendarDay = props => (
  <li
    className={classname(
      do {
        if (props.type === 'heading') styles.heading;
        else if (props.type === 'spacing') styles.spacing;
        else styles.day;
      },
      {
        [styles.highlighted]: props.isHighlighted,
        [styles.selected]: props.isSelected,
      }
    )}
    {...omit(props, ['isHighlighted', 'isSelected'])}
  />
);

DateCalendarDay.displayName = 'DateCalendarDay';

DateCalendarDay.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['heading', 'spacing', 'day']),
  isHighlighted: PropTypes.bool,
  isSelected: PropTypes.bool,
};

export default DateCalendarDay;
