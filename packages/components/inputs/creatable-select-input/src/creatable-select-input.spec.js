import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../../../test/test-utils';
import CreatableSelectInput from './creatable-select-input';

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
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    onChange: PropTypes.func,
  };
  static defaultProps = {
    id: 'some-id',
    name: 'some-name',
    value: { value: 'banana', label: 'Banana' },
    options: [
      { value: 'banana', label: 'Banana' },
      { value: 'mango', label: 'Mango' },
      { value: 'raspberry', label: 'Raspberry' },
      { value: 'lichi', label: 'Lichi' },
    ],
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
        <CreatableSelectInput
          {...this.props}
          onChange={this.handleChange}
          value={this.state.value}
          options={this.props.options}
        />
      </>
    );
  }
}

const renderInput = (props, options) =>
  render(<TestComponent {...props} />, options);

it('should forward data-attributes', () => {
  const { container } = renderInput({ 'data-foo': 'bar' });
  // here we have to use container.querySelector because the data attributes are attached
  // to the wrapper div, not to the input itself.
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have focus automatically when isAutofocussed is passed', () => {
  const { getByLabelText } = renderInput({ isAutofocussed: true });
  expect(getByLabelText('Fruit')).toHaveFocus();
});

it('should call onFocus when the input is focused', async () => {
  const onFocus = jest.fn();
  const { findByLabelText } = renderInput({ onFocus });
  const input = await findByLabelText('Fruit');
  await fireEvent.asyncFocus(input);
  expect(input).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', async () => {
  const onBlur = jest.fn();
  const { findByLabelText } = renderInput({ onBlur });
  const input = await findByLabelText('Fruit');
  await fireEvent.asyncFocus(input);
  expect(input).toHaveFocus();
  await fireEvent.asyncBlur(input);
  expect(input).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

describe('in single mode', () => {
  describe('when no value is specified', () => {
    it('should render a select input', () => {
      const { getByLabelText } = renderInput();
      const input = getByLabelText('Fruit');
      expect(input).toBeInTheDocument();
    });
  });
  describe('when a value is specified', () => {
    it('should render a select input with preselected value', () => {
      const { getByLabelText, getByText } = renderInput({
        value: { value: 'banana', label: 'Banana' },
      });
      const input = getByLabelText('Fruit');
      expect(input).toBeInTheDocument();
      expect(getByText('Banana')).toBeInTheDocument();
    });
  });
  describe('interacting', () => {
    it('should open the list and all options should be visible', () => {
      const { getByLabelText, getByText } = renderInput();
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyUp(input, { key: 'ArrowDown' });
      expect(getByText('Mango')).toBeInTheDocument();
      expect(getByText('Lichi')).toBeInTheDocument();
      expect(getByText('Raspberry')).toBeInTheDocument();
    });
    it('should be able to select an option', async () => {
      const { getByLabelText, getByText, queryByText, findByText } =
        renderInput();
      const input = getByLabelText('Fruit');
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
    it('should be able to create an option', () => {
      const { getByLabelText, getByText } = renderInput();
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const event = { target: { value: 'Orange', label: 'Orange' } };
      fireEvent.change(input, event);
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.keyUp(input, { key: 'Enter' });
      expect(getByText('Orange')).toBeInTheDocument();
    });
    it('should call onChange with the created option', () => {
      const onChange = jest.fn();
      const { getByLabelText } = renderInput({
        onChange,
      });
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const event = { target: { value: 'Orange', label: 'Orange' } };
      fireEvent.change(input, event);
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.keyUp(input, { key: 'Enter' });
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
    it('should render a select input', () => {
      const { getByLabelText } = renderInput({
        isMulti: true,
        value: [],
      });
      const input = getByLabelText('Fruit');
      expect(input).toBeInTheDocument();
    });
    describe('when values are specified', () => {
      it('should render a select input with preselected values', () => {
        const { getByLabelText, getByText } = renderInput({
          isMulti: true,
          value: [
            { value: 'mango', label: 'Mango' },
            { value: 'raspberry', label: 'Raspberry' },
          ],
        });
        const input = getByLabelText('Fruit');
        expect(input).toBeInTheDocument();
        expect(getByText('Mango')).toBeInTheDocument();
        expect(getByText('Raspberry')).toBeInTheDocument();
      });
    });
  });
  describe('interacting', () => {
    it('should open the list and all options should be visible', () => {
      const { getByLabelText, getByText } = renderInput({
        isMulti: true,
        value: [],
      });
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyUp(input, { key: 'ArrowDown' });
      expect(getByText('Mango')).toBeInTheDocument();
      expect(getByText('Lichi')).toBeInTheDocument();
      expect(getByText('Raspberry')).toBeInTheDocument();
    });
    it('should be able to select two option', async () => {
      const { getByLabelText, getByText, queryByText, findByText } =
        renderInput({
          isMulti: true,
          value: [],
        });
      const input = getByLabelText('Fruit');
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
      const { getByLabelText, findByText } = renderInput({
        onChange,
        isMulti: true,
        value: [],
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
    it('should be able to create two options', () => {
      const { getByLabelText, getByText } = renderInput({
        isMulti: true,
        value: [],
      });
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const event = { target: { value: 'Orange', label: 'Orange' } };
      fireEvent.change(input, event);
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.keyUp(input, { key: 'Enter' });
      // open again
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const appleEvent = { target: { value: 'Apple', label: 'Apple' } };
      fireEvent.change(input, appleEvent);
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.keyUp(input, { key: 'Enter' });

      expect(getByText('Orange')).toBeInTheDocument();
      expect(getByText('Apple')).toBeInTheDocument();
    });
    it('should call onChange when two created values', () => {
      const onChange = jest.fn();
      const { getByLabelText } = renderInput({
        onChange,
        isMulti: true,
        value: [],
      });
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const event = { target: { value: 'Orange', label: 'Orange' } };
      fireEvent.change(input, event);
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.keyUp(input, { key: 'Enter' });
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
      const appleEvent = { target: { value: 'Apple', label: 'Apple' } };
      fireEvent.change(input, appleEvent);
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.keyUp(input, { key: 'Enter' });

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
    it('should call onChange when value is cleared', () => {
      const onChange = jest.fn();
      const { getByLabelText, queryByText } = renderInput({
        onChange,
        isMulti: true,
        value: [{ value: 'mango', label: 'Mango' }],
      });
      const input = getByLabelText('Fruit');
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

  it('should render a select input with preselected values', () => {
    const { getByLabelText, getByText } = renderInput({
      value: yellowOption,
      options: groupedOptions,
    });
    const input = getByLabelText('Fruit');
    expect(input).toBeInTheDocument();
    expect(getByText(yellowOption.label)).toBeInTheDocument();
  });
});
