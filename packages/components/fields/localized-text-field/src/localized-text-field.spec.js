import { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from '../../../../../test/test-utils';
import LocalizedTextField from './localized-text-field';

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
    onChange: PropTypes.func,
    value: PropTypes.objectOf(PropTypes.string),
    id: PropTypes.string,
  };
  static defaultProps = {
    title: 'LocalizedTextField',
    id: 'text-field',
    value: { en: '', de: '' },
    selectedLanguage: 'en',
  };
  state = {
    value: this.props.value,
  };
  handleChange = (event) => {
    if (this.props.onChange) this.props.onChange(event);

    this.setState((prevState) => ({
      value: {
        ...prevState.value,
        [event.target.language]: event.target.value,
      },
    }));
  };
  render() {
    return (
      <div>
        <LocalizedTextField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderLocalizedTextField = (props, options) =>
  render(<Story {...props} />, options);

it('should render a text field', () => {
  const { getByLabelText } = renderLocalizedTextField();
  expect(getByLabelText('EN')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderLocalizedTextField({ title: 'foo title' });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderLocalizedTextField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name for input, according to the language', () => {
  const { container } = renderLocalizedTextField({ name: 'foo' });
  expect(container.querySelector('[name="foo.en"]')).toBeInTheDocument();
});

it('should have an HTML name for every input when all inputs are visible', () => {
  const { container } = renderLocalizedTextField({
    name: 'foo',
    defaultExpandLanguages: true,
  });
  expect(container.querySelector('[name="foo.en"]')).toBeInTheDocument();
  expect(container.querySelector('[name="foo.de"]')).toBeInTheDocument();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderLocalizedTextField({ onFocus });
  getByLabelText('EN').focus();
  expect(getByLabelText('EN')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderLocalizedTextField({ onBlur });
  getByLabelText('EN').focus();
  expect(getByLabelText('EN')).toHaveFocus();
  getByLabelText('EN').blur();
  expect(getByLabelText('EN')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should pass autocomplete', () => {
  const { getByLabelText } = renderLocalizedTextField({ autoComplete: 'off' });
  expect(getByLabelText('EN')).toHaveAttribute('autocomplete', 'off');
});

it('should have focus automatically when isAutofocussed is passed', () => {
  const { getByLabelText } = renderLocalizedTextField({ isAutofocussed: true });
  expect(getByLabelText('EN')).toHaveFocus();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderLocalizedTextField({
      description: 'foo description',
    });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderLocalizedTextField({ hint: 'foo hint' });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { getByText } = renderLocalizedTextField({ badge: 'foo badge' });
    expect(getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the inputs', () => {
    const { getByLabelText } = renderLocalizedTextField({ isDisabled: true });
    expect(getByLabelText('EN')).toBeDisabled();
  });
  it('should disable all inputs when all languages  are visible', () => {
    const { getByLabelText } = renderLocalizedTextField({
      isDisabled: true,
      defaultExpandLanguages: true,
    });
    expect(getByLabelText('EN')).toBeDisabled();
    expect(getByLabelText('DE')).toBeDisabled();
  });
});

describe('when readOnly', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderLocalizedTextField({ isReadOnly: true });
    expect(getByLabelText('EN')).toHaveAttribute('readonly');
  });
  it('should disable all inputs when all languages are visible', () => {
    const { getByLabelText } = renderLocalizedTextField({
      isReadOnly: true,
      defaultExpandLanguages: true,
    });
    expect(getByLabelText('EN')).toHaveAttribute('readonly');
    expect(getByLabelText('DE')).toHaveAttribute('readonly');
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderLocalizedTextField({ isRequired: true });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderLocalizedTextField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderLocalizedTextField({ onInfoButtonClick });
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderLocalizedTextField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderLocalizedTextField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(getByText('Custom error')).toBeInTheDocument();
    });
  });
});

describe('when field is touched and has warnings', () => {
  describe('when field empty', () => {
    it('should render a default warning', () => {
      const { getByText } = renderLocalizedTextField({
        touched: true,
        warnings: { defaultWarning: true },
        renderDefaultWarning: () => 'Default warning',
      });
      expect(getByText(/Default warning/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom warning', () => {
    it('should render the custom warning message', () => {
      const { getByText } = renderLocalizedTextField({
        touched: true,
        warnings: { customWarning: true },
        renderWarning: () => 'Custom warning',
      });
      expect(getByText('Custom warning')).toBeInTheDocument();
    });
  });
});
