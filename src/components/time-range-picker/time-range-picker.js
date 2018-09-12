import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Text from '../typography/text';
import TimeInput from '../inputs/time-input';
import Spacings from '../spacings';
import styles from './time-range-picker.mod.css';
import messages from './messages';

const TimeRangePicker = props => {
  const handleChangeValue = rangeKey => value => {
    props.onChange({
      ...props.value,
      // avoid parsing when the value has been reset
      [rangeKey]: value,
    });
  };
  return (
    <Spacings.Inline alignItems="center">
      <div className={styles['time-item']}>
        <Spacings.Inline alignItems="center">
          <Text.Body isBold={true}>
            <FormattedMessage {...messages.from} />
          </Text.Body>
          <TimeInput
            value={props.value.from}
            onChange={handleChangeValue('from')}
            mode="single"
            timeZone={props.timeZone}
          />
        </Spacings.Inline>
      </div>
      <div className={styles['time-item']}>
        <Spacings.Inline alignItems="center">
          <Text.Body isBold={true}>
            <FormattedMessage {...messages.to} />
          </Text.Body>
          <TimeInput
            value={props.value.to}
            onChange={handleChangeValue('to')}
            mode="single"
            timeZone={props.timeZone}
          />
        </Spacings.Inline>
      </div>
    </Spacings.Inline>
  );
};

TimeRangePicker.displayName = 'TimeRangePicker';
TimeRangePicker.propTypes = {
  value: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  timeZone: PropTypes.string.isRequired,
};

export default TimeRangePicker;
