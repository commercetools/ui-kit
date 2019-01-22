import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../typography/text';
import styles from './calendar-header.mod.css';
import { AngleLeftIcon, AngleRightIcon, CircleIcon } from '../../icons';
import SecondaryIconButton from '../../buttons/secondary-icon-button';

const CalendarHeader = props => (
  <div className={styles.container}>
    <div className={styles.month}>
      <SecondaryIconButton
        label="show prev month"
        onClick={props.onPrevMonthClick}
        icon={<AngleLeftIcon size="medium" />}
      />
      <SecondaryIconButton
        label="show today"
        onClick={props.onTodayClick}
        icon={<CircleIcon size="medium" />}
      />
      <SecondaryIconButton
        label="show next month"
        onClick={props.onNextMonthClick}
        icon={<AngleRightIcon size="medium" />}
      />
      <Text.Body isInline={true} isBold={true}>
        {props.monthLabel}
      </Text.Body>
    </div>
    <div className={styles.year}>
      <SecondaryIconButton
        label="show prev year"
        onClick={props.onPrevYearClick}
        icon={<AngleLeftIcon size="medium" />}
      />
      <Text.Body isBold={true}>{props.yearLabel}</Text.Body>
      <SecondaryIconButton
        label="show next year"
        onClick={props.onNextYearClick}
        icon={<AngleRightIcon size="medium" />}
      />
    </div>
  </div>
);

CalendarHeader.displayName = 'CalendarHeader';

CalendarHeader.propTypes = {
  monthLabel: PropTypes.string.isRequired,
  yearLabel: PropTypes.string.isRequired,
  onPrevMonthClick: PropTypes.func.isRequired,
  onTodayClick: PropTypes.func.isRequired,
  onNextMonthClick: PropTypes.func.isRequired,
  onPrevYearClick: PropTypes.func.isRequired,
  onNextYearClick: PropTypes.func.isRequired,
};

export default CalendarHeader;
