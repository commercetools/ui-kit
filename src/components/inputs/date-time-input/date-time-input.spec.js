import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import DateTimeInput, {
  splitDateTimeString,
  parseTime,
} from './date-time-input';

describe('splitDateTimeString', () => {
  describe('when called with a string containing date and time', () => {
    it('should return the best match', () => {
      expect(splitDateTimeString('Monday at 4pm', [' at ', ' @ '])).toEqual([
        'Monday',
        '4pm',
      ]);
      expect(splitDateTimeString('Monday @ 4pm', [' at ', ' @ '])).toEqual([
        'Monday',
        '4pm',
      ]);
    });
  });
  describe('when called with non-matching case string containing date and time', () => {
    it('should return the best match', () => {
      expect(splitDateTimeString('Monday AT 4pm', [' at ', ' @ '])).toEqual([
        'Monday',
        '4pm',
      ]);
    });
  });
  describe('when called with a string containing a date only', () => {
    it('should return the best match', () => {
      expect(splitDateTimeString('Today', [' at ', ' @ '])).toEqual(['Today']);
      expect(splitDateTimeString('Today', [' at ', ' @ '])).toEqual(['Today']);
    });
  });
});

describe('parseTime', () => {
  it('should work with am/pm times', () => {
    // 0 am (does not exist)
    expect(parseTime('0 am')).toEqual(null);
    // 65 am (does not exist)
    expect(parseTime('65 am')).toEqual(null);
    // 0:30 am (does not exist)
    expect(parseTime('0:30 am')).toEqual(null);
    // 1 am (01:00)
    expect(parseTime('1 am')).toEqual({
      hours: 1,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    // 12 am (24:00) = 0:00
    expect(parseTime('12 am')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    // 12:30 am (00:30)
    expect(parseTime('12:30 am')).toEqual({
      hours: 0,
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    });

    // 0 pm (does not exist)
    expect(parseTime('0 pm')).toEqual(null);
    // 0:30 pm (does not exist)
    expect(parseTime('0:30 pm')).toEqual(null);
    // 1 pm (13:00)
    expect(parseTime('1 pm')).toEqual({
      hours: 13,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    // 12 pm (12:00)
    expect(parseTime('12 pm')).toEqual({
      hours: 12,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    // 11 pm (23:00)
    expect(parseTime('11 pm')).toEqual({
      hours: 23,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    // 12:30 pm (12:30)
    expect(parseTime('12:30 pm')).toEqual({
      hours: 12,
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    });
  });

  it('should work with 24h times', () => {
    expect(parseTime('0:00')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    expect(parseTime('12:00')).toEqual({
      hours: 12,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    expect(parseTime('23:59')).toEqual({
      hours: 23,
      minutes: 59,
      seconds: 0,
      milliseconds: 0,
    });
    expect(parseTime('23:59:34.010')).toEqual({
      hours: 23,
      minutes: 59,
      seconds: 34,
      milliseconds: 10,
    });
    expect(parseTime('23:59:34.001')).toEqual({
      hours: 23,
      minutes: 59,
      seconds: 34,
      milliseconds: 1,
    });
    expect(parseTime('23:59:34.1')).toEqual({
      hours: 23,
      minutes: 59,
      seconds: 34,
      milliseconds: 100,
    });
  });

  it('should work with some invalid 24:00 time for convenience', () => {
    expect(parseTime('24:00')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    expect(parseTime('24:30')).toEqual(null);
  });
});

const baseProps = { value: '', onChange: () => {}, timeZone: 'UTC' };

class TestComponent extends React.Component {
  state = {
    value: '',
  };
  handleChange = value => {
    this.setState({ value });
  };
  render() {
    return (
      <div>
        <label htmlFor="some-id">Date</label>
        <DateTimeInput
          {...baseProps}
          id="some-id"
          name="some-name"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div data-testid="value">{this.state.value}</div>
      </div>
    );
  }
}

describe('DateTimeInput', () => {
  it('should forward data-attributes', () => {
    const { container } = render(
      <DateTimeInput {...baseProps} data-foo="bar" />
    );
    expect(container.querySelector('[data-foo="bar"]')).toBeTruthy();
  });

  it('should have an HTML name', () => {
    const { container } = render(<DateTimeInput {...baseProps} name="foo" />);
    expect(container.querySelector('[name="foo"]')).toBeTruthy();
  });

  it('should allow changing the value by typing in english', () => {
    const { getByLabelText, getByTestId } = render(<TestComponent />);
    const event = { target: { value: '09/18/2018 at 4:15pm' } };
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(getByTestId('value')).toHaveTextContent('2018-09-18T16:15:00.000Z');
  });

  it('should allow changing the value by typing in german', () => {
    const { getByLabelText, getByTestId } = render(<TestComponent />, {
      locale: 'de',
    });
    // We don't have i18n translations in tests, so we need to use "at" instead
    // of "um" as that is from the core translations which are used in tests.
    const event = { target: { value: '18.09.2018 at 14:30' } };
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(getByTestId('value')).toHaveTextContent('2018-09-18T14:30:00.000Z');
  });

  it('should allow changing the value by partially typing "today"', () => {
    const { getByLabelText, getByTestId } = render(<TestComponent />);
    const event = { target: { value: 'tod' } };
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });

    // create date without timezone
    const today = new Date();
    today.setHours(0);
    today.setMinutes(-1 * today.getTimezoneOffset());
    today.setSeconds(0);
    today.setMilliseconds(0);

    const value = new Date(getByTestId('value').textContent);
    expect(value).toEqual(today);
  });

  it('should call onFocus when the input is focused', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <DateTimeInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    expect(onFocus).toHaveBeenCalled();
  });

  it('should call onBlur when input loses focus', () => {
    const onBlur = jest.fn();
    const { container } = render(
      <DateTimeInput {...baseProps} onBlur={onBlur} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
    expect(onBlur).toHaveBeenCalled();
  });

  it('should have focus automatically when isAutofocussed is passed', () => {
    const { container } = render(
      <DateTimeInput {...baseProps} isAutofocussed />
    );
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should not have focus automatically when isAutofocussed is not passed', () => {
    const { container } = render(<DateTimeInput {...baseProps} />);
    expect(container.querySelector('input')).not.toHaveFocus();
  });
});
