import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import { render, fireEvent } from '../../../test-utils';
import DateCalendar from './date-calendar';

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
    id: 'date-input',
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
        <DateCalendar
          id={this.props.id}
          {...omit(this.props, 'onEvent')}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderDateCalendar = (props, options) => {
  const onChange = jest.fn();
  return {
    onChange,
    ...render(<Story onEvent={onChange} {...props} />, options),
  };
};

it('should render an input', () => {
  const { getByLabelText } = renderDateCalendar();
  expect(getByLabelText('Date')).toBeTruthy();
});

it('should forward data-attributes', () => {
  const { container } = renderDateCalendar({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeTruthy();
});

it('should have an HTML name', () => {
  const { container } = renderDateCalendar({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeTruthy();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { container } = renderDateCalendar({ onFocus });
  container.querySelector('input').focus();
  expect(container.querySelector('input')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { container } = renderDateCalendar({ onBlur });
  container.querySelector('input').focus();
  expect(container.querySelector('input')).toHaveFocus();
  container.querySelector('input').blur();
  expect(container.querySelector('input')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderDateCalendar({ isDisabled: true });
    expect(getByLabelText('Date')).toHaveAttribute('disabled');
  });
});

describe('when locale is "en"', () => {
  it('should allow changing the value by typing a date in an american format', () => {
    const { getByLabelText, onChange } = renderDateCalendar();
    const event = { target: { value: '09/18/2018' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith({
      target: { id: 'date-input', name: undefined, value: '2018-09-18' },
    });
  });
});

describe('when locale is "de"', () => {
  it('should allow changing the value by typing a date in a german format', () => {
    const { getByLabelText, onChange } = renderDateCalendar(
      {},
      { locale: 'de' }
    );
    const event = { target: { value: '18.9.2018' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith({
      target: { id: 'date-input', name: undefined, value: '2018-09-18' },
    });
  });
});
