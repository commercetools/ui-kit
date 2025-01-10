import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  screen,
  render,
  fireEvent,
  waitFor,
} from '../../../../../test/test-utils';
import DateInput from './date-input';

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
    value: PropTypes.string,
    id: PropTypes.string,
  };
  static defaultProps = {
    id: 'date-input',
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
        <DateInput
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderDateInput = (props, options) =>
  render(<Story {...props} />, options);

it('should render an input', () => {
  const { getByLabelText } = renderDateInput();
  expect(getByLabelText('Date')).toBeTruthy();
});

it('should forward data-attributes', () => {
  const { container } = renderDateInput({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeTruthy();
});

it('should have an HTML name', () => {
  const { container } = renderDateInput({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeTruthy();
});

it('should call onFocus when the input is focused', async () => {
  const onFocus = jest.fn();
  const { container } = renderDateInput({ onFocus });
  await fireEvent.asyncFocus(container.querySelector('input'));
  expect(container.querySelector('input')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', async () => {
  const onBlur = jest.fn();
  const { container } = renderDateInput({ onBlur });
  await fireEvent.asyncFocus(container.querySelector('input'));
  expect(container.querySelector('input')).toHaveFocus();
  await fireEvent.asyncBlur(container.querySelector('input'));
  expect(container.querySelector('input')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderDateInput({ isDisabled: true });
    expect(getByLabelText('Date')).toBeDisabled();
  });
});

describe('when locale is "en"', () => {
  it('should allow changing the value by typing a date in an american format', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderDateInput({ onChange });
    const event = { target: { value: '09/18/2018' } };
    fireEvent.click(getByLabelText('Date'));
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
    const onChange = jest.fn();
    const { getByLabelText } = renderDateInput({ onChange }, { locale: 'de' });
    const event = { target: { value: '18.9.2018' } };
    fireEvent.click(getByLabelText('Date'));
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith({
      target: { id: 'date-input', name: undefined, value: '2018-09-18' },
    });
  });
});

it('should open the date picker on clicking', () => {
  renderDateInput({ value: '2020-09-15' });

  const dateInput = screen.getByLabelText('Date');

  fireEvent.click(dateInput);

  expect(screen.getByText('September')).toBeInTheDocument();
});

it('should not open the date picker just by gaining focus', () => {
  renderDateInput({ value: '2020-09-15' });

  const dateInput = screen.getByLabelText('Date');

  // just focusing won't open the date picker
  fireEvent.focus(dateInput);
  expect(screen.queryByText('September')).not.toBeInTheDocument();
});

describe('date picker keyboard navigation', () => {
  it('should move to next month when pressing ArrowDown with last day of month highlighted', () => {
    renderDateInput({ value: '2020-09-30' });

    const dateInput = screen.getByLabelText('Date');

    fireEvent.click(dateInput);

    expect(screen.getByText('September')).toBeInTheDocument();

    // ArrowDown
    fireEvent.keyDown(dateInput, { keyCode: 40 });

    expect(screen.queryByText('September')).not.toBeInTheDocument();
    expect(screen.getByText('October')).toBeInTheDocument();
  });
  it('should move to previous month when pressing ArrowUp with first day of month highlighted', () => {
    renderDateInput({ value: '2020-09-01' });

    const dateInput = screen.getByLabelText('Date');

    fireEvent.click(dateInput);

    expect(screen.getByText('September')).toBeInTheDocument();

    // ArrowUp
    fireEvent.keyDown(dateInput, { keyCode: 38 });

    expect(screen.queryByText('September')).not.toBeInTheDocument();
    expect(screen.getByText('August')).toBeInTheDocument();
  });
  describe('when there are min or max date values', () => {
    it('should not move to next month if it is after the max value', () => {
      renderDateInput({ value: '2020-09-30', maxValue: '2020-09-30' });

      const dateInput = screen.getByLabelText('Date');

      fireEvent.click(dateInput);

      expect(screen.getByText('September')).toBeInTheDocument();

      // ArrowDown
      fireEvent.keyDown(dateInput, { keyCode: 40 });

      expect(screen.getByText('September')).toBeInTheDocument();
      expect(screen.queryByText('October')).not.toBeInTheDocument();
    });
    it('should not move to previous month if it is before the min value', () => {
      renderDateInput({ value: '2020-09-01', minValue: '2020-09-01' });

      const dateInput = screen.getByLabelText('Date');

      fireEvent.click(dateInput);

      expect(screen.getByText('September')).toBeInTheDocument();

      // ArrowDown
      fireEvent.keyDown(dateInput, { keyCode: 38 });

      expect(screen.getByText('September')).toBeInTheDocument();
      expect(screen.queryByText('August')).not.toBeInTheDocument();
    });
  });
  describe('Accept all valid date inputs', () => {
    it('should select date, for any valid day, month or year', () => {
      const onChange = jest.fn();
      const { getByLabelText } = renderDateInput({ onChange });

      const date = '12/12/2022';

      fireEvent.click(getByLabelText('Date'));

      // Simulate the fired event for every character typed into the input field.
      for (let i in date) {
        fireEvent.change(getByLabelText('Date'), {
          target: { value: date.slice(0, i + 1) },
        });
      }
      fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
      fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
      fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith({
        target: { id: 'date-input', name: undefined, value: '2022-12-12' },
      });
    });
  });
});

it('should only emit valid dates from manually entered datestrings', async () => {
  // Render the input with an initial value
  renderDateInput({ value: '2020-09-15', 'data-testid': 'onblurtest' });
  const htmlInputElement = screen.getByTestId('onblurtest');

  // verify it got formatted for display
  await waitFor(() =>
    expect(htmlInputElement).toHaveDisplayValue('09/15/2020')
  );

  // enter a valid formatted date
  await fireEvent.change(htmlInputElement, { target: { value: '03/28/2024' } });
  await fireEvent.blur(htmlInputElement);

  // no change is expected
  await waitFor(() =>
    expect(htmlInputElement).toHaveDisplayValue('03/28/2024')
  );

  // enter an invalid date
  await fireEvent.change(htmlInputElement, { target: { value: '33/28/2024' } });
  await fireEvent.blur(htmlInputElement);

  // should reset to the most recent valid date
  await waitFor(() =>
    expect(htmlInputElement).toHaveDisplayValue('03/28/2024')
  );
});
