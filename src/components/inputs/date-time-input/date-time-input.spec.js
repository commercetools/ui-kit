import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../test-utils';
import DateTimeInput from './date-time-input';

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
    onChange: PropTypes.func,
    value: PropTypes.string,
    id: PropTypes.string,
  };
  static defaultProps = {
    id: 'date-time-input',
  };
  state = {
    value: this.props.value || '',
  };
  handleChange = (event) => {
    if (this.props.onChange) this.props.onChange(event);
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>Date</label>
        <DateTimeInput
          timeZone="UTC"
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderDateTimeInput = (props, options) =>
  render(<Story {...props} />, options);

it('should render an input', () => {
  const { getByLabelText } = renderDateTimeInput();
  expect(getByLabelText('Date')).toBeTruthy();
});

it('should forward data-attributes', () => {
  const { container } = renderDateTimeInput({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeTruthy();
});

it('should have an HTML name', () => {
  const { container } = renderDateTimeInput({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeTruthy();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { container } = renderDateTimeInput({ onFocus });
  container.querySelector('input').focus();
  expect(container.querySelector('input')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { container } = renderDateTimeInput({ onBlur });
  container.querySelector('input').focus();
  expect(container.querySelector('input')).toHaveFocus();
  container.querySelector('input').blur();
  expect(container.querySelector('input')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderDateTimeInput({ isDisabled: true });
    expect(getByLabelText('Date')).toHaveAttribute('disabled');
  });
});

describe('when locale is "en"', () => {
  it('should allow changing the value by typing a date in an american format', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderDateTimeInput({ onChange });
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
    const onChange = jest.fn();
    const { getByLabelText } = renderDateTimeInput(
      { onChange },
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
