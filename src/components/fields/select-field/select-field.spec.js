import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../test-utils';
import SelectField from './select-field';

// This component is used to enable easy testing.
// It overwrites the onChange function and places a label for the
// input component. It also ensures an id so that the label can associate
// the input. This allows tests to use getByLabelText.
// It also makes sure the event's value passed to onChange flows back to the
// component so that we can test it under real conditions.
// As a convenience, we enable accessing a mocked onChange function.
class Story extends React.Component {
  static displayName = 'Story';
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.array.isRequired,
  };
  static defaultProps = {
    id: 'text-field',
    title: 'foo',
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
  handleChange = event => {
    this.props.onChange(event);
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>SelectField</label>
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
    expect(getByLabelText('SelectField')).toHaveAttribute('disabled');
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
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderSelectField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderSelectField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(getByText('Custom error')).toBeInTheDocument();
    });
  });
});
