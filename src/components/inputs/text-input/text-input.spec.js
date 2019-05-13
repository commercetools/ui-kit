import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import TextInput from './text-input';

const baseProps = { value: '', onChange: () => {} };

describe('TextInput.isEmpty', () => {
  describe('when called with an empty value', () => {
    it('should return true', () => {
      expect(TextInput.isEmpty('')).toBe(true);
      expect(TextInput.isEmpty(' ')).toBe(true);
    });
  });
  describe('when called with a filled value', () => {
    it('should return false', () => {
      expect(TextInput.isEmpty('a')).toBe(false);
      expect(TextInput.isEmpty(' a ')).toBe(false);
    });
  });
});

describe('TextInput', () => {
  it('should forward data-attributes', () => {
    const { container } = render(<TextInput {...baseProps} data-foo="bar" />);
    expect(container.querySelector('input')).toHaveAttribute('data-foo', 'bar');
  });

  it('should forward any attributes', () => {
    const { container } = render(<TextInput {...baseProps} foo="bar" />);
    expect(container.querySelector('input')).toHaveAttribute('foo', 'bar');
  });

  it('should render a text input', () => {
    const { container } = render(<TextInput {...baseProps} />);
    expect(container.querySelector('input')).toHaveAttribute('type', 'text');
  });

  it('should have an HTML name', () => {
    const { container } = render(<TextInput {...baseProps} name="foo" />);
    expect(container.querySelector('input')).toHaveAttribute('name', 'foo');
  });

  it('should have an HTML autocomplete', () => {
    const { container } = render(
      <TextInput autoComplete="off" {...baseProps} />
    );
    expect(container.querySelector('input')).toHaveAttribute(
      'autocomplete',
      'off'
    );
  });

  it('should have ARIA role', () => {
    const { container } = render(<TextInput {...baseProps} />);
    expect(container.querySelector('input')).toHaveAttribute('role', 'textbox');
  });

  it('should forward the passed value', () => {
    const { container } = render(<TextInput {...baseProps} value="foo" />);
    expect(container.querySelector('input')).toHaveAttribute('value', 'foo');
  });

  it('should have ARIA properties for the readonly state', () => {
    const { container } = render(<TextInput {...baseProps} readOnly />);
    expect(container.querySelector('input')).toHaveAttribute(
      'aria-readonly',
      'true'
    );
  });

  it('should call onChange when chaning the value', () => {
    const onChange = jest.fn(event => {
      expect(event.target.id).toEqual('some-id');
      expect(event.target.name).toEqual('some-name');
      expect(event.target.value).toEqual('foo');
    });
    const { container } = render(
      <TextInput
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

  it('should have focus automatically when autoFocus is passed', () => {
    const { container } = render(<TextInput {...baseProps} autoFocus />);
    expect(container.querySelector('input')).toHaveFocus();
  });
});
