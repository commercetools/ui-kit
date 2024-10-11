import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../../../test/test-utils';
import SelectField from './select-field';

// This component is used to enable easy testing.
// It overwrites the onChange function and places a label for the
// input component. It also ensures an id so that the label can associate
// the input. This allows tests to use getByLabelText.
// It also makes sure the event's value passed to onChange flows back to the
// component so that we can test it under real conditions.
// As a convenience, we enable accessing a mocked onChange function.
class Story extends Component {
  static displayName = 'Story';
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    id: PropTypes.string,
    options: PropTypes.array.isRequired,
  };
  static defaultProps = {
    id: 'select-field',
    title: 'SelectField ',
    onChange: () => {},
    options: [
      { value: 'ready', label: 'Ready' },
      { value: 'shipped', label: 'Shipped' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'returned', label: 'Returned' },
    ],
  };
  state = {
    value: this.props.value || '',
  };
  handleChange = (event) => {
    this.props.onChange(event);
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <div>
        <SelectField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderSelectField = (props, options) =>
  render(<Story {...props} />, options);

it('should render a text field', () => {
  const { getByLabelText } = renderSelectField();
  expect(getByLabelText('SelectField')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderSelectField({ title: 'foo title' });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderSelectField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name', () => {
  const { container } = renderSelectField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderSelectField({ onFocus });
  getByLabelText('SelectField').focus();
  expect(getByLabelText('SelectField')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderSelectField({ onBlur });
  getByLabelText('SelectField').focus();
  expect(getByLabelText('SelectField')).toHaveFocus();
  getByLabelText('SelectField').blur();
  expect(getByLabelText('SelectField')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should have focus automatically when isAutofocussed is passed', () => {
  const { getByLabelText } = renderSelectField({ isAutofocussed: true });
  expect(getByLabelText('SelectField')).toHaveFocus();
});

it('should call onChange when changing the value', () => {
  const onChange = jest.fn();
  const { getByLabelText, getByText } = renderSelectField({ onChange });
  const input = getByLabelText('SelectField');
  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  getByText('Ready').click();
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderSelectField({ description: 'foo description' });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderSelectField({ hint: 'foo hint' });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { getByText } = renderSelectField({ badge: 'foo badge' });
    expect(getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderSelectField({ isDisabled: true });
    expect(getByLabelText('SelectField')).toBeDisabled();
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderSelectField({ isRequired: true });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderSelectField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderSelectField({ onInfoButtonClick });
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  it('should render an id for the error container that is based on the component id', () => {
    const { container } = renderSelectField({
      touched: true,
      errors: { missing: true },
    });
    expect(container.querySelector('#select-field-errors')).toBeInTheDocument();
  });
  it('should set the aria-errormessage value to the id of the error container', () => {
    const { getByRole } = renderSelectField({
      touched: true,
      errors: { missing: true },
    });
    expect(getByRole('combobox')).toHaveAccessibleErrorMessage(
      /field is required/i
    );
  });
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText, getByLabelText } = renderSelectField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByLabelText('SelectField')).toBeInvalid();
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText, getByLabelText } = renderSelectField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(getByLabelText('SelectField')).toBeInvalid();
      expect(getByText('Custom error')).toBeInTheDocument();
    });
  });
});

describe('when field is touched and has warnings', () => {
  it('should render an id for the warning container that is based on the component id', () => {
    const { container } = renderSelectField({
      touched: true,
      warnings: { customWarning: true },
      renderWarning: () => 'Custom warning',
    });
    expect(
      container.querySelector('#select-field-warnings')
    ).toBeInTheDocument();
  });
  describe('when there is a custom warning', () => {
    it('should render the custom warning message', () => {
      const { getByText } = renderSelectField({
        touched: true,
        warnings: { customWarning: true },
        renderWarning: () => 'Custom warning',
      });
      expect(getByText('Custom warning')).toBeInTheDocument();
    });
  });
});
describe('when field is not touched', () => {
  describe('when isMulti is false', () => {
    it('should not render an error', () => {
      const { queryByText, getByLabelText } = renderSelectField({
        touched: false,
        isMulti: false,
        value: ['1', '2', '3'],
        errors: { missing: true },
      });
      expect(getByLabelText('SelectField')).toBeValid();
      expect(queryByText(/field is required/i)).not.toBeInTheDocument();
    });
  });
  describe('when isMulti is true', () => {
    it('should not render an error', () => {
      const { queryByText, getByLabelText } = renderSelectField({
        touched: undefined,
        isMulti: true,
        value: ['1', '2', '3'],
        errors: { missing: true },
      });
      expect(getByLabelText('SelectField')).toBeValid();
      expect(queryByText(/field is required/i)).not.toBeInTheDocument();
    });
  });
});
