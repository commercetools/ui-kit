import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import classnames from 'classnames';
import styles from './calendar-day.mod.css';

const CalendarDay = props => (
  <li className={styles.wrapper}>
    <div
      className={classnames(
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
          [styles.today]:
            !props.isSelected &&
            !props.isRangeStart &&
            !props.isRangeEnd &&
            props.isToday,
        }
      )}
      {...omit(props, [
        'isHighlighted',
        'isSelected',
        'isRangeStart',
        'isRangeBetween',
        'isRangeEnd',
        'isToday',
      ])}
    />
  </li>
);

CalendarDay.displayName = 'CalendarDay';

CalendarDay.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['heading', 'spacing', 'day']),
  isHighlighted: PropTypes.bool,
  isSelected: PropTypes.bool,
  isRangeStart: PropTypes.bool,
  isRangeBetween: PropTypes.bool,
  isRangeEnd: PropTypes.bool,
  isToday: PropTypes.bool,
};

export default CalendarDay;
