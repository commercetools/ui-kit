import { render, fireEvent } from '../../../../../test/test-utils';
import PasswordInput from './password-input';

const baseProps = {
  value: '',
  onChange: () => jest.fn(),
};

describe('PasswordInput', () => {
  it('should forward data-attributes', () => {
    const { container } = render(
      <PasswordInput {...baseProps} data-foo="bar" />
    );
    expect(container.querySelector('input')).toHaveAttribute('data-foo', 'bar');
  });

  it('should render a password input', () => {
    const { container } = render(<PasswordInput {...baseProps} />);
    expect(container.querySelector('input')).toHaveAttribute(
      'type',
      'password'
    );
  });

  it('should have an HTML name', () => {
    const { container } = render(<PasswordInput {...baseProps} name="foo" />);
    expect(container.querySelector('input')).toHaveAttribute('name', 'foo');
  });

  it('should forward the passed value', () => {
    const { container } = render(<PasswordInput {...baseProps} value="foo" />);
    expect(container.querySelector('input')).toHaveAttribute('value', 'foo');
  });

  it('should have ARIA properties for the readonly state', () => {
    const { container } = render(<PasswordInput {...baseProps} isReadOnly />);
    expect(container.querySelector('input')).toHaveAttribute(
      'aria-readonly',
      'true'
    );
  });

  it('should call onChange when changing the value', () => {
    const onChange = jest.fn((event) => {
      expect(event.target.id).toEqual('some-id');
      expect(event.target.name).toEqual('some-name');
      expect(event.target.value).toEqual('5');
    });
    const { container } = render(
      <PasswordInput
        {...baseProps}
        id="some-id"
        name="some-name"
        onChange={onChange}
      />
    );
    const event = { target: { value: 5 } };
    fireEvent.change(container.querySelector('input'), event);
    expect(onChange).toHaveBeenCalled();
  });

  it('should call onFocus when the input is focused', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <PasswordInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should call onBlur when input loses focus', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <PasswordInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
  });

  it('should have focus automatically when isAutofocussed is passed', () => {
    const { container } = render(
      <PasswordInput {...baseProps} isAutofocussed />
    );
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should be disabled when isDisabled is passed', () => {
    const { container } = render(<PasswordInput {...baseProps} isDisabled />);
    expect(container.querySelector('input')).toBeDisabled();
  });

  it('should have autoComplete set to `on`', () => {
    const { container } = render(
      <PasswordInput {...baseProps} autoComplete="on" />
    );
    expect(container.querySelector('input')).toHaveAttribute(
      'autocomplete',
      'on'
    );
  });
});
