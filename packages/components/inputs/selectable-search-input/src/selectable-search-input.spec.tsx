import { useState } from 'react';
import SelectableSearchInput, {
  type TSelectableSearchInputProps,
  type TCustomEvent,
  TValue,
  TOptions,
} from './selectable-search-input';
import { screen, render, fireEvent } from '../../../../../test/test-utils';
import { components, OptionProps } from 'react-select';

type TTestComponentProps = Omit<
  TSelectableSearchInputProps,
  'value' | 'options' | 'onSubmit'
> & {
  value?: TValue;
  options?: TOptions;
  onSubmit?: (value: TValue) => void;
};

// We use this component to simulate the whole flow of
// changing a value and submitting.
const TestComponent = ({
  id = 'test-id',
  name = 'test-name',
  value = {
    text: 'test-value',
    option: 'foo',
  },
  options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
    { value: 'baz', label: 'Baz' },
  ],
  onChange = () => {},
  onSubmit = () => {},
  ...props
}: TTestComponentProps) => {
  const [dropdownValue, setDropdownValue] = useState(value.option);
  const [textInputValue, setTextInputValue] = useState(value.text);

  const _value = {
    text: textInputValue,
    option: dropdownValue,
  };

  const handleChange = (event: TCustomEvent) => {
    if (event.target.name && event.target.name.endsWith('.textInput')) {
      setTextInputValue(event.target.value as string);
    }
    if (event.target.name && event.target.name.endsWith('.dropdown')) {
      setDropdownValue(event.target.value as string);
    }
    onChange && onChange(event);
  };

  return (
    <div>
      <label htmlFor={SelectableSearchInput.getTextInputId(id)}>
        test-label
      </label>
      <SelectableSearchInput
        {...props}
        options={options}
        value={_value}
        onSubmit={onSubmit}
        onChange={handleChange}
      />
    </div>
  );
};

describe('SelectableSearchInput.getTextInputId', () => {
  describe('when an id is passed', () => {
    it('should return the created it', () => {
      expect(SelectableSearchInput.getTextInputId('foo')).toBe('foo.textInput');
    });
  });
  describe('when no id is passed', () => {
    it('should return no id', () => {
      expect(SelectableSearchInput.getTextInputId()).toBe(undefined);
    });
  });
});

describe('SelectableSearchInput.getDropdownId', () => {
  describe('when an id is passed', () => {
    it('should return the created it', () => {
      expect(SelectableSearchInput.getDropdownId('foo')).toBe('foo.dropdown');
    });
  });
  describe('when no id is passed', () => {
    it('should return no id', () => {
      expect(SelectableSearchInput.getDropdownId()).toBe(undefined);
    });
  });
});

describe('SelectableSearchInput.isEmpty', () => {
  describe('when value is filled out', () => {
    it('should return false', () => {
      expect(
        SelectableSearchInput.isEmpty({
          text: 'hello',
          option: 'world',
        })
      ).toBe(false);
    });
  });
  describe('when value is empty', () => {
    it('should return true', () => {
      expect(
        SelectableSearchInput.isEmpty({
          text: '',
          option: '',
        })
      ).toBe(true);
    });
  });
});

describe('SelectableSearchInput', () => {
  it('should forward data-attributes', () => {
    render(<TestComponent data-foo="bar" />);
    expect(screen.getByLabelText('test-label')).toHaveAttribute(
      'data-foo',
      'bar'
    );
  });

  it('should have an HTML name based on the passed name', () => {
    render(<TestComponent name="foo" />);
    expect(screen.getByLabelText('test-label')).toHaveAttribute(
      'name',
      'foo.textInput'
    );
  });

  it('should pass autoComplete', () => {
    render(<TestComponent autoComplete="off" />);
    expect(screen.getByLabelText('test-label')).toHaveAttribute(
      'autocomplete',
      'off'
    );
  });

  it('should show the passed value', () => {
    render(<TestComponent value={{ text: 'foo', option: 'bar' }} />);
    expect(screen.getByLabelText('test-label')).toHaveAttribute('value', 'foo');
    expect(
      screen.getByTestId('selectable-search-input-container')
    ).toHaveTextContent('Bar');
  });

  it('should show the passed experimental value when controlled externally', () => {
    render(
      <TestComponent
        value={{ text: 'foo', option: 'bar' }}
        _experimentalValue={{ text: 'experimental', option: 'bar' }}
      />
    );
    expect(screen.getByLabelText('test-label')).toHaveAttribute(
      'value',
      'experimental'
    );
    expect(
      screen.getByTestId('selectable-search-input-container')
    ).toHaveTextContent('Bar');
  });

  it('should show an empty input when an empty string is passed externally as value', () => {
    render(
      <TestComponent
        value={{ text: 'foo', option: 'bar' }}
        _experimentalValue={{ text: '', option: 'bar' }}
      />
    );
    expect(screen.getByLabelText('test-label')).toHaveAttribute('value', '');
    expect(
      screen.getByTestId('selectable-search-input-container')
    ).toHaveTextContent('Bar');
  });

  it('should call onFocus when the dropdown menu is focused', async () => {
    const onFocus = jest.fn();
    render(
      <TestComponent
        value={{ text: 'test value', option: 'bar' }}
        onFocus={onFocus}
      />
    );

    screen.getByLabelText('Bar').focus();
    expect(onFocus).toHaveBeenCalledWith({
      target: {
        id: 'test-id.dropdown',
        name: 'test-name.dropdown',
      },
    });
  });

  it('should render custom dropdown component', async () => {
    const onFocus = jest.fn();

    const Option = (props: OptionProps) => {
      return (
        <div>
          <span>Custom text</span>
          <components.Option {...props} />
        </div>
      );
    };

    render(
      <TestComponent
        value={{ text: 'test value', option: 'bar' }}
        onFocus={onFocus}
        selectCustomComponents={{ Option }}
      />
    );

    const selectInput = screen.getByLabelText('Bar');
    fireEvent.focus(selectInput);
    fireEvent.keyDown(selectInput, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(
      screen.getByTestId('selectable-search-input-container')
    ).toHaveTextContent('Custom text');
  });

  it('should call onBlur twice when input loses focus for outside element', () => {
    const onBlur = jest.fn();
    render(
      <TestComponent
        value={{ text: 'test value', option: 'bar' }}
        onBlur={onBlur}
      />
    );
    screen.getByLabelText('test-label').focus();
    expect(screen.getByLabelText('test-label')).toHaveFocus();
    screen.getByLabelText('test-label').blur();
    expect(screen.getByLabelText('test-label')).not.toHaveFocus();

    expect(onBlur).toHaveBeenCalledWith({
      target: { id: 'test-id.textInput', name: 'test-name.textInput' },
    });
    expect(onBlur).toHaveBeenCalledWith({
      target: { id: 'test-id.dropdown', name: 'test-name.dropdown' },
    });
  });

  it('should focus the text input automatically when isAutofocussed is passed', () => {
    render(<TestComponent isAutofocussed={true} />);
    expect(screen.getByLabelText('test-label')).toHaveFocus();
  });

  it('should render a readonly input when readonly', () => {
    render(<TestComponent isReadOnly={true} />);
    expect(screen.getByLabelText('test-label')).toHaveAttribute('readonly');
  });

  it('should render a readonly dropdown when readonly', () => {
    render(<TestComponent isReadOnly={true} />);
    expect(screen.getByLabelText('Foo').inputMode).toBe('none');
  });

  it('should render with auto-generated ids', () => {
    const { container } = render(<TestComponent id="" />);

    expect(
      container.querySelector('#selectable-search-input-1\\.dropdown')
    ).toBeInTheDocument();
    expect(
      container.querySelector('#selectable-search-input-1\\.textInput')
    ).toBeInTheDocument();
  });

  it('should call onChange when changing the value and onSubmit when submit button is clicked', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<TestComponent onChange={onChange} onSubmit={onSubmit} />);

    const event = { target: { value: 'avengers' } };

    fireEvent.change(screen.getByTestId('selectable-input'), event);
    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: 'test-id.textInput',
        name: 'test-name.textInput',
        value: 'avengers',
      },
    });

    fireEvent.keyDown(screen.getByLabelText('Foo'), { key: 'ArrowDown' });
    screen.getByText('Bar').click();

    expect(onChange).toHaveBeenCalledWith({
      target: {
        id: 'test-id.dropdown',
        name: 'test-name.dropdown',
        value: 'bar',
      },
    });

    const submitButton = screen.getByLabelText('search-button');
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith({
      option: 'bar',
      text: 'avengers',
    });
  });

  it('should call the passed onReset function', () => {
    const onReset = jest.fn();

    const { container } = render(<TestComponent onReset={onReset} />);

    const event = { target: { value: 'hello' } };
    const textInput = screen.getByTestId('selectable-input');
    fireEvent.change(textInput, event);
    expect(textInput).toHaveAttribute('value', 'hello');
    const clearButton = screen.getByLabelText('clear-button');
    fireEvent.click(clearButton);
    expect(onReset).toHaveBeenCalledWith();
    expect(container.querySelector('input')).toHaveAttribute('value', '');
  });
});
