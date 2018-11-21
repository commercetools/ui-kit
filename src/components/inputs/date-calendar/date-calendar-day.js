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
        [styles.rangeStart]: props.isRangeStart,
        [styles.rangeBetween]: props.isRangeBetween,
        [styles.rangeEnd]: props.isRangeEnd,
      }
    )}
    {...omit(props, [
      'isHighlighted',
      'isSelected',
      'isRangeStart',
      'isRangeBetween',
      'isRangeEnd',
    ])}
  />
);

DateCalendarDay.displayName = 'DateCalendarDay';

DateCalendarDay.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['heading', 'spacing', 'day']),
  isHighlighted: PropTypes.bool,
  isSelected: PropTypes.bool,
  isRangeStart: PropTypes.bool,
  isRangeBetween: PropTypes.bool,
  isRangeEnd: PropTypes.bool,
};

export default DateCalendarDay;
