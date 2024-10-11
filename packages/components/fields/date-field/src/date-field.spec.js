import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../../../test/test-utils';
import DateField from './date-field';

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
    value: PropTypes.string,
    id: PropTypes.string,
  };
  static defaultProps = {
    id: 'date-field',
    title: 'DateField',
    onChange: () => {},
    value: '',
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
        <DateField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderDateField = (props, options) =>
  render(<Story {...props} />, options);

it('should render a text field', () => {
  const { getByLabelText } = renderDateField();
  expect(getByLabelText('DateField')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderDateField({ title: 'foo title' });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderDateField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name', () => {
  const { container } = renderDateField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderDateField({ onFocus });
  getByLabelText('DateField').focus();
  expect(getByLabelText('DateField')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderDateField({ onBlur });
  getByLabelText('DateField').focus();
  expect(getByLabelText('DateField')).toHaveFocus();
  getByLabelText('DateField').blur();
  expect(getByLabelText('DateField')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should call onChange when changing the value', () => {
  const onChange = jest.fn();
  const { getByLabelText } = renderDateField({ onChange });
  const event = { target: { value: '10/30/2018' } };
  fireEvent.click(getByLabelText('DateField'));
  fireEvent.change(getByLabelText('DateField'), event);
  fireEvent.keyDown(getByLabelText('DateField'), { key: 'Enter' });
  fireEvent.keyUp(getByLabelText('DateField'), { key: 'Enter' });
  fireEvent.blur(getByLabelText('DateField'));
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderDateField({ description: 'foo description' });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderDateField({ hint: 'foo hint' });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `hintIcon` is passed', () => {
  it('should render hintIcon and hint', () => {
    const { getByText } = renderDateField({
      hintIcon: <span>icon hint</span>,
      hint: <span>foo hint</span>,
    });
    expect(getByText('icon hint')).toBeInTheDocument();
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { getByText } = renderDateField({ badge: 'foo badge' });
    expect(getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderDateField({ isDisabled: true });
    expect(getByLabelText('DateField')).toBeDisabled();
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderDateField({ isRequired: true });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderDateField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderDateField({ onInfoButtonClick });
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  it('should render an id for the error container that is based on the component id', () => {
    const { container } = renderDateField({
      touched: true,
      errors: { missing: true },
    });
    expect(container.querySelector('#date-field-errors')).toBeInTheDocument();
  });
  it('should set the aria-errormessage value to the id of the error container', () => {
    const { getByRole } = renderDateField({
      touched: true,
      errors: { missing: true },
    });
    expect(getByRole('textbox')).toHaveAccessibleErrorMessage(
      /field is required/i
    );
  });
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderDateField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderDateField({
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
    const { container } = renderDateField({
      touched: true,
      warnings: { customWarning: true },
      renderWarning: () => 'Custom warning',
    });
    expect(container.querySelector('#date-field-warnings')).toBeInTheDocument();
  });
  describe('when there is a custom warning', () => {
    it('should render the custom warning message', () => {
      const { getByText } = renderDateField({
        touched: true,
        warnings: { customWarning: true },
        renderWarning: () => 'Custom warning',
      });
      expect(getByText('Custom warning')).toBeInTheDocument();
    });
  });
});
