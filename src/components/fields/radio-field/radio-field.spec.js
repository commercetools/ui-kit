import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../test-utils';
import RadioInput from '../../inputs/radio-input';
import RadioField from './radio-field';

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
  };
  static defaultProps = {
    id: 'radio-field',
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
        <label htmlFor={this.props.id}>RadioField</label>
        <label htmlFor={`${this.props.id}-0`}>RadioField Option 1</label>
        <label htmlFor={`${this.props.id}-1`}>RadioField Option 2</label>
        <RadioField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <RadioInput.Option value="apple">Apple</RadioInput.Option>
          <RadioInput.Option value="banana">Banana</RadioInput.Option>
        </RadioField>
      </div>
    );
  }
}

const renderRadioField = (customProps, options) => {
  const props = {
    title: 'foo',
    onChange: jest.fn(),
    ...customProps,
  };
  return {
    ...render(<Story {...props} />, options),
    onChange: props.onChange,
  };
};

it('should render a radio field', () => {
  const { getByLabelText } = renderRadioField();
  expect(getByLabelText('RadioField')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderRadioField({ title: 'foo title' });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderRadioField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name', () => {
  const { container } = renderRadioField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
});

it('should call onFocus when the radio is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderRadioField({ onFocus });
  getByLabelText(/RadioField Option 1/).focus();
  expect(getByLabelText(/RadioField Option 1/)).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when radio loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderRadioField({ onBlur });
  getByLabelText(/RadioField Option 1/).focus();
  expect(getByLabelText(/RadioField Option 1/)).toHaveFocus();
  getByLabelText(/RadioField Option 1/).blur();
  expect(getByLabelText(/RadioField Option 1/)).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should call onChange when changing the value', () => {
  const { getByLabelText, onChange } = renderRadioField();
  fireEvent.click(getByLabelText(/RadioField Option 2/));
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderRadioField({
      description: 'foo description',
    });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderRadioField({ hint: 'foo hint' });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { getByText } = renderRadioField({ badge: 'foo badge' });
    expect(getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderRadioField({ isDisabled: true });
    expect(getByLabelText(/RadioField Option 1/)).toHaveAttribute('disabled');
    expect(getByLabelText(/RadioField Option 2/)).toHaveAttribute('disabled');
  });
});

describe('when readOnly', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderRadioField({ isReadOnly: true });
    expect(getByLabelText(/RadioField Option 1/)).toHaveAttribute('readonly');
    expect(getByLabelText(/RadioField Option 2/)).toHaveAttribute('readonly');
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderRadioField({ isRequired: true });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderRadioField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderRadioField({ onInfoButtonClick });
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderRadioField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderRadioField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(getByText('Custom error')).toBeInTheDocument();
    });
  });
});
