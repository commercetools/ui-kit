import React from 'react';
import TimeInput from './time-input';
import { render, fireEvent } from '../../../../../test/test-utils';

const baseProps = { value: '', onChange: () => {} };

describe('TimeInput.to24h', () => {
  describe('when called with empty value', () => {
    it('should return an empty string', () => {
      expect(TimeInput.to24h('')).toEqual('');
    });
  });
  describe('when called with invalid time', () => {
    it('should return an empty string', () => {
      expect(TimeInput.to24h('65:10')).toEqual('');
      expect(TimeInput.to24h('10:3.5')).toEqual('');
      expect(TimeInput.to24h('1300:00.000')).toEqual('');
      expect(TimeInput.to24h('1300')).toEqual('');
      expect(TimeInput.to24h('300')).toEqual('');
      expect(TimeInput.to24h('13:00.000')).toEqual('');
      expect(TimeInput.to24h('15:09.300')).toEqual('');
      expect(TimeInput.to24h('10:3.5')).toEqual('');
    });
  });
  describe('when called with valid time', () => {
    describe('when called with regular precision time', () => {
      it('should return the time in 24h format', () => {
        expect(TimeInput.to24h('15:10')).toEqual('15:10');
        expect(TimeInput.to24h('15:2')).toEqual('15:02');
        expect(TimeInput.to24h('04')).toEqual('04:00');
        expect(TimeInput.to24h('3 AM')).toEqual('03:00');
        expect(TimeInput.to24h('3 PM')).toEqual('15:00');
        expect(TimeInput.to24h('3:15 AM')).toEqual('03:15');
        expect(TimeInput.to24h('3:5 AM')).toEqual('03:05');
        expect(TimeInput.to24h('0:00')).toEqual('00:00');
      });
    });
    describe('when called with high precision time', () => {
      it('should return the time in 24h format', () => {
        expect(TimeInput.to24h('10:02:03')).toEqual('10:02:03');
        expect(TimeInput.to24h('10:2:3')).toEqual('10:02:03');
        expect(TimeInput.to24h('10:2:3.456')).toEqual('10:02:03.456');
        expect(TimeInput.to24h('10:2:3.5')).toEqual('10:02:03.500');
      });
    });
  });
});

describe('TimeInput', () => {
  it('should forward data-attributes', () => {
    const { container } = render(<TimeInput {...baseProps} data-foo="bar" />);
    expect(container.querySelector('input')).toHaveAttribute('data-foo', 'bar');
  });

  it('should have an HTML name', () => {
    const { container } = render(<TimeInput {...baseProps} name="foo" />);
    expect(container.querySelector('input')).toHaveAttribute('name', 'foo');
  });

  it('should pass autocompomplete', () => {
    const { container } = render(
      <TimeInput autoComplete="off" {...baseProps} />
    );
    expect(container.querySelector('input')).toHaveAttribute(
      'autocomplete',
      'off'
    );
  });

  it('should have ARIA role', () => {
    const { container } = render(<TimeInput {...baseProps} />);
    expect(container.querySelector('input')).toHaveAttribute('role', 'textbox');
  });

  it('should forward the passed value', () => {
    const { container } = render(<TimeInput {...baseProps} value="foo" />);
    expect(container.querySelector('input')).toHaveAttribute('value', 'foo');
  });

  it('should call onChange when changing the value', () => {
    const onChange = jest.fn((event) => {
      expect(event.target.id).toEqual('some-id');
      expect(event.target.name).toEqual('some-name');
      expect(event.target.value).toEqual('foo');
    });
    const { container } = render(
      <TimeInput
        {...baseProps}
        id="some-id"
        name="some-name"
        onChange={onChange}
      />
    );
    const event = { target: { value: 'foo' } };
    fireEvent.change(container.querySelector('input'), event);
    expect(onChange).toHaveBeenCalled();
  });

  it('should call onFocus when the input is focused', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <TimeInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should call onBlur when input loses focus', () => {
    const { container } = render(<TimeInput {...baseProps} />);
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
  });

  it('should format the value when input is blurred on english locale', () => {
    const onChange = jest.fn();
    const { container } = render(
      <TimeInput {...baseProps} onChange={onChange} value="2:3 AM" />
    );

    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: expect.stringMatching(/^time-input-/i),
        name: undefined,
        value: '2:03 AM',
      },
    });
  });

  it('should format the value when input is blurred on german locale', () => {
    const onChange = jest.fn();
    const { container } = render(
      <TimeInput {...baseProps} onChange={onChange} value="12:3" />,
      { locale: 'de' }
    );

    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: expect.stringMatching(/^time-input-/i),
        name: undefined,
        value: '12:03',
      },
    });
  });

  it('should have focus automatically when isAutofocussed is passed', () => {
    const { container } = render(<TimeInput {...baseProps} isAutofocussed />);
    expect(container.querySelector('input')).toHaveFocus();
  });
});
