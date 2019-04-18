import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../test-utils';
import LocalizedMultilineTextField from './localized-multiline-text-field';

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
    onChange: PropTypes.func,
    value: PropTypes.objectOf(PropTypes.string),
    id: PropTypes.string,
  };
  static defaultProps = {
    title: 'foo',
    id: 'text-field',
    value: { en: '', de: '' },
    selectedLanguage: 'en',
  };
  state = {
    value: this.props.value,
  };
  handleChange = event => {
    if (this.props.onChange) this.props.onChange(event);

    this.setState(prevState => ({
      value: {
        ...prevState.value,
        [event.target.language]: event.target.value,
      },
    }));
  };
  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>LocalizedMultilineTextField</label>
        <LocalizedMultilineTextField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderLocalizedMultilineTextField = (props, options) =>
  render(<Story {...props} />, options);

it('should render a text field', () => {
  const { getByLabelText } = renderLocalizedMultilineTextField();
  expect(getByLabelText('EN')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderLocalizedMultilineTextField({
    title: 'foo title',
  });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderLocalizedMultilineTextField({
    'data-foo': 'bar',
  });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should pass autoComplete', () => {
  const { getByLabelText } = renderLocalizedMultilineTextField({
    autoComplete: 'off',
  });
  expect(getByLabelText('EN')).toHaveAttribute('autocomplete', 'off');
});

it('should have an HTML name for input, according to the language', () => {
  const { container } = renderLocalizedMultilineTextField({ name: 'foo' });
  expect(container.querySelector('[name="foo.en"]')).toBeInTheDocument();
});

it('should have an HTML name for every input when all inputs are visible', () => {
  const { container } = renderLocalizedMultilineTextField({
    name: 'foo',
    defaultExpandLanguages: true,
  });
  expect(container.querySelector('[name="foo.en"]')).toBeInTheDocument();
  expect(container.querySelector('[name="foo.de"]')).toBeInTheDocument();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderLocalizedMultilineTextField({ onFocus });
  getByLabelText('EN').focus();
  expect(getByLabelText('EN')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderLocalizedMultilineTextField({ onBlur });
  getByLabelText('EN').focus();
  expect(getByLabelText('EN')).toHaveFocus();
  getByLabelText('EN').blur();
  expect(getByLabelText('EN')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should have focus automatically when isAutofocussed is passed', () => {
  const { getByLabelText } = renderLocalizedMultilineTextField({
    isAutofocussed: true,
  });
  expect(getByLabelText('EN')).toHaveFocus();
});

it('should call onChange when changing the value', () => {
  const onChange = jest.fn(event => {
    event.persist();
  });
  const { getByLabelText } = renderLocalizedMultilineTextField({
    name: 'name-of-pet',
    onChange,
  });
  fireEvent.change(getByLabelText('EN'), {
    target: { language: 'en', value: 'foo' },
  });
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        name: 'name-of-pet.en',
        language: 'en',
        value: 'foo',
      }),
    })
  );
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderLocalizedMultilineTextField({
      description: 'foo description',
    });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderLocalizedMultilineTextField({
      hint: 'foo hint',
    });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { getByText } = renderLocalizedMultilineTextField({
      badge: 'foo badge',
    });
    expect(getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the inputs', () => {
    const { getByLabelText } = renderLocalizedMultilineTextField({
      isDisabled: true,
    });
    expect(getByLabelText('EN')).toHaveAttribute('disabled');
  });
  it('should disable all inputs when all languages  are visible', () => {
    const { getByLabelText } = renderLocalizedMultilineTextField({
      isDisabled: true,
      defaultExpandLanguages: true,
    });
    expect(getByLabelText('EN')).toHaveAttribute('disabled');
    expect(getByLabelText('DE')).toHaveAttribute('disabled');
  });
});

describe('when readOnly', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderLocalizedMultilineTextField({
      isReadOnly: true,
    });
    expect(getByLabelText('EN')).toHaveAttribute('readonly');
  });
  it('should disable all inputs when all languages are visible', () => {
    const { getByLabelText } = renderLocalizedMultilineTextField({
      isReadOnly: true,
      defaultExpandLanguages: true,
    });
    expect(getByLabelText('EN')).toHaveAttribute('readonly');
    expect(getByLabelText('DE')).toHaveAttribute('readonly');
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderLocalizedMultilineTextField({
      isRequired: true,
    });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderLocalizedMultilineTextField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderLocalizedMultilineTextField({
      onInfoButtonClick,
    });
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderLocalizedMultilineTextField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderLocalizedMultilineTextField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(getByText('Custom error')).toBeInTheDocument();
    });
  });
});
