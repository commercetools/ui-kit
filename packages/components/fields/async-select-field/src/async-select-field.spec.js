import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent, waitFor } from '../../../../../test/test-utils';
import AsyncSelectField from './async-select-field';

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
    value: PropTypes.object,
    id: PropTypes.string,
    loadOptions: PropTypes.func,
    defaultOptions: PropTypes.bool,
  };
  static defaultProps = {
    id: 'async-select-field',
    title: 'AsyncSelectField',
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

it('should render a text field', async () => {
  const { findByLabelText } = renderAsyncSelectField();
  expect(await findByLabelText('AsyncSelectField')).toBeInTheDocument();
});

it('should render a title', async () => {
  const { findByText } = renderAsyncSelectField({ title: 'foo title' });
  expect(await findByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', async () => {
  const { container } = renderAsyncSelectField({ 'data-foo': 'bar' });
  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() =>
    expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument()
  );
});

it('should have an HTML name', async () => {
  const { container } = renderAsyncSelectField({ name: 'foo' });
  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() =>
    expect(container.querySelector('[name="foo"]')).toBeInTheDocument()
  );
});

it('should call onFocus when the input is focused', async () => {
  const onFocus = jest.fn();
  const { findByLabelText } = renderAsyncSelectField({ onFocus });
  const asyncSelectField = await findByLabelText('AsyncSelectField');
  asyncSelectField.focus();
  expect(asyncSelectField).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', async () => {
  const onBlur = jest.fn();
  const { findByLabelText } = renderAsyncSelectField({ onBlur });
  const asyncSelectField = await findByLabelText('AsyncSelectField');
  asyncSelectField.focus();
  expect(asyncSelectField).toHaveFocus();
  asyncSelectField.blur();
  expect(asyncSelectField).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should have focus automatically when isAutofocussed is passed', async () => {
  const { findByLabelText } = renderAsyncSelectField({
    isAutofocussed: true,
  });
  expect(await findByLabelText('AsyncSelectField')).toHaveFocus();
});

it('should call onChange when changing the value', async () => {
  const onChange = jest.fn();
  const { findByLabelText, getByText, findByText } = renderAsyncSelectField({
    onChange,
  });
  const input = await findByLabelText('AsyncSelectField');
  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  await findByText('Shipped');
  getByText('Shipped').click();
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', async () => {
    const { findByText } = renderAsyncSelectField({
      description: 'foo description',
    });
    expect(await findByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', async () => {
    const { findByText } = renderAsyncSelectField({ hint: 'foo hint' });
    expect(await findByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `hintIcon` is passed', () => {
  it('should render hintIcon and hint', async () => {
    const { findByText } = renderAsyncSelectField({
      hintIcon: <span>icon hint</span>,
      hint: <span>foo hint</span>,
    });
    expect(await findByText('icon hint')).toBeInTheDocument();
    expect(await findByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', async () => {
    const { findByText } = renderAsyncSelectField({ badge: 'foo badge' });
    expect(await findByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', async () => {
    const { findByLabelText } = renderAsyncSelectField({ isDisabled: true });
    expect(await findByLabelText('AsyncSelectField')).toBeDisabled();
  });
});

describe('when required', () => {
  it('should add `*` to title`', async () => {
    const { findByText } = renderAsyncSelectField({ isRequired: true });
    expect(await findByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', async () => {
    const onInfoButtonClick = jest.fn();
    const { findByLabelText } = renderAsyncSelectField({
      onInfoButtonClick,
    });
    expect(await findByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', async () => {
    const onInfoButtonClick = jest.fn();
    const { findByLabelText } = renderAsyncSelectField({
      onInfoButtonClick,
    });
    const moreInfoButton = await findByLabelText('More Info');
    moreInfoButton.click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  describe('when field empty', () => {
    it('should render a default error', async () => {
      const { findByText } = renderAsyncSelectField({
        touched: true,
        errors: { missing: true },
      });
      expect(await findByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', async () => {
      const { findByText } = renderAsyncSelectField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(await findByText('Custom error')).toBeInTheDocument();
    });
  });
});

describe('when field is touched and has warnings', () => {
  describe('when field empty', () => {
    it('should render a default warning', async () => {
      const { findByText } = renderAsyncSelectField({
        touched: true,
        warnings: { defaultWarning: true },
        renderDefaultWarning: () => 'Default warning',
      });
      expect(await findByText(/Default warning/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom warning', () => {
    it('should render the custom warning message', async () => {
      const { findByText } = renderAsyncSelectField({
        touched: true,
        warnings: { customWarning: true },
        renderWarning: () => 'Custom warning',
      });
      expect(await findByText('Custom warning')).toBeInTheDocument();
    });
  });
});
