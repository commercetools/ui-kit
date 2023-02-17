import { useState } from 'react';
import SelectableSearchInput from './selectable-search-input';
import { screen, render, fireEvent } from '../../../../../test/test-utils';

// We use this component to simulate the whole flow of
// changing a value and formatting on blur.
const TestComponent = (props) => {
  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <label htmlFor={SelectableSearchInput.getTextInputId('test-id')}>
        test-label
      </label>
      <SelectableSearchInput
        id={'test-id'}
        onChange={handleChange}
        onSubmit={() => {}}
        value={value}
        {...props}
      />
    </div>
  );
};

TestComponent.defaultProps = {
  id: 'test-id',
  name: 'test-name',
  value: {
    textValue: 'test-value',
    dropdownValue: 'foo',
  },
  options: [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
    { value: 'baz', label: 'Baz' },
  ],
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
          textValue: 'hello',
          dropdownValue: 'world',
        })
      ).toBe(false);
    });
  });
  describe('when value is empty', () => {
    it('should return true', () => {
      expect(
        SelectableSearchInput.isEmpty({
          textValue: '',
          dropdownValue: 'avengers',
        })
      ).toBe(true);
      expect(
        SelectableSearchInput.isEmpty({
          textValue: 'justice league',
          dropdownValue: '',
        })
      ).toBe(true);
      expect(SelectableSearchInput.isEmpty()).toBe(true);
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
    render(
      <TestComponent value={{ textValue: 'foo', dropdownValue: 'bar' }} />
    );
    expect(screen.getByLabelText('test-label')).toHaveAttribute('value', 'foo');
    expect(
      screen.getByTestId('selectable-search-input-container')
    ).toHaveTextContent('Bar');
  });

  it('should call onFocus when the dropdown menu is focused', async () => {
    const onFocus = jest.fn();
    render(
      <TestComponent
        value={{ textValue: 'test value', dropdownValue: 'bar' }}
        onFocus={onFocus}
      />
    );

    screen.getByLabelText('Bar').focus();
    // expect(screen.getByLabelText('Bar')).toHaveFocus();
    expect(onFocus).toHaveBeenCalledWith({
      target: {
        id: 'test-id.dropdown',
        name: 'test-name.dropdown',
      },
    });
  });

  it('should call onBlur twice when input loses focus for outside element', () => {
    const onBlur = jest.fn();
    render(
      <TestComponent
        value={{ textValue: 'test value', dropdownValue: 'bar' }}
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
    expect(screen.getByLabelText('Foo').inputMode).toBe('');
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
    const onChange = jest.fn((event) => {
      expect(event.target.id).toEqual('some-id.textInput');
      expect(event.target.name).toEqual('some-name.textInput');
      expect(event.target.value).toEqual('avengers');
    });
    const onSubmit = jest.fn();

    const { container } = render(
      <TestComponent
        id="some-id"
        name="some-name"
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );
    const event = { target: { value: 'avengers' } };

    fireEvent.change(screen.getByTestId('selectable-input'), event);
    expect(onChange).toHaveBeenCalled();

    const submitButton = screen.getByLabelText('search-button');
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith('avengers');
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
