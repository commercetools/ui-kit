import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../../../test/test-utils';
import PasswordField from './password-field';

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
    id: 'password-field',
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
        <PasswordField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderPasswordField = (customProps, options) => {
  const props = {
    title: 'PasswordField',
    onChange: jest.fn(),
    ...customProps,
  };
  return {
    ...render(<Story {...props} />, options),
    onChange: props.onChange,
  };
};

it('should render a text field', () => {
  const { getByLabelText } = renderPasswordField();
  expect(getByLabelText('PasswordField')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderPasswordField({ title: 'foo title' });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderPasswordField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name', () => {
  const { container } = renderPasswordField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderPasswordField({ onFocus });
  getByLabelText('PasswordField').focus();
  expect(getByLabelText('PasswordField')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderPasswordField({ onBlur });
  getByLabelText('PasswordField').focus();
  expect(getByLabelText('PasswordField')).toHaveFocus();
  getByLabelText('PasswordField').blur();
  expect(getByLabelText('PasswordField')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should have focus automatically when isAutofocussed is passed', () => {
  const { getByLabelText } = renderPasswordField({ isAutofocussed: true });
  expect(getByLabelText('PasswordField')).toHaveFocus();
});

it('should call onChange when changing the value', () => {
  const { getByLabelText, onChange } = renderPasswordField();
  const event = { target: { value: 'foo' } };
  fireEvent.change(getByLabelText('PasswordField'), event);
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderPasswordField({
      description: 'foo description',
    });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderPasswordField({ hint: 'foo hint' });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `hintIcon` is passed', () => {
  it('should render hintIcon and hint', () => {
    const { getByText } = renderPasswordField({
      hintIcon: <span>icon hint</span>,
      hint: <span>foo hint</span>,
    });
    expect(getByText('icon hint')).toBeInTheDocument();
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { getByText } = renderPasswordField({ badge: 'foo badge' });
    expect(getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderPasswordField({ isDisabled: true });
    expect(getByLabelText('PasswordField')).toBeDisabled();
  });
  it('should set the input type to password', () => {
    const { getByLabelText } = renderPasswordField({ isDisabled: true });
    expect(getByLabelText('PasswordField')).toHaveAttribute('type', 'password');
  });
  describe('when has value', () => {
    it('should set the input type to password', () => {
      const { getByLabelText } = renderPasswordField({
        value: 'foo',
        isDisabled: true,
      });
      expect(getByLabelText('PasswordField')).toHaveAttribute(
        'type',
        'password'
      );
    });
  });
});

describe('when readOnly', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderPasswordField({ isReadOnly: true });
    expect(getByLabelText('PasswordField')).toHaveAttribute('readonly');
  });
  it('should set the input type to password', () => {
    const { getByLabelText } = renderPasswordField({ isReadOnly: true });
    expect(getByLabelText('PasswordField')).toHaveAttribute('type', 'password');
  });
  describe('when has value', () => {
    it('should set the input type to password', () => {
      const { getByLabelText } = renderPasswordField({
        value: 'foo',
        isReadOnly: true,
      });
      expect(getByLabelText('PasswordField')).toHaveAttribute(
        'type',
        'password'
      );
    });
  });
});

describe('when disabled and readOnly', () => {
  it('should set the input type to password', () => {
    const { getByLabelText } = renderPasswordField({
      isDisabled: true,
      isReadOnly: true,
    });
    expect(getByLabelText('PasswordField')).toHaveAttribute('type', 'password');
  });
  describe('when has value', () => {
    it('should set the input type to password', () => {
      const { getByLabelText } = renderPasswordField({
        value: 'foo',
        isDisabled: true,
        isReadOnly: true,
      });
      expect(getByLabelText('PasswordField')).toHaveAttribute(
        'type',
        'password'
      );
    });
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderPasswordField({ isRequired: true });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('with autoComplete', () => {
  it('should auto complete the input', () => {
    const { getByLabelText } = renderPasswordField({ autoComplete: 'on' });
    expect(getByLabelText('PasswordField')).toHaveAttribute('autoComplete');
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderPasswordField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderPasswordField({ onInfoButtonClick });
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderPasswordField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderPasswordField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(getByText('Custom error')).toBeInTheDocument();
    });
  });
});

describe('when input has no value', () => {
  it('should disable the `show` button`', () => {
    const { getByLabelText } = renderPasswordField();
    expect(getByLabelText('show')).toBeDisabled();
  });
});

describe('when input value is not empty', () => {
  it('should enable the `show` button`', () => {
    const { getByLabelText } = renderPasswordField({ value: 'foo' });
    expect(getByLabelText('show')).toBeEnabled();
  });
  describe('when the `show` button is clicked', () => {
    it('should change the label of the button to `hide`', () => {
      const { getByLabelText } = renderPasswordField({ value: 'foo' });
      getByLabelText('show').click();
      expect(getByLabelText('hide')).toBeInTheDocument();
    });
  });
});
