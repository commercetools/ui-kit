import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent, waitFor } from '../../../../../test/test-utils';
import AsyncCreatableSelectField from './async-creatable-select-field';

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
    id: 'async-creatable-select-field',
    title: 'AsyncCreatableSelectField',
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
        <AsyncCreatableSelectField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderAsyncCreatableSelectField = (props, options) =>
  render(<Story {...props} />, options);

it('should render a text field', async () => {
  const { findByLabelText } = renderAsyncCreatableSelectField();
  expect(
    await findByLabelText('AsyncCreatableSelectField')
  ).toBeInTheDocument();
});

it('should render a title', async () => {
  const { findByText } = renderAsyncCreatableSelectField({
    title: 'foo title',
  });
  expect(await findByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', async () => {
  const { container } = renderAsyncCreatableSelectField({ 'data-foo': 'bar' });
  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() =>
    expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument()
  );
});

it('should have an HTML name', async () => {
  const { container } = renderAsyncCreatableSelectField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() =>
    expect(container.querySelector('[name="foo"]')).toBeInTheDocument()
  );
});

it('should call onFocus when the input is focused', async () => {
  const onFocus = jest.fn();
  const { findByLabelText } = renderAsyncCreatableSelectField({ onFocus });
  const asyncCreatableSelectField = await findByLabelText(
    'AsyncCreatableSelectField'
  );
  await fireEvent.asyncFocus(asyncCreatableSelectField);
  expect(asyncCreatableSelectField).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', async () => {
  const onBlur = jest.fn();
  const { findByLabelText } = renderAsyncCreatableSelectField({ onBlur });
  const asyncCreatableSelectField = await findByLabelText(
    'AsyncCreatableSelectField'
  );
  await fireEvent.asyncFocus(asyncCreatableSelectField);
  expect(asyncCreatableSelectField).toHaveFocus();
  await fireEvent.asyncBlur(asyncCreatableSelectField);
  expect(asyncCreatableSelectField).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should have focus automatically when isAutofocussed is passed', async () => {
  const { findByLabelText } = renderAsyncCreatableSelectField({
    isAutofocussed: true,
  });
  expect(await findByLabelText('AsyncCreatableSelectField')).toHaveFocus();
});

it('should call onChange when changing the value', async () => {
  const onChange = jest.fn();
  const { findByLabelText, getByText, findByText } =
    renderAsyncCreatableSelectField({
      onChange,
    });
  const input = await findByLabelText('AsyncCreatableSelectField');
  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  await waitFor(() => findByText('Shipped'));
  fireEvent.click(getByText('Shipped'));
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', async () => {
    const { findByText } = renderAsyncCreatableSelectField({
      description: 'foo description',
    });
    expect(await findByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', async () => {
    const { findByText } = renderAsyncCreatableSelectField({
      hint: 'foo hint',
    });
    expect(await findByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `hintIcon` is passed', () => {
  it('should render hintIcon and hint', async () => {
    const { findByText } = renderAsyncCreatableSelectField({
      hintIcon: <span>icon hint</span>,
      hint: <span>foo hint</span>,
    });
    expect(await findByText('icon hint')).toBeInTheDocument();
    expect(await findByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', async () => {
    const { findByText } = renderAsyncCreatableSelectField({
      badge: 'foo badge',
    });
    expect(await findByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', async () => {
    const { findByLabelText } = renderAsyncCreatableSelectField({
      isDisabled: true,
    });
    expect(await findByLabelText('AsyncCreatableSelectField')).toBeDisabled();
  });
});

describe('when required', () => {
  it('should add `*` to title`', async () => {
    const { findByText } = renderAsyncCreatableSelectField({
      isRequired: true,
    });
    await findByText('*');
  });
});

describe('when showing an info button', () => {
  it('should render an info button', async () => {
    const onInfoButtonClick = jest.fn();
    const { findByLabelText } = renderAsyncCreatableSelectField({
      onInfoButtonClick,
    });
    expect(await findByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', async () => {
    const onInfoButtonClick = jest.fn();
    const { findByLabelText } = renderAsyncCreatableSelectField({
      onInfoButtonClick,
    });
    const moreInfoButton = await findByLabelText('More Info');
    await moreInfoButton.click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  it('should render an id for the error container that is based on the component id', async () => {
    const { container, findByText } = renderAsyncCreatableSelectField({
      touched: true,
      errors: { missing: true },
    });
    await findByText(/field is required/i);
    expect(
      container.querySelector('#async-creatable-select-field-errors')
    ).toBeInTheDocument();
  });
  it('should set the aria-errormessage value to the id of the error container', async () => {
    const { findByRole } = renderAsyncCreatableSelectField({
      touched: true,
      errors: { missing: true },
    });
    expect(await findByRole('combobox')).toHaveAccessibleErrorMessage(
      /field is required/i
    );
  });
  describe('when field empty', () => {
    it('should render a default error', async () => {
      const { findByText } = renderAsyncCreatableSelectField({
        touched: true,
        errors: { missing: true },
      });
      expect(await findByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', async () => {
      const { findByText } = renderAsyncCreatableSelectField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(await findByText('Custom error')).toBeInTheDocument();
    });
  });
});

describe('when field is touched and has warnings', () => {
  it('should render an id for the warning container that is based on the component id', async () => {
    const { container, findByText } = renderAsyncCreatableSelectField({
      touched: true,
      warnings: { customWarning: true },
      renderWarning: () => 'Custom warning',
    });
    await findByText('Custom warning');
    expect(
      container.querySelector('#async-creatable-select-field-warnings')
    ).toBeInTheDocument();
  });
  describe('when there is a custom warning', () => {
    it('should render the custom warning message', async () => {
      const { findByText } = renderAsyncCreatableSelectField({
        touched: true,
        warnings: { customWarning: true },
        renderWarning: () => 'Custom warning',
      });
      expect(await findByText('Custom warning')).toBeInTheDocument();
    });
  });
});
