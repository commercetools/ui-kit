import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../../../test/test-utils';
import NumberField from './number-field';

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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
  };
  static defaultProps = {
    id: 'text-field',
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
        <NumberField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderNumberField = (customProps, options) => {
  const props = {
    title: 'NumberField',
    onChange: jest.fn(),
    ...customProps,
  };
  return {
    ...render(<Story {...props} />, options),
    onChange: props.onChange,
  };
};

it('should render a text field', () => {
  const { getByLabelText } = renderNumberField();
  expect(getByLabelText('NumberField')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderNumberField({ title: 'foo title' });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderNumberField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name', () => {
  const { container } = renderNumberField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderNumberField({ onFocus });
  getByLabelText('NumberField').focus();
  expect(getByLabelText('NumberField')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderNumberField({ onBlur });
  getByLabelText('NumberField').focus();
  expect(getByLabelText('NumberField')).toHaveFocus();
  getByLabelText('NumberField').blur();
  expect(getByLabelText('NumberField')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should have focus automatically when isAutofocussed is passed', () => {
  const { getByLabelText } = renderNumberField({ isAutofocussed: true });
  expect(getByLabelText('NumberField')).toHaveFocus();
});

it('should call onChange when changing the value', () => {
  const { getByLabelText, onChange } = renderNumberField();
  const event = { target: { value: '1000' } };
  fireEvent.change(getByLabelText('NumberField'), event);
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderNumberField({ description: 'foo description' });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `autoComplete` is passed', () => {
  it('should render an input with autocomplete', () => {
    const { getByLabelText } = renderNumberField({ autoComplete: 'off' });
    expect(getByLabelText('NumberField')).toHaveAttribute(
      'autocomplete',
      'off'
    );
  });
});

describe('when `min` is passed', () => {
  it('should render a description', () => {
    const { getByLabelText } = renderNumberField({ min: 20 });
    expect(getByLabelText('NumberField')).toHaveAttribute('min');
  });
});

describe('when `max` is passed', () => {
  it('should render a description', () => {
    const { getByLabelText } = renderNumberField({ max: 20 });
    expect(getByLabelText('NumberField')).toHaveAttribute('max');
  });
});

describe('when `step` is passed', () => {
  it('should render a description', () => {
    const { getByLabelText } = renderNumberField({ step: 2 });
    expect(getByLabelText('NumberField')).toHaveAttribute('step');
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderNumberField({ hint: 'foo hint' });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `hintIcon` is passed', () => {
  it('should render hintIcon and hint', () => {
    const { getByText } = renderNumberField({
      hintIcon: <span>icon hint</span>,
      hint: <span>foo hint</span>,
    });
    expect(getByText('icon hint')).toBeInTheDocument();
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { getByText } = renderNumberField({ badge: 'foo badge' });
    expect(getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderNumberField({ isDisabled: true });
    expect(getByLabelText('NumberField')).toBeDisabled();
  });
});

describe('when readOnly', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderNumberField({ isReadOnly: true });
    expect(getByLabelText('NumberField')).toHaveAttribute('readonly');
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderNumberField({ isRequired: true });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderNumberField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderNumberField({ onInfoButtonClick });
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  it('should render an id for the error container that is based on the component id', () => {
    const { container } = renderNumberField({
      touched: true,
      errors: { missing: true },
    });
    expect(container.querySelector('#text-field-errors')).toBeInTheDocument();
  });
  it('should set the aria-errormessage value to the id of the error container', () => {
    const { getByRole } = renderNumberField({
      touched: true,
      errors: { missing: true },
    });
    expect(getByRole('spinbutton')).toHaveAccessibleErrorMessage(
      /field is required/i
    );
  });
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderNumberField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when value is below min', () => {
    it('should render a default error', () => {
      const min = 2;
      const { getByText } = renderNumberField({
        value: 1,
        min,
        touched: true,
        errors: { belowMin: true },
      });
      expect(
        getByText(`Value must be greater than or equal to ${min}.`)
      ).toBeInTheDocument();
    });
  });
  describe('when value is above max', () => {
    it('should render a default error', () => {
      const max = 2;
      const { getByText } = renderNumberField({
        value: 3,
        max,
        touched: true,
        errors: { aboveMax: true },
      });
      expect(
        getByText(`Value must be less than or equal to ${max}.`)
      ).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderNumberField({
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
    const { container } = renderNumberField({
      touched: true,
      warnings: { customWarning: true },
      renderWarning: () => 'Custom warning',
    });
    expect(container.querySelector('#text-field-warnings')).toBeInTheDocument();
  });
  describe('when there is a custom warning', () => {
    it('should render the custom warning message', () => {
      const { getByText } = renderNumberField({
        touched: true,
        warnings: { customWarning: true },
        renderWarning: () => 'Custom warning',
      });
      expect(getByText('Custom warning')).toBeInTheDocument();
    });
  });
});
