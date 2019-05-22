import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import NumberInput from './number-input';

const baseProps = { value: '', onChange: () => {} };

describe('NumberInput.toFormValue', () => {
  describe('when called with a number', () => {
    it('should return that number', () => {
      expect(NumberInput.toFormValue(3.4)).toEqual(3.4);
    });
  });
  describe('when called with a number stored in a string', () => {
    it('should forward that string', () => {
      expect(NumberInput.toFormValue('3.4')).toEqual('3.4');
      expect(NumberInput.toFormValue('3,4')).toEqual('3,4');
    });
  });
  describe('when called with undefined', () => {
    it('should return an empty string', () => {
      expect(NumberInput.toFormValue()).toEqual('');
      expect(NumberInput.toFormValue(undefined)).toEqual('');
    });
  });
});

describe('NumberInput.isEmpty', () => {
  describe('when the value is empty', () => {
    it('should return true', () => {
      expect(NumberInput.isEmpty()).toBe(true);
      expect(NumberInput.isEmpty('')).toBe(true);
      expect(NumberInput.isEmpty('  ')).toBe(true);
      expect(NumberInput.isEmpty(NaN)).toBe(true);
    });
  });
  describe('when the value is filled', () => {
    it('should return false', () => {
      expect(NumberInput.isEmpty(2.3)).toBe(false);
      expect(NumberInput.isEmpty('2.3')).toBe(false);
    });
  });
});

describe('NumberInput.hasFractionDigits', () => {
  describe('when called with number without fraction digits', () => {
    it('should return false', () => {
      expect(NumberInput.hasFractionDigits(3)).toBe(false);
      expect(NumberInput.hasFractionDigits('3')).toBe(false);
    });
  });
  describe('when called with number with fraction digits', () => {
    it('should return true', () => {
      expect(NumberInput.hasFractionDigits(3.2)).toBe(true);
      expect(NumberInput.hasFractionDigits('3.2')).toBe(true);
    });
  });
  describe('when called with invalid number', () => {
    it('should throw', () => {
      expect(() => NumberInput.hasFractionDigits()).toThrow();
      expect(() => NumberInput.hasFractionDigits(NaN)).toThrow();
      expect(() => NumberInput.hasFractionDigits('foo')).toThrow();
      expect(() => NumberInput.hasFractionDigits('3..')).toThrow();
    });
  });
});

describe('NumberInput', () => {
  it('should forward data-attributes', () => {
    const { container } = render(<NumberInput {...baseProps} data-foo="bar" />);
    expect(container.querySelector('input')).toHaveAttribute('data-foo', 'bar');
  });

  it('should render a number input', () => {
    const { container } = render(<NumberInput {...baseProps} />);
    expect(container.querySelector('input')).toHaveAttribute('type', 'number');
  });

  it('should have an HTML name', () => {
    const { container } = render(<NumberInput {...baseProps} name="foo" />);
    expect(container.querySelector('input')).toHaveAttribute('name', 'foo');
  });

  it('should have ARIA role', () => {
    const { container } = render(<NumberInput {...baseProps} />);
    expect(container.querySelector('input')).toHaveAttribute('role', 'textbox');
  });

  it('should have pass autoComplete', () => {
    const { container } = render(
      <NumberInput autoComplete="off" {...baseProps} />
    );
    expect(container.querySelector('input')).toHaveAttribute(
      'autocomplete',
      'off'
    );
  });

  it('should forward the passed value', () => {
    const { container } = render(<NumberInput {...baseProps} value="foo" />);
    expect(container.querySelector('input')).toHaveAttribute('value', 'foo');
  });

  it('should have ARIA properties for the readonly state', () => {
    const { container } = render(<NumberInput {...baseProps} readOnly />);
    expect(container.querySelector('input')).toHaveAttribute(
      'aria-readonly',
      'true'
    );
  });

  it('should call onChange when chaning the value', () => {
    const onChange = jest.fn(event => {
      expect(event.target.id).toEqual('some-id');
      expect(event.target.name).toEqual('some-name');
      expect(event.target.value).toEqual('47');
    });
    const { container } = render(
      <NumberInput
        {...baseProps}
        id="some-id"
        name="some-name"
        onChange={onChange}
      />
    );
    const event = { target: { value: '47' } };
    fireEvent.change(container.querySelector('input'), event);
    expect(onChange).toHaveBeenCalled();
  });

  it('should have focus automatically when autoFocus is passed', () => {
    const { container } = render(<NumberInput {...baseProps} autoFocus />);
    expect(container.querySelector('input')).toHaveFocus();
  });
});
