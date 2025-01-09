import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../../../test/test-utils';
import CreatableSelectField from './creatable-select-field';

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
    options: PropTypes.array.isRequired,
  };
  static defaultProps = {
    id: 'creatable-select-field',
    title: 'CreatableSelectField',
    onChange: () => {},
    options: [
      { value: 'ready', label: 'Ready' },
      { value: 'shipped', label: 'Shipped' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'returned', label: 'Returned' },
    ],
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
        <CreatableSelectField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderCreatableSelectField = (props, options) =>
  render(<Story {...props} />, options);

it('should render a text field', () => {
  const { getByLabelText } = renderCreatableSelectField();
  expect(getByLabelText('CreatableSelectField')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderCreatableSelectField({ title: 'foo title' });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderCreatableSelectField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name', () => {
  const { container } = renderCreatableSelectField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
});

it('should call onFocus when the input is focused', async () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderCreatableSelectField({ onFocus });
  fireEvent.asyncFocus(getByLabelText('CreatableSelectField'));
  expect(getByLabelText('CreatableSelectField')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', async () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderCreatableSelectField({ onBlur });
  fireEvent.asyncFocus(getByLabelText('CreatableSelectField'));
  expect(getByLabelText('CreatableSelectField')).toHaveFocus();
  fireEvent.asyncBlur(getByLabelText('CreatableSelectField'));
  expect(getByLabelText('CreatableSelectField')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should have focus automatically when isAutofocussed is passed', () => {
  const { getByLabelText } = renderCreatableSelectField({
    isAutofocussed: true,
  });
  expect(getByLabelText('CreatableSelectField')).toHaveFocus();
});

it('should call onChange when changing the value', () => {
  const onChange = jest.fn();
  const { getByLabelText, getByText } = renderCreatableSelectField({
    onChange,
  });
  const input = getByLabelText('CreatableSelectField');
  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.click(getByText('Shipped'));
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderCreatableSelectField({
      description: 'foo description',
    });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderCreatableSelectField({ hint: 'foo hint' });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `hintIcon` is passed', () => {
  it('should render hintIcon and hint', () => {
    const { getByText } = renderCreatableSelectField({
      hintIcon: <span>icon hint</span>,
      hint: <span>foo hint</span>,
    });
    expect(getByText('icon hint')).toBeInTheDocument();
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { getByText } = renderCreatableSelectField({ badge: 'foo badge' });
    expect(getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderCreatableSelectField({ isDisabled: true });
    expect(getByLabelText('CreatableSelectField')).toBeDisabled();
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderCreatableSelectField({ isRequired: true });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderCreatableSelectField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderCreatableSelectField({
      onInfoButtonClick,
    });
    fireEvent.click(getByLabelText('More Info'));
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  it('should render an id for the error container that is based on the component id', () => {
    const { container } = renderCreatableSelectField({
      touched: true,
      errors: { missing: true },
    });
    expect(
      container.querySelector('#creatable-select-field-errors')
    ).toBeInTheDocument();
  });
  it('should set the aria-errormessage value to the id of the error container', () => {
    const { getByRole } = renderCreatableSelectField({
      touched: true,
      errors: { missing: true },
    });
    expect(getByRole('combobox')).toHaveAccessibleErrorMessage(
      /field is required/i
    );
  });
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderCreatableSelectField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderCreatableSelectField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(getByText('Custom error')).toBeInTheDocument();
    });
  });
});

describe('when field is touched and has warnings', () => {
  it('should render an id for the warning container that is based on the component id', () => {
    const { container } = renderCreatableSelectField({
      touched: true,
      warnings: { customWarning: true },
      renderWarning: () => 'Custom warning',
    });
    expect(
      container.querySelector('#creatable-select-field-warnings')
    ).toBeInTheDocument();
  });
  describe('when there is a custom warning', () => {
    it('should render the custom warning message', () => {
      const { getByText } = renderCreatableSelectField({
        touched: true,
        warnings: { customWarning: true },
        renderWarning: () => 'Custom warning',
      });
      expect(getByText('Custom warning')).toBeInTheDocument();
    });
  });
});
