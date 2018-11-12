import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import DateRangeInput from './date-range-input';

const baseProps = { value: ['', ''], onChange: () => {} };

class TestComponent extends React.Component {
  state = {
    value: [],
  };
  handleChange = value => {
    this.setState({ value });
  };
  render() {
    return (
      <div>
        <label htmlFor="some-id">Date</label>
        <DateRangeInput
          {...baseProps}
          id="some-id"
          name="some-name"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div data-testid="value">{this.state.value.join(' - ')}</div>
      </div>
    );
  }
}

describe('DateRangeInput', () => {
  it('should forward data-attributes', () => {
    const { container } = render(
      <DateRangeInput {...baseProps} data-foo="bar" />
    );
    expect(container.querySelector('[data-foo="bar"]')).toBeTruthy();
  });

  it('should have an HTML name', () => {
    const { container } = render(<DateRangeInput {...baseProps} name="foo" />);
    expect(container.querySelector('[name="foo"]')).toBeTruthy();
  });

  it('should allow changing the value by typing a date in an american format', () => {
    const { getByLabelText, getByTestId } = render(<TestComponent />);
    const event = { target: { value: '09/18/2018 - 09/20/2018' } };
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(getByTestId('value')).toHaveTextContent(
      '2018-09-18T00:00:00.000Z - 2018-09-20T00:00:00.000Z'
    );
  });

  it('should allow changing the value by typing a date range in a german format', () => {
    const { getByLabelText, getByTestId } = render(<TestComponent />, {
      locale: 'de',
    });
    const event = { target: { value: '18.09.2018 - 20.09.2018' } };
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(getByTestId('value')).toHaveTextContent(
      '2018-09-18T00:00:00.000Z - 2018-09-20T00:00:00.000Z'
    );
  });

  it('should call onFocus when the input is focused', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <DateRangeInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    expect(onFocus).toHaveBeenCalled();
  });

  it('should call onBlur when input loses focus', () => {
    const onBlur = jest.fn();
    const { container } = render(
      <DateRangeInput {...baseProps} onBlur={onBlur} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
    expect(onBlur).toHaveBeenCalled();
  });

  it('should have focus automatically when isAutofocussed is passed', () => {
    const { container } = render(
      <DateRangeInput {...baseProps} isAutofocussed />
    );
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should not have focus automatically when isAutofocussed is not passed', () => {
    const { container } = render(<DateRangeInput {...baseProps} />);
    expect(container.querySelector('input')).not.toHaveFocus();
  });
});
