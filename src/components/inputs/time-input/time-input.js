import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import createSequentialId from '../../../utils/create-sequential-id';
import Constraints from '../../constraints';
import { parseTime } from '../../../utils/parse-time';
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

const hasMilliseconds = parsedTime => parsedTime.milliseconds !== 0;

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
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    hasError: PropTypes.bool,
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),

    // HoC
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
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
      this.emitChange(
        TimeInput.toLocaleTime(this.props.value, this.props.intl.locale)
      );
    }
  }

  emitChange = value => {
    const event = {
      target: { id: this.state.id, name: this.props.name, value },
    };
    this.props.onChange(event);
  };

  // Converts any value to either a formatted value or an empty string
  // The resulting format might use 12h or 24h, unless the time contains
  // seconds or milliseconds. If seconds or milliseconds are contained, the
  // the 24h format is returned.
  //
  // Returns time in a format suitable for the locale.
  static toLocaleTime = (time, locale) => {
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

  handleBlur = event => {
    // check formatting and reformat when necessary
    const formattedTime = TimeInput.toLocaleTime(
      this.props.value,
      this.props.intl.locale
    );

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
          onFocus={this.props.onFocus}
          onBlur={this.handleBlur}
          isAutofocussed={this.props.isAutofocussed}
          isDisabled={this.props.isDisabled}
          hasError={this.props.hasError}
          onClear={() => this.emitChange('')}
          placeholder={
            typeof this.props.placeholder === 'string'
              ? this.props.placeholder
              : this.props.intl.formatMessage(messages.placeholder)
          }
          {...filterDataAttributes(this.props)}
        />
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(TimeInput);
