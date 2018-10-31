import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import createSequentialId from '../../../utils/create-sequential-id';
import Constraints from '../../constraints';
import TimeInputBody from './time-input-body';

const sequentialId = createSequentialId('time-input-');

const leftPad = (value, length = 2) => String(value).padStart(length, '0');

const format24hr = ({ hours, minutes, seconds, milliseconds }) => {
  const base = `${leftPad(hours)}:${leftPad(minutes)}`;
  if (seconds === 0 && milliseconds === 0) return base;
  if (milliseconds === 0) return `${base}:${leftPad(seconds)}`;
  // string representation of a time without timezone in ISO 8601 format
  return `${base}:${leftPad(seconds)}.${leftPad(milliseconds, 3)}`;
};

const hasSeconds = parsedTime =>
  parsedTime.seconds !== 0 || parsedTime.milliseconds !== 0;
const hasMilliseconds = parsedTime => parsedTime.milliseconds !== 0;

// Attempts to parse a string containing a time in either 12h or 24h format,
// with precision of up to three milliseconds
// Valid inputs:
//   13:00
//   3:00
//   3 PM
//   14:5 am
//   13:00:00.000
//   13:00:60
//   13:00:59.908
// Returns an object containing time information or null
export const parseTime = rawTime => {
  if (!rawTime || typeof rawTime !== 'string') return null;

  const time = rawTime.trim().toLowerCase();

  const match = time.match(
    /^(\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:\.(\d{1,3}))?)?)?\s*(am|pm)?$/
  );
  if (!match) return null;

  // As we accept eg "3 AM" there might not be a value for minutes, seconds or
  // milliseconds, so we default them
  const [
    ,
    hours,
    minutes = '00',
    seconds = '00',
    milliseconds = '000',
    amPm,
  ] = match;
  if (Number(minutes) > 59) return null;
  if (amPm && Number(hours) > 12) return null;
  if (!amPm && Number(hours) > 23) return null;
  if (Number(seconds) > 59) return null;
  if (Number(milliseconds) > 999) return null;

  return {
    hours: Number(hours) + (amPm === 'pm' && Number(hours) !== 12 ? 12 : 0),
    minutes: Number(minutes),
    seconds: Number(seconds),
    // Parses the number as a fraction to ensure that .5, .05 and .005 are
    // parsed correctily (they are 500, 50 and 5 respectively).
    milliseconds: Number(`0.${milliseconds}`) * 1000,
  };
};

export class TimeInput extends React.Component {
  static displayName = 'TimeInput';

  // Takes any input like 15:10, 3 AM, 3AM, 3:15AM, 3:5AM and turns it
  // into a 24h format (with seconds and milliseconds if present)
  static to24h = time => {
    const parsedTime = parseTime(time);
    return parsedTime ? format24hr(parsedTime) : '';
  };

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    hasError: PropTypes.bool,
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),

    // HoC
    intl: PropTypes.shape({
      formatTime: PropTypes.func.isRequired,
      locale: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: do {
      if (props.id) props.id;
      else if (state.id) state.id;
      else sequentialId();
    },
  });

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.intl.locale !== this.props.intl.locale) {
      this.emitChange(this.toLocaleTime(this.props.value));
    }
  }

  emitChange = value => {
    const event = {
      target: { id: this.props.id, name: this.props.name, value },
    };
    this.props.onChange(event);
  };

  // Converts any value to either a formatted value or an empty string
  // The resulting format might use 12h or 24h, unless the time contains
  // seconds or milliseconds. If seconds or milliseconds are contained, the
  // the 24h format is returned.
  //
  // Returns time in a format suitable for the locale.
  toLocaleTime = time => {
    const parsedTime = parseTime(time);
    if (!parsedTime) return '';

    const timeIn24hFormat = format24hr(parsedTime);

    // return the 24h format, as the time has high precision
    if (hasSeconds(parsedTime) || hasMilliseconds(parsedTime))
      return timeIn24hFormat;

    // return the localized time (12h or 24h format)
    const date = new Date(
      Date.UTC(
        1970,
        0,
        1,
        time.hours,
        time.minutes,
        time.seconds,
        time.milliseconds
      )
    );
    date.setDate(1);
    date.setMonth(0);
    date.setYear(1970);
    console.log(date);
    const isValidDate = !isNaN(date.getTime());
    return isValidDate ? this.props.intl.formatTime(date) : '';
  };

  handleBlur = event => {
    // check formatting and reformat when necessary
    const formattedTime = this.toLocaleTime(this.props.value);

    if (formattedTime !== this.props.value) this.emitChange(formattedTime);

    // forward the onBlur call
    if (this.props.onBlur) this.props.onBlur(event);
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <TimeInputBody
          id={this.state.id}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.handleBlur}
          isAutofocussed={this.props.isAutofocussed}
          isDisabled={this.props.isDisabled}
          hasError={this.props.hasError}
          onClear={() => this.emitChange('')}
          placeholder={this.props.placeholder}
          {...filterDataAttributes(this.props)}
        />
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(TimeInput);
