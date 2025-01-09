import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent, screen } from '../../../../../test/test-utils';
import SearchSelectInput from './search-select-input';

const fruits = [
  { value: 'banana', label: 'Banana' },
  { value: 'mango', label: 'Mango' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'lichi', label: 'Lichi' },
];
// We use this component to simulate the whole flow of
// changing a value and formatting on blur.
class TestSearchSelectComponent extends Component {
  static displayName = 'TestSearchSelectComponent';
  static propTypes = {
    id: PropTypes.string,
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
    loadOptions: (input) =>
      Promise.resolve(
        fruits.filter(
          (fruit) => fruit.label.toLowerCase() === input.toLowerCase()
        )
      ),
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
        <SearchSelectInput
          {...this.props}
          onChange={this.handleChange}
          value={this.state.value}
          loadOptions={this.props.loadOptions}
        />
      </>
    );
  }
}

const renderInput = (props, options) =>
  render(<TestSearchSelectComponent {...props} />, options);

it('should forward data-attributes', () => {
  const { container } = renderInput({ 'data-foo': 'bar' });
  // here we have to use container.querySelector because the data attributes are attached
  // to the wrapper div, not to the input itself.
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have focus automatically when isAutofocussed is passed', () => {
  renderInput({ isAutofocussed: true });
  expect(screen.getByLabelText('Fruit')).toHaveFocus();
});

it('should call onFocus when the input is focused', async () => {
  const onFocus = jest.fn();
  renderInput({ onFocus });
  const input = screen.getByLabelText('Fruit');
  fireEvent.asyncFocus(input);
  expect(input).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', async () => {
  const onBlur = jest.fn();
  renderInput({ onBlur });
  const input = screen.getByLabelText('Fruit');
  fireEvent.asyncFocus(input);
  expect(input).toHaveFocus();
  fireEvent.asyncBlur(input);
  expect(input).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

describe('in single mode', () => {
  describe('when no value is specified', () => {
    it('should render a select input', () => {
      renderInput();
      const input = screen.getByLabelText('Fruit');
      expect(input).toBeInTheDocument();
    });
  });
  describe('when a value is specified', () => {
    it('should render a select input with preselected value', () => {
      renderInput({
        value: { value: 'banana', label: 'Banana' },
      });
      const input = screen.getByLabelText('Fruit');
      expect(input).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });
  });
  describe('interacting', () => {
    /**
     * due to disabling defaultOptions, the list should not rendered any options when the input is empty
     */
    it('should open the empty list by default', async () => {
      renderInput();
      const input = screen.getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyUp(input, { key: 'ArrowDown' });
      // default message shown when no match is found
      expect(
        screen.getByText(/No matches found for your search term/i)
      ).toBeInTheDocument();
      expect(screen.queryByText('Mango')).not.toBeInTheDocument();
      expect(screen.queryByText('Lichi')).not.toBeInTheDocument();
      expect(screen.queryByText('Raspberry')).not.toBeInTheDocument();
    });
    it('should open the list and all matching options should be visible', async () => {
      renderInput();
      const input = screen.getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyUp(input, { key: 'ArrowDown' });
      fireEvent.change(input, { target: { value: 'mango' } });
      await screen.findByText('Mango');
      expect(screen.getByText('Mango')).toBeInTheDocument();
      expect(screen.queryByText('Lichi')).not.toBeInTheDocument();
      expect(screen.queryByText('Raspberry')).not.toBeInTheDocument();
    });

    it('should be able to select an option', async () => {
      renderInput();
      const input = screen.getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.change(input, { target: { value: 'mango' } });
      await screen.findByText('Mango');
      fireEvent.click(screen.getByText('Mango'));
      // new selected value should be Mango
      expect(screen.getByText('Mango')).toBeInTheDocument();
      // list should closed and not visible
      expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    });
    it('should call onChange when value selected', async () => {
      const onChange = jest.fn();
      renderInput({
        onChange,
      });
      const input = screen.getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.change(input, { target: { value: 'mango' } });
      await screen.findByText('Mango');
      fireEvent.click(screen.getByText('Mango'));
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
    it('should render a select input', () => {
      renderInput({
        isMulti: true,
        value: [],
      });
      const input = screen.getByLabelText('Fruit');
      expect(input).toBeInTheDocument();
    });
    describe('when values are specified', () => {
      it('should render a select input with preselected values', () => {
        renderInput({
          isMulti: true,
          value: [
            { value: 'mango', label: 'Mango' },
            { value: 'raspberry', label: 'Raspberry' },
          ],
        });
        const input = screen.getByLabelText('Fruit');
        expect(input).toBeInTheDocument();
        expect(screen.getByText('Mango')).toBeInTheDocument();
        expect(screen.getByText('Raspberry')).toBeInTheDocument();
      });
    });
  });
  describe('interacting', () => {
    it('should be able to select two option', async () => {
      renderInput({
        isMulti: true,
        value: [],
      });
      const input = screen.getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.change(input, { target: { value: 'mango' } });
      await screen.findByText('Mango');
      fireEvent.click(screen.getByText('Mango'));
      // new selected value should be Mango
      expect(screen.getByText('Mango')).toBeInTheDocument();
      // open list again
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.change(input, { target: { value: 'banana' } });
      await screen.findByText('Banana');
      fireEvent.click(screen.getByText('Banana'));
      // new values should be Banana and Mango
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Mango')).toBeInTheDocument();
    });
    it('should call onChange when two values selected', async () => {
      const onChange = jest.fn();
      renderInput({
        onChange,
        isMulti: true,
        value: [],
      });
      const input = screen.getByLabelText('Fruit');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.change(input, { target: { value: 'mango' } });
      await screen.findByText('Mango');
      fireEvent.click(screen.getByText('Mango'));
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
      fireEvent.change(input, { target: { value: 'raspberry' } });
      await screen.findByText('Raspberry');
      fireEvent.click(screen.getByText('Raspberry'));
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
    it('should call onChange when value is cleared', () => {
      const onChange = jest.fn();
      renderInput({
        onChange,
        isMulti: true,
        value: [{ value: 'mango', label: 'Mango' }],
      });
      const input = screen.getByLabelText('Fruit');
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
      expect(screen.queryByText('Mango')).not.toBeInTheDocument();
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
    renderInput({
      value: yellowOption,
      loadOptions: () => Promise.resolve(groupedOptions),
    });
    const input = screen.getByLabelText('Fruit');
    expect(input).toBeInTheDocument();
    expect(screen.getByText(yellowOption.label)).toBeInTheDocument();
  });
});
