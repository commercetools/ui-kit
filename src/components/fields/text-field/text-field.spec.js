import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import { render, fireEvent } from '../../../test-utils';
import TextField from './text-field';

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
    onEvent: PropTypes.func.isRequired,
    value: PropTypes.string,
    id: PropTypes.string,
  };
  static defaultProps = {
    id: 'text-field',
  };
  state = {
    value: this.props.value || '',
  };
  handleChange = event => {
    this.props.onEvent(event);
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>TextField</label>
        <TextField
          id={this.props.id}
          {...omit(this.props, 'onEvent')}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderTextField = (customProps, options) => {
  const onChange = jest.fn();
  const props = {
    title: 'foo',
    ...customProps,
  };
  return {
    onChange,
    ...render(<Story onEvent={onChange} {...props} />, options),
  };
};

it('should render a text field', () => {
  const { getByLabelText } = renderTextField();
  expect(getByLabelText('TextField')).toBeTruthy();
});

it('shoult render a title', () => {
  const { queryByText } = renderTextField({ title: 'foo title' });
  expect(queryByText('foo title')).toBeTruthy();
});

it('should forward data-attributes', () => {
  const { container } = renderTextField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeTruthy();
});

it('should have an HTML name', () => {
  const { container } = renderTextField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeTruthy();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { container } = renderTextField({ onFocus });
  container.querySelector('input').focus();
  expect(container.querySelector('input')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { container } = renderTextField({ onBlur });
  container.querySelector('input').focus();
  expect(container.querySelector('input')).toHaveFocus();
  container.querySelector('input').blur();
  expect(container.querySelector('input')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should have focus automatically when isAutofocussed is passed', () => {
  const { container } = renderTextField({ isAutofocussed: true });
  expect(container.querySelector('input')).toHaveFocus();
});

it('should call onChange when chaning the value', () => {
  const { container, onChange } = renderTextField();
  const event = { target: { value: 'foo' } };
  fireEvent.change(container.querySelector('input'), event);
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { queryByText } = renderTextField({ description: 'foo description' });
    expect(queryByText('foo description')).toBeTruthy();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { queryByText } = renderTextField({ hint: 'foo hint' });
    expect(queryByText('foo hint')).toBeTruthy();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { queryByText } = renderTextField({ badge: 'foo badge' });
    expect(queryByText('foo badge')).toBeTruthy();
  });
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderTextField({ isDisabled: true });
    expect(getByLabelText('TextField')).toHaveAttribute('disabled');
  });
});

describe('when readOnly', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderTextField({ isReadOnly: true });
    expect(getByLabelText('TextField')).toHaveAttribute('readOnly');
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { queryByText } = renderTextField({ isRequired: true });
    expect(queryByText('*')).toBeTruthy();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { container } = renderTextField({ onInfoButtonClick });
    expect(container.querySelector('button')).toBeTruthy();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { container } = renderTextField({ onInfoButtonClick });
    container.querySelector('button').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { queryByText } = renderTextField({
        touched: true,
        errors: { missing: true },
      });
      expect(
        queryByText('This field is required. Provide a value.')
      ).toBeTruthy();
    });
  });
  describe('when has a custom error', () => {
    it('should render a custom error', () => {
      const renderError = jest.fn(() => 'Custom error');
      const { queryByText } = renderTextField({
        touched: true,
        errors: { custom: true },
        renderError,
      });
      expect(queryByText('Custom error')).toBeTruthy();
    });
  });
});
