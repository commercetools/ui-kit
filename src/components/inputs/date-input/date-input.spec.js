import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import DateInput from './date-input';

const baseProps = { value: '', onChange: () => {} };

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
        <DateInput
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

describe('DateInput', () => {
  it('should forward data-attributes', () => {
    const { container } = render(<DateInput {...baseProps} data-foo="bar" />);
    expect(container.querySelector('[data-foo="bar"]')).toBeTruthy();
  });

  it('should have an HTML name', () => {
    const { container } = render(<DateInput {...baseProps} name="foo" />);
    expect(container.querySelector('[name="foo"]')).toBeTruthy();
  });

  it('should allow changing the value by typing in english', () => {
    const { getByLabelText, getByTestId } = render(<TestComponent />);
    const event = { target: { value: '09/18/2018' } };
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(getByTestId('value')).toHaveTextContent('2018-09-18');
  });

  it('should allow changing the value by typing in german', () => {
    const { getByLabelText, getByTestId } = render(<TestComponent />, {
      locale: 'de',
    });
    const event = { target: { value: '18.09.2018' } };
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(getByTestId('value')).toHaveTextContent('2018-09-18');
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
      <DateInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    expect(onFocus).toHaveBeenCalled();
  });

  it('should call onBlur when input loses focus', () => {
    const onBlur = jest.fn();
    const { container } = render(<DateInput {...baseProps} onBlur={onBlur} />);
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
    expect(onBlur).toHaveBeenCalled();
  });

  it('should have focus automatically when isAutofocussed is passed', () => {
    const { container } = render(<DateInput {...baseProps} isAutofocussed />);
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should not have focus automatically when isAutofocussed is not passed', () => {
    const { container } = render(<DateInput {...baseProps} />);
    expect(container.querySelector('input')).not.toHaveFocus();
  });
});
