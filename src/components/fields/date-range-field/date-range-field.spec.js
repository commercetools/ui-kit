import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../test-utils';
import DateRangeField from './date-range-field';

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
    value: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
  };
  static defaultProps = {
    id: 'date-field',
    title: 'foo',
    onChange: () => {},
    value: [],
  };
  state = {
    value: this.props.value,
  };
  handleChange = event => {
    this.props.onChange(event);
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>DateRangeField</label>
        <DateRangeField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderDateRangeField = (props, options) =>
  render(<Story {...props} />, options);

it('should render a text field', () => {
  const { getByLabelText } = renderDateRangeField();
  expect(getByLabelText('DateRangeField')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderDateRangeField({ title: 'foo title' });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderDateRangeField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name', () => {
  const { container } = renderDateRangeField({ name: 'foo' });
  expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
});

it('should call onFocus when the input is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderDateRangeField({ onFocus });
  getByLabelText('DateRangeField').focus();
  expect(getByLabelText('DateRangeField')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderDateRangeField({ onBlur });
  getByLabelText('DateRangeField').focus();
  expect(getByLabelText('DateRangeField')).toHaveFocus();
  getByLabelText('DateRangeField').blur();
  expect(getByLabelText('DateRangeField')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should call onChange when changing the value', () => {
  const onChange = jest.fn();
  const { getByLabelText } = renderDateRangeField({ onChange });
  const event = { target: { value: '10/30/2018 - 10/30/2019' } };
  fireEvent.focus(getByLabelText('DateRangeField'));
  fireEvent.change(getByLabelText('DateRangeField'), event);
  fireEvent.keyDown(getByLabelText('DateRangeField'), { key: 'Enter' });
  fireEvent.keyUp(getByLabelText('DateRangeField'), { key: 'Enter' });
  fireEvent.blur(getByLabelText('DateRangeField'));
  expect(onChange).toHaveBeenCalled();
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderDateRangeField({
      description: 'foo description',
    });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderDateRangeField({ hint: 'foo hint' });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when `badge` is passed', () => {
  it('should render a badge', () => {
    const { getByText } = renderDateRangeField({ badge: 'foo badge' });
    expect(getByText('foo badge')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the input', () => {
    const { getByLabelText } = renderDateRangeField({ isDisabled: true });
    expect(getByLabelText('DateRangeField')).toHaveAttribute('disabled');
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderDateRangeField({ isRequired: true });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderDateRangeField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderDateRangeField({ onInfoButtonClick });
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderDateRangeField({
        touched: true,
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderDateRangeField({
        touched: true,
        errors: { custom: true },
        renderError: () => 'Custom error',
      });
      expect(getByText('Custom error')).toBeInTheDocument();
    });
  });
});
