import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import Constraints from '@commercetools-uikit/constraints';
import {
  parseTime,
  filterDataAttributes,
  createSequentialId,
} from '@commercetools-uikit/utils';
import { useFieldId, usePrevious } from '@commercetools-uikit/hooks';
import TimeInputBody from './time-input-body';
import messages from './messages';

const sequentialId = createSequentialId('time-input-');

const leftPad = (value, length = 2) => String(value).padStart(length, '0');

const format24hr = ({ hours, minutes, seconds, milliseconds }) => {
  const base = `${leftPad(hours)}:${leftPad(minutes)}`;
  if (seconds === 0 && milliseconds === 0) return base;
  if (milliseconds === 0) return `${base}:${leftPad(seconds)}`;
  // string representation of a time without timezone in ISO 8601 format
  return `${base}:${leftPad(seconds)}.${leftPad(milliseconds, 3)}`;
};

const hasMilliseconds = (parsedTime) => parsedTime.milliseconds !== 0;

const TimeInput = (props) => {
  const id = useFieldId(props.id, sequentialId);
  const intl = useIntl();
  const prevLocale = usePrevious(intl.locale);

  const { name, value, onBlur, onChange } = props;

  const emitChange = React.useCallback(
    (nextValue) => {
      const event = {
        target: { id, name, value: nextValue },
      };
      onChange(event);
    },
    [id, name, onChange]
  );

  const handleBlur = React.useCallback(
    (event) => {
      // check formatting and reformat when necessary
      const formattedTime = TimeInput.toLocaleTime(value, intl.locale);

      if (formattedTime !== value) emitChange(formattedTime);

      // forward the onBlur call
      if (onBlur) onBlur(event);
    },
    [intl.locale, value, onBlur, emitChange]
  );

  const onClear = React.useCallback(() => emitChange(''), [emitChange]);

  // if locale has changed
  if (typeof prevLocale !== 'undefined' && prevLocale !== intl.locale) {
    emitChange(TimeInput.toLocaleTime(value, intl.locale));
  }

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <TimeInputBody
        id={id}
        name={props.name}
        autoComplete={props.autoComplete}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={handleBlur}
        isAutofocussed={props.isAutofocussed}
        isDisabled={props.isDisabled}
        hasError={props.hasError}
        isReadOnly={props.isReadOnly}
        onClear={onClear}
        placeholder={
          typeof props.placeholder === 'string'
            ? props.placeholder
            : intl.formatMessage(messages.placeholder)
        }
        {...filterDataAttributes(props)}
      />
    </Constraints.Horizontal>
  );
};

TimeInput.displayName = 'TimeInput';

// Takes any input like 15:10, 3 AM, 3AM, 3:15AM, 3:5AM and turns it
// into a 24h format (with seconds and milliseconds if present)
TimeInput.to24h = (time) => {
  const parsedTime = parseTime(time);
  return parsedTime ? format24hr(parsedTime) : '';
};

TimeInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  hasError: PropTypes.bool,
  isAutofocussed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
};

TimeInput.defaultProps = {
  horizontalConstraint: 'scale',
};

// Converts any value to either a formatted value or an empty string
// The resulting format might use 12h or 24h, unless the time contains
// seconds or milliseconds. If seconds or milliseconds are contained, the
// the 24h format is returned.
//
// Returns time in a format suitable for the locale.
TimeInput.toLocaleTime = (time, locale) => {
  const parsedTime = parseTime(time);
  if (!parsedTime) return '';

  const timeIn24hFormat = format24hr(parsedTime);

  // return the 24h format, as the time has high precision
  if (hasMilliseconds(parsedTime)) return timeIn24hFormat;

  // return the localized time (12h or 24h format)
  const date = new Date(
    1970,
    0,
    1,
    parsedTime.hours,
    parsedTime.minutes,
    parsedTime.seconds,
    parsedTime.milliseconds
  );

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    // only show seconds when time contains seconds
    second: parsedTime.seconds > 0 ? 'numeric' : undefined,
  };

  const isValidDate = !isNaN(date.getTime());
  return isValidDate ? date.toLocaleTimeString(locale, options) : '';
};

export default TimeInput;
