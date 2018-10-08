import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Constraints from '../../constraints';
import { TimeInputBody } from './time-input-body';

const leftPad = value => (String(value).length === 1 ? `0${value}` : value);

const format24hr = (hours, minutes) => `${leftPad(hours)}:${leftPad(minutes)}`;

// This component lets the user select a time.
//
// The `value` of this component and the value of the event `onChange` gets
// called with is always a 24hr format time string, or an empty string.
export class TimeInput extends React.Component {
  static displayName = 'TimeInput';

  // Takes any input like 15:10, 3 AM, 3AM, 3:15AM, 3:5AM and turns it
  // into a 24h format
  static to24h = rawTime => {
    if (!rawTime || typeof rawTime !== 'string') return '';

    const time = rawTime.trim().toLowerCase();

    const match = time.match(/^(\d{1,2})(?::?(\d{1,2}))?\s*(am|pm)?$/);
    if (!match) return '';
    // As we accept eg "3 AM" there might not be a value for minutes, so we
    // default it to "00".
    const [, hours, minutes = '00', amPm] = match;
    if (Number(minutes) > 59) return '';
    if (amPm && Number(hours) > 12) return '';
    if (!amPm && Number(hours) > 23) return '';

    return amPm === 'pm'
      ? format24hr(Number(hours) + 12, minutes)
      : format24hr(Number(hours), minutes);
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

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.intl.locale !== this.props.intl.locale) {
      this.emitChange(this.toLocaleTime(TimeInput.to24h(this.props.value)));
    }
  }

  emitChange = value => {
    const event = {
      target: { id: this.props.id, name: this.props.name, value },
    };
    this.props.onChange(event);
  };

  // time should be passed in as 24h format
  // returns time in format of locale (either 12h or 24h).
  toLocaleTime = time => {
    const date = new Date(`1970-01-01 ${time}`);
    const isValidDate = !isNaN(date.getTime());
    return isValidDate ? this.props.intl.formatTime(date) : '';
  };

  handleBlur = event => {
    // check formatting and reformat when necessary
    const formattedTime = this.toLocaleTime(TimeInput.to24h(this.props.value));
    if (formattedTime !== this.props.value) this.emitChange(formattedTime);

    // forward the onBlur call
    if (this.props.onBlur) this.props.onBlur(event);
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <TimeInputBody
          id={this.props.id}
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
