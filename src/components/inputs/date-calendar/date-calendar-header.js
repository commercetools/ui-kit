import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../typography/text';
import styles from './date-calendar-header.mod.css';
import {
  AngleLeftIcon,
  AngleRightIcon,
  PinActiveIcon,
  AngleUpIcon,
  AngleDownIcon,
} from '../../icons';
import SecondaryIconButton from '../../buttons/secondary-icon-button';

const DateCalendarHeader = props => (
  <div className={styles.container}>
    <div className={styles.yearContainer}>
      <Text.Body isBold={true}>{props.label}</Text.Body>
      <SecondaryIconButton
        label="prev month"
        onClick={props.onPrevYearClick}
        icon={<AngleUpIcon size="medium" />}
      />
      <SecondaryIconButton
        label="prev month"
        onClick={props.onNextYearClick}
        icon={<AngleDownIcon size="medium" />}
      />
    </div>
    <div className={styles.buttons}>
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
    </div>
  </div>
);

DateCalendarHeader.displayName = 'DateCalendarHeader';

DateCalendarHeader.propTypes = {
  label: PropTypes.string.isRequired,
  onPrevMonthClick: PropTypes.func.isRequired,
  onTodayClick: PropTypes.func.isRequired,
  onNextMonthClick: PropTypes.func.isRequired,
  onPrevYearClick: PropTypes.func.isRequired,
  onNextYearClick: PropTypes.func.isRequired,
};

export default DateCalendarHeader;
