import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import DateRangeInput from './date-range-input';

const baseProps = { value: ['', ''], onChange: () => {} };

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

  it('should call onChange when chaning the value by typing', () => {
    const onChange = jest.fn(value => {
      expect(value).toEqual('2018-10-01');
    });
    const { getByLabelText } = render(
      <div>
        <label htmlFor="some-id">Date</label>
        <DateRangeInput
          {...baseProps}
          id="some-id"
          name="some-name"
          onChange={onChange}
        />
      </div>
    );
    const event = { target: { value: '18.09.2018 - 20.09.2018' } };
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalled();
  });

  it('should call onFocus when the input is focused', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <DateRangeInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should call onBlur when input loses focus', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <DateRangeInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
  });

  it('should have focus automatically when isAutofocussed is passed', () => {
    const { container } = render(
      <DateRangeInput {...baseProps} isAutofocussed />
    );
    expect(container.querySelector('input')).toHaveFocus();
  });
});
