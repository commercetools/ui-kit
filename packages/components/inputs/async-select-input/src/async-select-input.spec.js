import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  render,
  fireEvent,
  waitFor,
  within,
} from '../../../../../test/test-utils';
import AsyncSelectInput from './async-select-input';

// We use this component to simulate the whole flow of
// changing a value and formatting on blur.
class TestComponent extends Component {
  static displayName = 'TestComponent';
  static propTypes = {
    id: PropTypes.string,
    defaultOptions: PropTypes.bool.isRequired,
    loadOptions: PropTypes.func.isRequired,
    value: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.object).isRequired(props, ...rest)
        : PropTypes.object(props, ...rest),
    onChange: PropTypes.func,
  };
  static defaultProps = {
    id: 'some-id',
    name: 'some-name',
    value: { value: 'banana', label: 'Banana' },
    defaultOptions: true,
    loadOptions: () =>
      Promise.resolve([
        { value: 'banana', label: 'Banana' },
        { value: 'mango', label: 'Mango' },
        { value: 'raspberry', label: 'Raspberry' },
        { value: 'lichi', label: 'Lichi' },
      ]),
  };

  state = {
    value: this.props.value,
  };

  handleChange = (event) => {
    event.persist();
    this.setState({
      value: event.target.value,
    });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  render() {
    return (
      <>
        <label htmlFor={this.props.id}>Fruit</label>
        <AsyncSelectInput
          {...this.props}
          onChange={this.handleChange}
          value={this.state.value}
          loadOptions={this.props.loadOptions}
          defaultOptions={this.props.defaultOptions}
        />
      </>
    );
  }
}

const renderInput = (props, options) =>
  render(<TestComponent {...props} />, options);

it('should forward data-attributes', async () => {
  const { container } = renderInput({ 'data-foo': 'bar' });
  // here we have to use container.querySelector because the data attributes are attached
  // to the wrapper div, not to the input itself.
  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() =>
    expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument()
  );
});

it('should have focus automatically when isAutofocussed is passed', async () => {
  const { findByLabelText } = renderInput({ isAutofocussed: true });
  expect(await findByLabelText('Fruit')).toHaveFocus();
});

it('should have an open menu if menuIsOpen is true', async () => {
  const { findByLabelText, findByRole, getByText } = renderInput({
    menuIsOpen: true,
  });
  await findByLabelText('Fruit');
  await findByRole('listbox');
  expect(getByText('Mango')).toBeInTheDocument();
});

it('should not have an open menu if menuIsOpen is true and isReadOnly is true', async () => {
  const { findByLabelText, queryByText } = renderInput({
    menuIsOpen: true,
    isReadOnly: true,
  });

  await findByLabelText('Fruit');

  expect(queryByText('Mango')).not.toBeInTheDocument();
});

it('should call onFocus when the input is focused', async () => {
  const onFocus = jest.fn();
  const { findByLabelText } = renderInput({ onFocus });
  const input = await findByLabelText('Fruit');
  fireEvent.asyncFocus(input);
  expect(input).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', async () => {
  const onBlur = jest.fn();
  const { findByLabelText } = renderInput({ onBlur });
  const input = await findByLabelText('Fruit');
  fireEvent.asyncFocus(input);
  expect(input).toHaveFocus();
  fireEvent.asyncBlur(input);
  expect(input).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should not display selected options in menu when hideSelectedOptions is true', async () => {
  const { findByLabelText, findByRole } = renderInput({
    hideSelectedOptions: true,
  });
  const input = await findByLabelText('Fruit', { text: 'Banana' });

  fireEvent.keyDown(input, {
    key: 'ArrowDown',
  });

  const menu = await findByRole('listbox');
  expect(within(menu).queryByText('Banana')).not.toBeInTheDocument();
});

it('should display selected options in menu when hideSelectedOptions is false', async () => {
  const { findByLabelText, findByRole } = renderInput({
    hideSelectedOptions: false,
  });
  const input = await findByLabelText('Fruit', { text: 'Banana' });

  fireEvent.keyDown(input, {
    key: 'ArrowDown',
  });

  const menu = await findByRole('listbox');
  expect(within(menu).getByText('Banana')).toBeInTheDocument();
});

describe('in single mode', () => {
  describe('when no value is specified', () => {
    it('should render a select input', async () => {
      const { findByLabelText } = renderInput();
      const input = await findByLabelText('Fruit');
      expect(input).toBeInTheDocument();
    });
  });
  describe('when a value is specified', () => {
    it('should render a select input with preselected value', async () => {
      const { findByLabelText, getByText } = renderInput({
        value: { value: 'banana', label: 'Banana' },
      });
      const input = await findByLabelText('Fruit');
      expect(input).toBeInTheDocument();
      expect(getByText('Banana')).toBeInTheDocument();
    });
    it('should display selected option in menu when hideSelectedOptions is undefined', async () => {
      const { findByLabelText, findByRole } = renderInput();
      const input = await findByLabelText('Fruit', { text: 'Banana' });
      expect(input).toBeInTheDocument();

      fireEvent.keyDown(input, {
        key: 'ArrowDown',
      });

      const menu = await findByRole('listbox');
      expect(within(menu).getByText('Banana')).toBeInTheDocument();
    });
  });
  describe('interacting', () => {
    it('should open the list and all options should be visible', async () => {
      const { findByLabelText, findByText, getByText } = renderInput();
      const input = await findByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyUp(input, { key: 'ArrowDown' });
      await findByText('Mango');
      expect(getByText('Mango')).toBeInTheDocument();
      expect(getByText('Lichi')).toBeInTheDocument();
      expect(getByText('Raspberry')).toBeInTheDocument();
    });

    it('should be able to select an option', async () => {
      const { findByLabelText, getByText, queryByText, findByText } =
        renderInput();
      const input = await findByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const mangoOption = await findByText('Mango');
      fireEvent.click(mangoOption);
      // new selected value should be Mango
      expect(getByText('Mango')).toBeInTheDocument();
      // list should closed and not visible
      expect(queryByText('Banana')).not.toBeInTheDocument();
    });
    it('should call onChange when value selected', async () => {
      const onChange = jest.fn();
      const { getByLabelText, findByText } = renderInput({
        onChange,
      });
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const mangoOption = await findByText('Mango');
      fireEvent.click(mangoOption);
      expect(onChange).toHaveBeenCalledWith({
        persist: expect.any(Function),
        target: {
          id: 'some-id',
          name: 'some-name',
          value: { value: 'mango', label: 'Mango' },
        },
      });
    });
  });
});

describe('in multi mode', () => {
  describe('when no value is specified', () => {
    it('should render a select input', async () => {
      const { findByLabelText } = renderInput({
        isMulti: true,
        value: [],
      });
      const input = await findByLabelText('Fruit');
      expect(input).toBeInTheDocument();
    });
    describe('when values are specified', () => {
      it('should render a select input with preselected values', async () => {
        const { findByLabelText, getByText } = renderInput({
          isMulti: true,
          value: [
            { value: 'mango', label: 'Mango' },
            { value: 'raspberry', label: 'Raspberry' },
          ],
        });
        const input = await findByLabelText('Fruit');
        expect(input).toBeInTheDocument();
        expect(getByText('Mango')).toBeInTheDocument();
        expect(getByText('Raspberry')).toBeInTheDocument();
      });
      it('should not display selected options in menu when hideSelectedOptions is undefined', async () => {
        const { findByLabelText, findByRole } = renderInput({
          isMulti: true,
          value: [
            { value: 'mango', label: 'Mango' },
            { value: 'raspberry', label: 'Raspberry' },
          ],
        });
        const input = await findByLabelText('Fruit');
        fireEvent.keyDown(input, {
          key: 'ArrowDown',
        });

        const menu = await findByRole('listbox');
        expect(within(menu).queryByText('Mango')).not.toBeInTheDocument();
        expect(within(menu).queryByText('Raspberry')).not.toBeInTheDocument();
      });
    });
  });
  describe('interacting', () => {
    it('should open the list and all options should be visible', async () => {
      const { findByLabelText, getByText, findByText } = renderInput({
        isMulti: true,
        value: [],
      });
      const input = await findByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyUp(input, { key: 'ArrowDown' });
      await findByText('Mango');
      expect(getByText('Mango')).toBeInTheDocument();
      expect(getByText('Lichi')).toBeInTheDocument();
      expect(getByText('Raspberry')).toBeInTheDocument();
    });
    it('should be able to select two option', async () => {
      const { findByLabelText, getByText, queryByText, findByText } =
        renderInput({
          isMulti: true,
          value: [],
        });
      const input = await findByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const mangoOption = await findByText('Mango');
      fireEvent.click(mangoOption);
      // new selected value should be Mango
      expect(getByText('Mango')).toBeInTheDocument();
      // list should closed and not visible
      expect(queryByText('Banana')).not.toBeInTheDocument();
      // open list again
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const bananaOption = await findByText('Banana');
      fireEvent.click(bananaOption);
      // new values should be Banana and Mango
      expect(getByText('Banana')).toBeInTheDocument();
      expect(getByText('Mango')).toBeInTheDocument();
      // list should closed and not visible
      expect(queryByText('Raspberry')).not.toBeInTheDocument();
    });
    it('should call onChange when two values selected', async () => {
      const onChange = jest.fn();
      const { findByLabelText, findByText } = renderInput({
        onChange,
        isMulti: true,
        value: [],
      });
      const input = await findByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const mangoOption = await findByText('Mango');
      fireEvent.click(mangoOption);
      expect(onChange).toHaveBeenCalledWith({
        persist: expect.any(Function),
        target: {
          id: 'some-id',
          name: 'some-name',
          value: [{ value: 'mango', label: 'Mango' }],
        },
      });
      // open list again
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });

      const raspberryOption = await findByText('Raspberry');
      fireEvent.click(raspberryOption);

      expect(onChange).toHaveBeenCalledWith({
        persist: expect.any(Function),
        target: {
          id: 'some-id',
          name: 'some-name',
          value: [
            { value: 'mango', label: 'Mango' },
            { value: 'raspberry', label: 'Raspberry' },
          ],
        },
      });
    });
    it('should call onChange when value is cleared', async () => {
      const onChange = jest.fn();
      const { findByLabelText, queryByText } = renderInput({
        onChange,
        isMulti: true,
        value: [{ value: 'mango', label: 'Mango' }],
      });
      const input = await findByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'Backspace' });
      expect(onChange).toHaveBeenCalledWith({
        persist: expect.any(Function),
        target: {
          id: 'some-id',
          name: 'some-name',
          value: [],
        },
      });
      expect(queryByText('Mango')).not.toBeInTheDocument();
    });
  });
});

describe('when used with option groups', () => {
  const colourOptions = [
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  ];

  const flavourOptions = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
  ];
  const groupedOptions = [
    { label: 'Colours', options: colourOptions },
    { label: 'Flavours', options: flavourOptions },
  ];

  const yellowOption = colourOptions[2];

  it('should render a select input with preselected values', async () => {
    const { findByLabelText, getByText } = renderInput({
      value: yellowOption,
      loadOptions: () => Promise.resolve(groupedOptions),
    });
    const input = await findByLabelText('Fruit');
    expect(input).toBeInTheDocument();
    expect(getByText(yellowOption.label)).toBeInTheDocument();
  });
});
