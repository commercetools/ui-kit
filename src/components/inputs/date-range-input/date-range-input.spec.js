import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../../test/test-utils';
import DateRangeInput from './date-range-input';

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
    value: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
  };
  static defaultProps = {
    id: 'date-range-input',
  };
  state = {
    value: this.props.value || [],
  };
  handleChange = (event) => {
    if (this.props.onChange) this.props.onChange(event);
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>Date</label>
        <DateRangeInput
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderDateRangeInput = (props, options) =>
  render(<Story {...props} />, options);

describe('DateRangeInput.isEmpty', () => {
  it('should return true when called with an empty range', () => {
    expect(DateRangeInput.isEmpty([])).toBe(true);
  });
  it('should return false when called with a range', () => {
    expect(DateRangeInput.isEmpty(['2018-09-20', '2018-09-20'])).toBe(false);
    expect(DateRangeInput.isEmpty(['2018-09-20', '2018-09-24'])).toBe(false);
  });
});

it('should render an input', () => {
  const { getByLabelText } = renderDateRangeInput();
  expect(getByLabelText('Date')).toBeTruthy();
});

it('should forward data-attributes', () => {
  const { container } = renderDateRangeInput({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeTruthy();
});

it('should have an HTML name', () => {
  const { container } = renderDateRangeInput({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeTruthy();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { container } = renderDateRangeInput({ onFocus });
  container.querySelector('input').focus();
  expect(container.querySelector('input')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { container } = renderDateRangeInput({ onBlur });
  container.querySelector('input').focus();
  expect(container.querySelector('input')).toHaveFocus();
  container.querySelector('input').blur();
  expect(container.querySelector('input')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderDateRangeInput({ isDisabled: true });
    expect(getByLabelText('Date')).toHaveAttribute('disabled');
  });
});

describe('when `isClearable` is true', () => {
  it('should allow clearing input with keyboard', () => {
    const onChange = jest.fn();
    const { queryByLabelText, getByLabelText } = renderDateRangeInput({
      onChange,
    });
    const event = { target: { value: '09/18/2018 - 09/20/2018' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });

    const clearEvent = { target: { value: '' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), clearEvent);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });

    expect(queryByLabelText('clear')).not.toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: 'date-range-input',
        name: undefined,
        value: [],
      },
    });
  });
  it('should allow clearing the input with icon button', () => {
    const onChange = jest.fn();
    const { queryByLabelText, getByLabelText } = renderDateRangeInput({
      onChange,
    });
    const event = { target: { value: '09/18/2018 - 09/20/2018' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });

    expect(getByLabelText('clear')).toBeInTheDocument();

    getByLabelText('clear').click();
    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: 'date-range-input',
        name: undefined,
        value: ['2018-09-18', '2018-09-20'],
      },
    });

    expect(queryByLabelText('clear')).not.toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: 'date-range-input',
        name: undefined,
        value: [],
      },
    });
  });
});

describe('when `isClearable` is false', () => {
  it('should not allow clearing input with keyboard', () => {
    const onChange = jest.fn();
    const { queryByLabelText, getByLabelText } = renderDateRangeInput({
      onChange,
      isClearable: false,
    });
    const event = { target: { value: '09/18/2018 - 09/20/2018' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });

    const clearEvent = { target: { value: '' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), clearEvent);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });

    expect(queryByLabelText('clear')).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalledWith({
      target: {
        id: 'date-range-input',
        name: undefined,
        value: [],
      },
    });
  });

  it('should not allow clearing the input', () => {
    const onChange = jest.fn();
    const { queryByLabelText, getByLabelText } = renderDateRangeInput({
      onChange,
      isClearable: false,
    });
    const event = { target: { value: '09/18/2018 - 09/20/2018' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });

    expect(queryByLabelText('clear')).not.toBeInTheDocument();
  });
});

describe('when locale is "en"', () => {
  it('should allow changing the value by typing a date in an american format', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderDateRangeInput({ onChange });
    const event = { target: { value: '09/18/2018 - 09/20/18' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: 'date-range-input',
        name: undefined,
        value: ['2018-09-18', '2018-09-20'],
      },
    });
  });
});

describe('when locale is "de"', () => {
  it('should allow changing the value by typing a date in a german format', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderDateRangeInput(
      { onChange },
      { locale: 'de' }
    );
    const event = { target: { value: '18.9.2018 - 20.9.18' } };
    fireEvent.focus(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: 'date-range-input',
        name: undefined,
        value: ['2018-09-18', '2018-09-20'],
      },
    });
  });
});
