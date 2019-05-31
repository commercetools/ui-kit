import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent, waitForElement } from '../../../test-utils';
import AsyncSelectInput from './async-select-input';

// We use this component to simulate the whole flow of
// changing a value and formatting on blur.
class TestComponent extends React.Component {
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

  handleChange = event => {
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
      <React.Fragment>
        <label htmlFor={this.props.id}>Fruit</label>
        <AsyncSelectInput
          {...this.props}
          onChange={this.handleChange}
          value={this.state.value}
          loadOptions={this.props.loadOptions}
          defaultOptions={this.props.defaultOptions}
        />
      </React.Fragment>
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

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderInput({ onFocus });
  const input = getByLabelText('Fruit');
  input.focus();
  expect(input).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderInput({ onBlur });
  const input = getByLabelText('Fruit');
  input.focus();
  expect(input).toHaveFocus();
  input.blur();
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
    it('should open the list and all options should be visible', async () => {
      const { getByLabelText, getByText } = renderInput();
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyUp(input, { key: 'ArrowDown' });
      await waitForElement(() => getByText('Mango'));
      expect(getByText('Mango')).toBeInTheDocument();
      expect(getByText('Lichi')).toBeInTheDocument();
      expect(getByText('Raspberry')).toBeInTheDocument();
    });
    it('should be able to select an option', async () => {
      const { getByLabelText, getByText, queryByText } = renderInput();
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      await waitForElement(() => getByText('Mango'));
      getByText('Mango').click();
      // new selected value should be Mango
      expect(getByText('Mango')).toBeInTheDocument();
      // list should closed and not visible
      expect(queryByText('Banana')).not.toBeInTheDocument();
    });
    it('should call onChange when value selected', async () => {
      const onChange = jest.fn();
      const { getByLabelText, getByText } = renderInput({
        onChange,
      });
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      await waitForElement(() => getByText('Mango'));
      getByText('Mango').click();
      expect(onChange).toHaveBeenCalledWith({
        persist: expect.any(Function),
        target: {
          name: 'some-name',
          value: { value: 'mango', label: 'Mango' },
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
    it('should open the list and all options should be visible', async () => {
      const { getByLabelText, getByText } = renderInput({
        isMulti: true,
        value: [],
      });
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyUp(input, { key: 'ArrowDown' });
      await waitForElement(() => getByText('Mango'));
      expect(getByText('Mango')).toBeInTheDocument();
      expect(getByText('Lichi')).toBeInTheDocument();
      expect(getByText('Raspberry')).toBeInTheDocument();
    });
    it('should be able to select two option', async () => {
      const { getByLabelText, getByText, queryByText } = renderInput({
        isMulti: true,
        value: [],
      });
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      await waitForElement(() => getByText('Mango'));
      getByText('Mango').click();
      // new selected value should be Mango
      expect(getByText('Mango')).toBeInTheDocument();
      // list should closed and not visible
      expect(queryByText('Banana')).not.toBeInTheDocument();
      // open list again
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      getByText('Banana').click();
      // new values should be Banana and Mango
      expect(getByText('Banana')).toBeInTheDocument();
      expect(getByText('Mango')).toBeInTheDocument();
      // list should closed and not visible
      expect(queryByText('Raspberry')).not.toBeInTheDocument();
    });
    it('should call onChange when two values selected', async () => {
      const onChange = jest.fn();
      const { getByLabelText, getByText } = renderInput({
        onChange,
        isMulti: true,
        value: [],
      });
      const input = getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      await waitForElement(() => getByText('Mango'));
      getByText('Mango').click();
      expect(onChange).toHaveBeenCalledWith({
        persist: expect.any(Function),
        target: {
          name: 'some-name',
          value: [{ value: 'mango', label: 'Mango' }],
        },
      });
      // open list again
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });

      await waitForElement(() => getByText('Raspberry'));
      getByText('Raspberry').click();

      expect(onChange).toHaveBeenCalledWith({
        persist: expect.any(Function),
        target: {
          name: 'some-name',
          value: [
            { value: 'mango', label: 'Mango' },
            { value: 'raspberry', label: 'Raspberry' },
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
      loadOptions: () => Promise.resolve(groupedOptions),
    });
    const input = getByLabelText('Fruit');
    expect(input).toBeInTheDocument();
    expect(getByText(yellowOption.label)).toBeInTheDocument();
  });
});
