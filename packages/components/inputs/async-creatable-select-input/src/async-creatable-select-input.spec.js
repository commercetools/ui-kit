import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent, waitFor } from '../../../../../test/test-utils';
import AsyncCreatableSelectInput from './async-creatable-select-input';

// We use this component to simulate the whole flow of
// changing a value and formatting on blur.
class TestComponent extends Component {
  static displayName = 'TestComponent';
  static propTypes = {
    id: PropTypes.string,
    value: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(
            PropTypes.shape({ value: PropTypes.string.isRequired })
          )(props, ...rest)
        : PropTypes.shape({ value: PropTypes.string.isRequired })(
            props,
            ...rest
          ),
    loadOptions: PropTypes.func,
    defaultOptions: PropTypes.bool,
    isSearchable: PropTypes.bool,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    id: 'some-id',
    name: 'some-name',
    value: { value: 'banana', label: 'Banana' },
    loadOptions: () =>
      Promise.resolve([
        { value: 'banana', label: 'Banana' },
        { value: 'mango', label: 'Mango' },
        { value: 'raspberry', label: 'Raspberry' },
        { value: 'lichi', label: 'Lichi' },
      ]),
    defaultOptions: true,
    isSearchable: true,
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
        <AsyncCreatableSelectInput
          {...this.props}
          onChange={this.handleChange}
          value={this.state.value}
          loadOptions={this.props.loadOptions}
          defaultOptions={this.props.defaultOptions}
          isSearchable={this.props.isSearchable}
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
  });
  describe('interacting', () => {
    it('should open the list and all options should be visible', async () => {
      const { findByLabelText, getByText, findByText } = renderInput();
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
      const { findByLabelText, findByText } = renderInput({
        onChange,
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
          value: { value: 'mango', label: 'Mango' },
        },
      });
    });
    it('should be able to create an option', async () => {
      const { findByLabelText, findByText } = renderInput();
      const input = await findByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const event = { target: { value: 'Orange', label: 'Orange' } };
      fireEvent.change(input, event);
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.keyUp(input, { key: 'Enter' });
      await findByText('Create "Orange"');
    });
    it('should call onChange with the created option', async () => {
      const onChange = jest.fn();
      const { findByLabelText, findByText } = renderInput({
        onChange,
        value: null,
      });
      const input = await findByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Orange', label: 'Orange' } });
      const orangeOption = await findByText('Create "Orange"');
      fireEvent.click(orangeOption);
      expect(onChange).toHaveBeenCalledWith({
        persist: expect.any(Function),
        target: {
          id: 'some-id',
          name: 'some-name',
          value: expect.objectContaining({ value: 'Orange', label: 'Orange' }),
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
          value: [expect.objectContaining({ value: 'mango', label: 'Mango' })],
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
            expect.objectContaining(
              { value: 'mango', label: 'Mango' },
              { value: 'raspberry', label: 'Raspberry' }
            ),
          ],
        },
      });
    });
    it('should be able to create two options', async () => {
      const { findByLabelText, getByText, findByText } = renderInput({
        isMulti: true,
        value: [],
      });
      const input = await findByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const event = { target: { value: 'Orange', label: 'Orange' } };
      fireEvent.change(input, event);
      const orangeOption = await findByText('Create "Orange"');
      fireEvent.click(orangeOption);
      // open again
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const appleEvent = { target: { value: 'Apple', label: 'Apple' } };
      fireEvent.change(input, appleEvent);
      const appleOption = await findByText('Create "Apple"');
      fireEvent.click(appleOption);

      expect(getByText('Orange')).toBeInTheDocument();
      expect(getByText('Apple')).toBeInTheDocument();
    });
    it('should call onChange when two created values', async () => {
      const onChange = jest.fn();
      const { findByLabelText, findByText } = renderInput({
        onChange,
        isMulti: true,
        value: [],
      });
      const input = await findByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.change(input, { target: { value: 'Orange', label: 'Orange' } });
      const orangeOption = await findByText('Create "Orange"');
      fireEvent.click(orangeOption);
      expect(onChange).toHaveBeenCalledWith({
        persist: expect.any(Function),
        target: {
          id: 'some-id',
          name: 'some-name',
          value: [
            expect.objectContaining({ value: 'Orange', label: 'Orange' }),
          ],
        },
      });

      // open list again
      fireEvent.change(input, { target: { value: 'Apple', label: 'Apple' } });
      const appleOption = await findByText('Create "Apple"');
      fireEvent.click(appleOption);

      expect(onChange).toHaveBeenCalledWith({
        persist: expect.any(Function),
        target: {
          id: 'some-id',
          name: 'some-name',
          value: [
            expect.objectContaining({ value: 'Orange', label: 'Orange' }),
            expect.objectContaining({ value: 'Apple', label: 'Apple' }),
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
