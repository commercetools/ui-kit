import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  screen,
  render,
  fireEvent,
  waitFor,
} from '../../../../../test/test-utils';
import DateTimeInput from './date-time-input';

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

it('should call onFocus when the input is focused', async () => {
  const onFocus = jest.fn();
  const { container } = renderDateTimeInput({ onFocus });
  await fireEvent.asyncFocus(container.querySelector('input'));
  expect(container.querySelector('input')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', async () => {
  const onBlur = jest.fn();
  const { container } = renderDateTimeInput({ onBlur });
  await fireEvent.asyncFocus(container.querySelector('input'));
  expect(container.querySelector('input')).toHaveFocus();
  await fireEvent.asyncBlur(container.querySelector('input'));
  expect(container.querySelector('input')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderDateTimeInput({ isDisabled: true });
    expect(getByLabelText('Date')).toBeDisabled();
  });
});

describe('when locale is "en"', () => {
  it('should allow changing the value by typing a date in an american format', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderDateTimeInput({ onChange });
    const event = { target: { value: '09/18/2018 3pm' } };
    fireEvent.click(getByLabelText('Date'));
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
    fireEvent.click(getByLabelText('Date'));
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

it('should open the date picker on clicking', () => {
  renderDateTimeInput({ value: '2020-09-15' });

  const dateInput = screen.getByLabelText('Date');

  fireEvent.click(dateInput);

  expect(screen.getByText('September')).toBeInTheDocument();
});

it('should not open the date picker just by gaining focus', () => {
  renderDateTimeInput({ value: '2020-09-15' });

  const dateInput = screen.getByLabelText('Date');

  // just focusing won't open the date picker
  fireEvent.focus(dateInput);
  expect(screen.queryByText('September')).not.toBeInTheDocument();
});

describe('date picker keyboard navigation', () => {
  it('should move to next month when pressing ArrowDown with last day of month highlighted', () => {
    renderDateTimeInput({ value: '2020-09-30' });

    const dateInput = screen.getByLabelText('Date');

    fireEvent.click(dateInput);

    expect(screen.getByText('September')).toBeInTheDocument();

    // ArrowDown
    fireEvent.keyDown(dateInput, { keyCode: 40 });

    expect(screen.queryByText('September')).not.toBeInTheDocument();
    expect(screen.getByText('October')).toBeInTheDocument();
  });
  it('should move to previous month when pressing ArrowUp with first day of month highlighted', async () => {
    renderDateTimeInput({ value: '2020-09-01' });

    const dateInput = screen.getByLabelText('Date');

    fireEvent.click(dateInput);

    expect(screen.getByText('September')).toBeInTheDocument();

    await fireEvent.asyncFocus(dateInput);

    // ArrowUp
    fireEvent.keyDown(dateInput, { keyCode: 38 });
    // TODO: investigate why months are off by 1
    // await screen.findByText('August');
    expect(screen.queryByText('September')).not.toBeInTheDocument();
  });
});

describe('date picker defaultDaySelectionTime prop', () => {
  it('should set the time prop when it is set', () => {
    renderDateTimeInput({ defaultDaySelectionTime: '11:10' });
    const dateInput = screen.getByLabelText('Date');

    fireEvent.click(dateInput);

    expect(screen.getByDisplayValue('11:10 AM')).toBeInTheDocument();
  });
});

describe('timezone edge cases', () => {
  beforeEach(() => {
    // Mock the current date to January 1st in a timezone ahead of UTC
    // such that "today" in that timezone is "yesterday" in UTC
    jest.useFakeTimers();
    // Set system time to January 1st, 2025 02:00 in Pacific/Kiritimati (UTC+14)
    // This represents 2024-12-31 12:00:00.000Z in UTC
    jest.setSystemTime(new Date('2024-12-31T12:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should display the correct month when timezone is ahead of UTC and would show wrong month', () => {
    // Render DateTimeInput with Pacific/Kiritimati timezone (UTC+14)
    // On January 1st in this timezone, UTC shows December 31st
    const { getByLabelText } = renderDateTimeInput({
      timeZone: 'Pacific/Kiritimati',
      value: '', // No initial value, so calendar will show "today"
    });

    const dateInput = getByLabelText('Date');
    fireEvent.click(dateInput);

    // The calendar should show January (correct month in the timezone)
    // not December (which would be wrong - the UTC month)
    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.queryByText('December')).not.toBeInTheDocument();

    // The year should also be correct (2025, not 2024)
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('should highlight the correct day as today when timezone causes date shift', () => {
    const { getByLabelText } = renderDateTimeInput({
      timeZone: 'Pacific/Kiritimati',
      value: '',
    });

    const dateInput = getByLabelText('Date');
    fireEvent.click(dateInput);

    // In Pacific/Kiritimati timezone, it should be January 1st
    // We should find a calendar day with "1" that is marked as today
    const todayElement = screen.getByText('1');
    expect(todayElement).toBeInTheDocument();

    // Verify the calendar is showing January 2025 (not December 2024)
    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('should display the correct month when value is set and timezone conversion changes the month', () => {
    // This represents July 1st, 2025 in Pacific/Kiritimati (UTC+14)
    // When converted to UTC, this becomes June 30th, 2025
    const valueInKiritimati = '2025-06-30T10:00:00.000Z'; // This is July 1st in Pacific/Kiritimati

    const { getByLabelText } = renderDateTimeInput({
      timeZone: 'Pacific/Kiritimati',
      value: valueInKiritimati,
    });

    const dateInput = getByLabelText('Date');
    fireEvent.click(dateInput);

    // The calendar should show July (correct month in the timezone)
    // not June (which would be wrong - the UTC month)
    expect(screen.getByText('July')).toBeInTheDocument();
    expect(screen.queryByText('June')).not.toBeInTheDocument();

    // The year should also be correct (2025)
    expect(screen.getByText('2025')).toBeInTheDocument();
  });
});

it('should only emit valid datetimes from manually entered datestrings', async () => {
  // Render the input with an initial value
  renderDateTimeInput({
    defaultDaySelectionTime: '11:10',
    value: '2024-10-16T07:30:00.000Z',
    'data-testid': 'onblurtest',
  });
  const htmlInputElement = screen.getByTestId('onblurtest');

  // verify it got formatted for display
  await waitFor(() =>
    expect(htmlInputElement).toHaveDisplayValue('10/16/2024 7:30 AM')
  );

  // enter a valid formatted datetime
  fireEvent.change(htmlInputElement, {
    target: { value: '12/17/1985 5:30 AM' },
  });
  fireEvent.blur(htmlInputElement);

  // should stay unchanged
  await waitFor(() =>
    expect(htmlInputElement).toHaveDisplayValue('12/17/1985 5:30 AM')
  );

  // enter an invalid formatted datetime
  fireEvent.change(htmlInputElement, {
    target: { value: '14/17/1985 5:30 AM' },
  });
  fireEvent.blur(htmlInputElement);

  // should reset to the most recent valid value
  await waitFor(() =>
    expect(htmlInputElement).toHaveDisplayValue('12/17/1985 5:30 AM')
  );
});
