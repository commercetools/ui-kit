import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import { render, fireEvent } from '../../../test-utils';
import DateTimeCalendar from './date-time-calendar';

// This component is used to enable easy testing.
// It overwrites the onChange function and places a label for the
// input component. It also ensures an id so that the label can associate
// the input. This allows tests to use getByLabelText.
// It also makes sure the event's value passed to onChange flows back to the
// component so that we can test it under real conditions.
// As a convenience, we enable accessing a mocked onChange function.
class Story extends React.Component {
  static displayName = 'Story';
  static propTypes = {
    onEvent: PropTypes.func.isRequired,
    value: PropTypes.string,
    id: PropTypes.string,
  };
  static defaultProps = {
    id: 'date-time-input',
  };
  state = {
    value: this.props.value || '',
  };
  handleChange = event => {
    this.props.onEvent(event);
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>Date</label>
        <DateTimeCalendar
          id={this.props.id}
          timeZone="UTC"
          {...omit(this.props, 'onEvent')}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderDateTimeCalendar = (props, options) => {
  const onChange = jest.fn();
  return {
    onChange,
    ...render(<Story onEvent={onChange} {...props} />, options),
  };
};

it('should render an input', () => {
  const { getByLabelText } = renderDateTimeCalendar();
  expect(getByLabelText('Date')).toBeTruthy();
});

it('should forward data-attributes', () => {
  const { container } = renderDateTimeCalendar({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeTruthy();
});

it('should have an HTML name', () => {
  const { container } = renderDateTimeCalendar({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeTruthy();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { container } = renderDateTimeCalendar({ onFocus });
  container.querySelector('input').focus();
  expect(container.querySelector('input')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { container } = renderDateTimeCalendar({ onBlur });
  container.querySelector('input').focus();
  expect(container.querySelector('input')).toHaveFocus();
  container.querySelector('input').blur();
  expect(container.querySelector('input')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderDateTimeCalendar({ isDisabled: true });
    expect(getByLabelText('Date')).toHaveAttribute('disabled');
  });
});

describe('when locale is "en"', () => {
  it('should allow changing the value by typing a date in an american format', () => {
    const { getByLabelText, onChange } = renderDateTimeCalendar();
    const event = { target: { value: '09/18/2018 3pm' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: 'date-time-input',
        name: undefined,
        value: '2018-09-18T15:00:00.000Z',
      },
    });
  });
});

describe('when locale is "de"', () => {
  it('should allow changing the value by typing a date in a german format', () => {
    const { getByLabelText, onChange } = renderDateTimeCalendar(
      {},
      { locale: 'de' }
    );
    const event = { target: { value: '18.9.2018 15:00' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: 'date-time-input',
        name: undefined,
        value: '2018-09-18T15:00:00.000Z',
      },
    });
  });
});
