import { Component, act } from 'react';
import PropTypes from 'prop-types';
import { screen, render, fireEvent } from '../../../../../test/test-utils';
import DateRangeInput from './date-range-input';

// This component is used to enable easy testing.
// It overwrites the onChange function and places a label for the
// input component. It also ensures an id so that the label can associate
// the input. This allows tests to use getByLabelText.
// It also makes sure the event's value passed to onChange flows back to the
// component so that we can test it under real conditions.
// As a convenience, we enable accessing a mocked onChange function.
class Story extends Component {
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
  it('should return true when called with an empty range', async () => {
    expect(DateRangeInput.isEmpty([])).toBe(true);
  });
  it('should return false when called with a range', async () => {
    expect(DateRangeInput.isEmpty(['2018-09-20', '2018-09-20'])).toBe(false);
    expect(DateRangeInput.isEmpty(['2018-09-20', '2018-09-24'])).toBe(false);
  });
});

it('should render an input', async () => {
  const { getByLabelText } = renderDateRangeInput();
  expect(getByLabelText('Date')).toBeTruthy();
});

it('should forward data-attributes', async () => {
  const { container } = renderDateRangeInput({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeTruthy();
});

it('should have an HTML name', async () => {
  const { container } = renderDateRangeInput({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeTruthy();
});

it('should call onFocus when the input is focused', async () => {
  const onFocus = jest.fn();
  const { container } = renderDateRangeInput({ onFocus });
  await act(async () => container.querySelector('input').focus());
  expect(container.querySelector('input')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', async () => {
  const onBlur = jest.fn();
  const { container } = renderDateRangeInput({ onBlur });
  await act(async () => container.querySelector('input').focus());
  expect(container.querySelector('input')).toHaveFocus();
  await act(async () => container.querySelector('input').blur());
  expect(container.querySelector('input')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderDateRangeInput({ isDisabled: true });
    expect(getByLabelText('Date')).toBeDisabled();
  });
});

describe('when `isClearable` is true', () => {
  it('should allow clearing input with keyboard', async () => {
    const onChange = jest.fn();
    const { queryByLabelText, findByLabelText } = renderDateRangeInput({
      onChange,
    });
    const event = { target: { value: '09/18/2018 - 09/20/2018' } };
    const dateInput = await findByLabelText('Date');
    fireEvent.click(dateInput);
    fireEvent.change(dateInput, event);
    fireEvent.keyDown(dateInput, { key: 'Enter' });
    fireEvent.keyUp(dateInput, { key: 'Enter' });

    const clearEvent = { target: { value: '' } };
    const dateInput2 = await findByLabelText('Date');
    fireEvent.click(dateInput2);
    fireEvent.change(dateInput2, clearEvent);
    fireEvent.keyDown(dateInput2, { key: 'Enter' });
    fireEvent.keyUp(dateInput2, { key: 'Enter' });

    expect(queryByLabelText('clear')).not.toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: 'date-range-input',
        name: undefined,
        value: [],
      },
    });
  });
  it('should allow clearing the input with icon button', async () => {
    const onChange = jest.fn();
    const { queryByLabelText, findByLabelText } = renderDateRangeInput({
      onChange,
    });
    const event = { target: { value: '09/18/2018 - 09/20/2018' } };
    const dateInput = await findByLabelText('Date');
    fireEvent.click(dateInput);
    fireEvent.change(dateInput, event);
    fireEvent.keyDown(dateInput, { key: 'Enter' });
    fireEvent.keyUp(dateInput, { key: 'Enter' });

    const clearableInput = await findByLabelText('clear');

    fireEvent.click(clearableInput);
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
    fireEvent.click(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });

    const clearEvent = { target: { value: '' } };
    fireEvent.click(getByLabelText('Date'));
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
    fireEvent.click(getByLabelText('Date'));
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
    fireEvent.click(getByLabelText('Date'));
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
    fireEvent.click(getByLabelText('Date'));
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

it('should open the date picker on clicking', async () => {
  renderDateRangeInput({ value: ['2020-09-10', '2020-09-20'] });

  const dateInput = screen.getByLabelText('Date');

  fireEvent.click(dateInput);

  expect(screen.getByText('September')).toBeInTheDocument();
});

it('should not open the date picker just by gaining focus', () => {
  renderDateRangeInput({ value: ['2020-09-10', '2020-09-20'] });

  const dateInput = screen.getByLabelText('Date');

  // just focusing won't open the date picker
  fireEvent.focus(dateInput);
  expect(screen.queryByText('September')).not.toBeInTheDocument();
});

describe('date picker keyboard navigation', () => {
  it('should move to next month when pressing ArrowDown through current month', () => {
    renderDateRangeInput({ value: ['2020-09-10', '2020-09-20'] });

    const dateRangeInput = screen.getByLabelText('Date');

    fireEvent.click(dateRangeInput);

    expect(screen.getByText('September')).toBeInTheDocument();

    // DateRangePicker highlights the first day of the month of the start of the range
    // Therefore, we only need to press ArrowDown at least 30 times in September
    let idx = 0;
    while (idx <= 30) {
      fireEvent.keyDown(dateRangeInput, { keyCode: 40 });
      idx += 1;
    }

    expect(screen.queryByText('September')).not.toBeInTheDocument();
    expect(screen.getByText('October')).toBeInTheDocument();
  });
  it('should move to previous month when pressing ArrowUp through the current month', () => {
    renderDateRangeInput({ value: ['2020-09-10', '2020-09-20'] });

    const dateRangeInput = screen.getByLabelText('Date');

    fireEvent.click(dateRangeInput);

    expect(screen.getByText('September')).toBeInTheDocument();

    // DateRangePicker highlights the first day of the month of the start of the range
    // therefore, we only need to press ArrowUp once
    fireEvent.keyDown(dateRangeInput, { keyCode: 38 });

    expect(screen.queryByText('September')).not.toBeInTheDocument();
    expect(screen.getByText('August')).toBeInTheDocument();
  });
});
