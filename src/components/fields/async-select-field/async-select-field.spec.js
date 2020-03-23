import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent, waitFor } from '../../../test-utils';
import AsyncSelectField from './async-select-field';

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
    value: PropTypes.object,
    id: PropTypes.string,
    loadOptions: PropTypes.func,
    defaultOptions: PropTypes.bool,
  };
  static defaultProps = {
    id: 'text-field',
    title: 'foo',
    onChange: () => {},
    loadOptions: () =>
      Promise.resolve([
        { value: 'ready', label: 'Ready' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'returned', label: 'Returned' },
      ]),
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
        <label htmlFor={this.props.id}>AsyncSelectField</label>
        <AsyncSelectField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderAsyncSelectField = (props, options) =>
  render(<Story {...props} />, options);

it('should render a text field', () => {
  const { getByLabelText } = renderAsyncSelectField();
  expect(getByLabelText('AsyncSelectField')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderAsyncSelectField({ title: 'foo title' });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderAsyncSelectField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name', () => {
  const { container } = renderAsyncSelectField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderAsyncSelectField({ onFocus });
  getByLabelText('AsyncSelectField').focus();
  expect(getByLabelText('AsyncSelectField')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderAsyncSelectField({ onBlur });
  getByLabelText('AsyncSelectField').focus();
  expect(getByLabelText('AsyncSelectField')).toHaveFocus();
  getByLabelText('AsyncSelectField').blur();
  expect(getByLabelText('AsyncSelectField')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should have focus automatically when isAutofocussed is passed', () => {
  const { getByLabelText } = renderAsyncSelectField({
    isAutofocussed: true,
  });
  expect(getByLabelText('AsyncSelectField')).toHaveFocus();
});

it('should call onChange when changing the value', async () => {
  const onChange = jest.fn();
  const { getByLabelText, getByText, findByText } = renderAsyncSelectField({
    onChange,
  });
  const input = getByLabelText('AsyncSelectField');
  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  await waitFor(() => findByText('Shipped'));
  getByText('Shipped').click();
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderAsyncSelectField({
      description: 'foo description',
    });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderAsyncSelectField({ hint: 'foo hint' });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { getByText } = renderAsyncSelectField({ badge: 'foo badge' });
    expect(getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderAsyncSelectField({ isDisabled: true });
    expect(getByLabelText('AsyncSelectField')).toHaveAttribute('disabled');
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderAsyncSelectField({ isRequired: true });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderAsyncSelectField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderAsyncSelectField({
      onInfoButtonClick,
    });
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderAsyncSelectField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderAsyncSelectField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(getByText('Custom error')).toBeInTheDocument();
    });
  });
});
