import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../typography/text';
import styles from './date-calendar-header.mod.css';
import { AngleLeftIcon, AngleRightIcon, PinActiveIcon } from '../../icons';
import SecondaryIconButton from '../../buttons/secondary-icon-button';

const DateCalendarHeader = props => (
  <div className={styles.container}>
    <div className={styles.month}>
      <SecondaryIconButton
        label="prev month"
        onClick={props.onPrevMonthClick}
        icon={<AngleLeftIcon size="medium" />}
      />
      <SecondaryIconButton
        label="next month"
        onClick={props.onTodayClick}
        icon={<PinActiveIcon size="medium" />}
      />
      <SecondaryIconButton
        label="next month"
        onClick={props.onNextMonthClick}
        icon={<AngleRightIcon size="medium" />}
      />
      <Text.Body isInline={true} isBold={true}>
        {props.monthLabel}
      </Text.Body>
    </div>
    <div className={styles.year}>
      <SecondaryIconButton
        label="prev month"
        onClick={props.onPrevYearClick}
        icon={<AngleLeftIcon size="medium" />}
      />
      <Text.Body isBold={true}>{props.yearLabel}</Text.Body>
      <SecondaryIconButton
        label="prev month"
        onClick={props.onNextYearClick}
        icon={<AngleRightIcon size="medium" />}
      />
    </div>
  </div>
);

DateCalendarHeader.displayName = 'DateCalendarHeader';

DateCalendarHeader.propTypes = {
  monthLabel: PropTypes.string.isRequired,
  yearLabel: PropTypes.string.isRequired,
  onPrevMonthClick: PropTypes.func.isRequired,
  onTodayClick: PropTypes.func.isRequired,
  onNextMonthClick: PropTypes.func.isRequired,
  onPrevYearClick: PropTypes.func.isRequired,
  onNextYearClick: PropTypes.func.isRequired,
};

export default DateCalendarHeader;
