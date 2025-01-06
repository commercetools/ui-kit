import { Component, act } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../../../test/test-utils';
import MultilineTextField from './multiline-text-field';

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
    id: 'text-field',
    title: 'MultilineTextField',
    onChange: () => {},
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
        <MultilineTextField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderMultilineTextField = (props, options) =>
  render(<Story {...props} />, options);

it('should render a text field', () => {
  const { getByLabelText } = renderMultilineTextField();
  expect(getByLabelText('MultilineTextField')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderMultilineTextField({ title: 'foo title' });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderMultilineTextField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name', () => {
  const { container } = renderMultilineTextField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
});

it('should call onFocus when the input is focused', async () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderMultilineTextField({ onFocus });
  await act(async () => getByLabelText('MultilineTextField').focus());
  expect(getByLabelText('MultilineTextField')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', async () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderMultilineTextField({ onBlur });
  await act(async () => getByLabelText('MultilineTextField').focus());
  expect(getByLabelText('MultilineTextField')).toHaveFocus();
  await act(async () => getByLabelText('MultilineTextField').blur());
  expect(getByLabelText('MultilineTextField')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should have focus automatically when isAutofocussed is passed', () => {
  const { getByLabelText } = renderMultilineTextField({ isAutofocussed: true });
  expect(getByLabelText('MultilineTextField')).toHaveFocus();
});

it('should pass autocomplete', () => {
  const { getByLabelText } = renderMultilineTextField({ autoComplete: 'off' });
  expect(getByLabelText('MultilineTextField')).toHaveAttribute(
    'autocomplete',
    'off'
  );
});

it('should call onChange when changing the value', () => {
  const onChange = jest.fn();
  const { getByLabelText } = renderMultilineTextField({ onChange });
  const event = { target: { language: 'en', value: 'foo' } };
  fireEvent.change(getByLabelText('MultilineTextField'), event);
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderMultilineTextField({
      description: 'foo description',
    });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderMultilineTextField({ hint: 'foo hint' });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { getByText } = renderMultilineTextField({ badge: 'foo badge' });
    expect(getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderMultilineTextField({ isDisabled: true });
    expect(getByLabelText('MultilineTextField')).toBeDisabled();
  });
});

describe('when readOnly', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderMultilineTextField({ isReadOnly: true });
    expect(getByLabelText('MultilineTextField')).toHaveAttribute('readonly');
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderMultilineTextField({ isRequired: true });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderMultilineTextField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderMultilineTextField({ onInfoButtonClick });
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  it('should render an id for the error container that is based on the component id', () => {
    const { container } = renderMultilineTextField({
      touched: true,
      errors: { missing: true },
    });
    expect(container.querySelector('#text-field-errors')).toBeInTheDocument();
  });
  it('should set the aria-errormessage value to the id of the error container', () => {
    const { getAllByRole } = renderMultilineTextField({
      touched: true,
      errors: { missing: true },
    });
    getAllByRole('textbox').forEach((input) => {
      expect(input).toHaveAccessibleErrorMessage(/field is required/i);
    });
  });
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderMultilineTextField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderMultilineTextField({
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
    const { container } = renderMultilineTextField({
      touched: true,
      warnings: { customWarning: true },
      renderWarning: () => 'Custom warning',
    });
    expect(container.querySelector('#text-field-warnings')).toBeInTheDocument();
  });
  describe('when there is a custom warning', () => {
    it('should render the custom warning message', () => {
      const { getByText } = renderMultilineTextField({
        touched: true,
        warnings: { customWarning: true },
        renderWarning: () => 'Custom warning',
      });
      expect(getByText('Custom warning')).toBeInTheDocument();
    });
  });
});
