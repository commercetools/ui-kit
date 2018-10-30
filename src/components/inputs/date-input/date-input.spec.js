import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import DateInput from './date-input';

const baseProps = { value: '', onChange: () => {} };

describe('DateInput', () => {
  it('should forward data-attributes', () => {
    const { container } = render(<DateInput {...baseProps} data-foo="bar" />);
    expect(container.querySelector('[data-foo="bar"]')).toBeTruthy();
  });

  it('should have an HTML name', () => {
    const { container } = render(<DateInput {...baseProps} name="foo" />);
    expect(container.querySelector('[name="foo"]')).toBeTruthy();
  });

  it('should call onChange when chaning the value by typing', () => {
    const onChange = jest.fn(value => {
      expect(value).toEqual('2018-10-01');
    });
    const { getByLabelText } = render(
      <div>
        <label htmlFor="some-id">Date</label>
        <DateInput
          {...baseProps}
          id="some-id"
          name="some-name"
          onChange={onChange}
        />
      </div>
    );
    const event = { target: { value: '18.09.2018' } };
    fireEvent.change(getByLabelText('Date'), event);
    fireEvent.keyDown(getByLabelText('Date'), { key: 'Enter' });
    fireEvent.keyUp(getByLabelText('Date'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalled();
  });

  it('should call onFocus when the input is focused', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <DateInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should call onBlur when input loses focus', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <DateInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
  });

  it('should have focus automatically when isAutofocussed is passed', () => {
    const { container } = render(<DateInput {...baseProps} isAutofocussed />);
    expect(container.querySelector('input')).toHaveFocus();
  });
});
