import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '../../../../../test/test-utils';
import SearchSelectField from './search-select-field';

const fruits = [
  { value: 'banana', label: 'Banana' },
  { value: 'mango', label: 'Mango' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'lichi', label: 'Lichi' },
];

class TestSearchSelectField extends Component {
  static displayName = 'TestSearchSelectField';
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.object,
    id: PropTypes.string,
    loadOptions: PropTypes.func,
    defaultOptions: PropTypes.bool,
  };
  static defaultProps = {
    id: 'search-select-field',
    title: 'SearchSelectField',
    onChange: () => {},
    loadOptions: (input) =>
      Promise.resolve(
        fruits.filter(
          (fruit) => fruit.label.toLowerCase() === input.toLowerCase()
        )
      ),
    defaultOptions: true,
    value: { value: 'ready', label: 'Ready' },
  };
  state = {
    value: this.props.value,
  };
  handleChange = (event) => {
    this.props.onChange(event);
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <div>
        <SearchSelectField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderSearchSelectField = (props, options) =>
  render(<TestSearchSelectField {...props} />, options);

it('should render a text field', () => {
  renderSearchSelectField();
  expect(screen.getByLabelText('SearchSelectField')).toBeInTheDocument();
});

it('should render a title', () => {
  renderSearchSelectField({ title: 'foo title' });
  expect(screen.getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderSearchSelectField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name', () => {
  const { container } = renderSearchSelectField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  renderSearchSelectField({ onFocus });
  screen.getByLabelText('SearchSelectField').focus();
  expect(screen.getByLabelText('SearchSelectField')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  renderSearchSelectField({ onBlur });
  screen.getByLabelText('SearchSelectField').focus();
  expect(screen.getByLabelText('SearchSelectField')).toHaveFocus();
  screen.getByLabelText('SearchSelectField').blur();
  expect(screen.getByLabelText('SearchSelectField')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should have focus automatically when isAutofocussed is passed', () => {
  renderSearchSelectField({
    isAutofocussed: true,
  });
  expect(screen.getByLabelText('SearchSelectField')).toHaveFocus();
});

it('should call onChange when changing the value', async () => {
  const onChange = jest.fn();
  renderSearchSelectField({
    onChange,
  });
  const input = screen.getByLabelText('SearchSelectField');
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: 'mango' } });
  await waitFor(() => screen.findByText('Mango'));
  screen.getByText('Mango').click();
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    renderSearchSelectField({
      description: 'foo description',
    });
    expect(screen.getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    renderSearchSelectField({ hint: 'foo hint' });
    expect(screen.getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    renderSearchSelectField({ badge: 'foo badge' });
    expect(screen.getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', () => {
    renderSearchSelectField({ isDisabled: true });
    expect(screen.getByLabelText('SearchSelectField')).toBeDisabled();
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    renderSearchSelectField({ isRequired: true });
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    renderSearchSelectField({
      onInfoButtonClick,
    });
    expect(screen.getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    renderSearchSelectField({
      onInfoButtonClick,
    });
    screen.getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  describe('when field empty', () => {
    it('should render a default error', () => {
      renderSearchSelectField({
        touched: true,
        errors: { missing: true },
      });
      expect(screen.getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      renderSearchSelectField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(screen.getByText('Custom error')).toBeInTheDocument();
    });
  });
});

describe('when field is touched and has warnings', () => {
  describe('when there is a custom warning', () => {
    it('should render the custom warning message', () => {
      const { getByText } = renderSearchSelectField({
        touched: true,
        warnings: { customWarning: true },
        renderWarning: () => 'Custom warning',
      });
      expect(getByText('Custom warning')).toBeInTheDocument();
    });
  });
});

describe('when `hintIcon` is passed', () => {
  it('should render hintIcon and hint', async () => {
    const { findByText } = renderSearchSelectField({
      hintIcon: <span>icon hint</span>,
      hint: <span>foo hint</span>,
    });
    expect(await findByText('icon hint')).toBeInTheDocument();
    expect(await findByText('foo hint')).toBeInTheDocument();
  });
});
