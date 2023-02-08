import { render, fireEvent, screen } from '../../../../../test/test-utils';
import SearchTextInput from './search-text-input';

const baseProps = {
  value: '',
  onChange: () => {},
  onSubmit: () => {},
  onReset: () => {},
};

describe('SearchTextInput.isEmpty', () => {
  describe('when called with an empty value', () => {
    it('should return true', () => {
      expect(SearchTextInput.isEmpty('')).toBe(true);
      expect(SearchTextInput.isEmpty(' ')).toBe(true);
    });
  });
  describe('when called with a filled value', () => {
    it('should return false', () => {
      expect(SearchTextInput.isEmpty('a')).toBe(false);
      expect(SearchTextInput.isEmpty(' a ')).toBe(false);
    });
  });
});

describe('SearchTextInput', () => {
  it('should forward data-attributes', () => {
    const { container } = render(
      <SearchTextInput {...baseProps} data-foo="bar" />
    );
    expect(container.querySelector('input')).toHaveAttribute('data-foo', 'bar');
  });

  it('should render input with empty value', () => {
    const { container } = render(<SearchTextInput {...baseProps} />);
    expect(container.querySelector('input')).toHaveAttribute('type', 'text');
  });

  it('should have an HTML name', () => {
    const { container } = render(<SearchTextInput {...baseProps} name="foo" />);
    expect(container.querySelector('input')).toHaveAttribute('name', 'foo');
  });

  it('should have an HTML autocomplete', () => {
    const { container } = render(
      <SearchTextInput autoComplete="off" {...baseProps} />
    );
    expect(container.querySelector('input')).toHaveAttribute(
      'autocomplete',
      'off'
    );
  });

  it('should forward the passed value', () => {
    const { container } = render(
      <SearchTextInput {...baseProps} value="foo" />
    );
    expect(container.querySelector('input')).toHaveAttribute('value', 'foo');
  });

  it('should have ARIA properties for the readonly state', () => {
    const { container } = render(<SearchTextInput {...baseProps} isReadOnly />);
    expect(container.querySelector('input')).toHaveAttribute(
      'aria-readonly',
      'true'
    );
  });

  it('should call onChange when chaning the value', () => {
    const onChange = jest.fn((event) => {
      expect(event.target.id).toEqual('some-id');
      expect(event.target.name).toEqual('some-name');
      expect(event.target.value).toEqual('foo');
    });
    const { container } = render(
      <SearchTextInput
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
      <SearchTextInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should call onBlur when input loses focus', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <SearchTextInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
  });

  it('should have focus automatically when isAutofocussed is passed', () => {
    const { container } = render(
      <SearchTextInput {...baseProps} isAutofocussed />
    );
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should call the passed onSubmit function', () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <SearchTextInput {...baseProps} onSubmit={onSubmit} />
    );

    const event = { target: { value: 'foo' } };
    fireEvent.change(container.querySelector('input'), event);
    const submitButton = screen.getByLabelText('search-button');
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('foo');
  });

  it('should call the passed onReset function', () => {
    const onReset = jest.fn();

    const { container } = render(
      <SearchTextInput {...baseProps} onReset={onReset} />
    );

    const event = { target: { value: 'foo' } };
    fireEvent.change(container.querySelector('input'), event);
    expect(container.querySelector('input')).toHaveAttribute('value', 'foo');
    const submitButton = screen.getByLabelText('clear-button');
    fireEvent.click(submitButton);
    expect(onReset).toHaveBeenCalledWith();
    expect(container.querySelector('input')).toHaveAttribute('value', '');
  });
});
