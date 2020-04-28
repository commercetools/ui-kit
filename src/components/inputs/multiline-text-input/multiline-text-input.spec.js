import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../../test/test-utils';
import MultilineTextInput from './multiline-text-input';

class TestComponent extends React.Component {
  static displayName = 'TestComponent';
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    id: 'some-test-id',
    name: 'some-name',
    value: '',
    intl: {
      formatMessage: jest.fn((message) => message.id),
    },
  };

  state = {
    value: this.props.value || '',
  };

  handleChange = (event) => {
    event.persist();
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <label htmlFor={this.props.id}>Description</label>
        <MultilineTextInput
          {...this.props}
          value={this.state.value}
          onChange={this.props.onChange || this.handleChange}
        />
      </React.Fragment>
    );
  }
}

describe('MultilineTextInput.isEmpty', () => {
  describe('when called with an empty value', () => {
    it('should return true', () => {
      expect(MultilineTextInput.isEmpty('')).toBe(true);
      expect(MultilineTextInput.isEmpty(' ')).toBe(true);
    });
  });

  describe('when called with a filled value', () => {
    it('should return false', () => {
      expect(MultilineTextInput.isEmpty('a')).toBe(false);
      expect(MultilineTextInput.isEmpty(' a ')).toBe(false);
    });
  });
});

describe('MultilineTextInput', () => {
  it('should forward data-attributes', () => {
    const { getByLabelText } = render(<TestComponent data-foo="bar" />);
    expect(getByLabelText('Description')).toHaveAttribute('data-foo', 'bar');
  });

  it('should have role `textbox`', () => {
    const { getByLabelText } = render(<TestComponent />);
    expect(getByLabelText('Description')).toHaveAttribute('role', 'textbox');
  });

  it('should have role aria-multiline set to `true`', () => {
    const { getByLabelText } = render(<TestComponent />);
    expect(getByLabelText('Description')).toHaveAttribute(
      'aria-multiline',
      'true'
    );
  });

  it('should pass autoComplete', () => {
    const { getByLabelText } = render(<TestComponent autoComplete="off" />);
    expect(getByLabelText('Description')).toHaveAttribute(
      'autoComplete',
      'off'
    );
  });

  it('should forward html name', () => {
    const { getByLabelText } = render(<TestComponent name="field1" />);
    expect(getByLabelText('Description')).toHaveAttribute('name', 'field1');
  });

  it('should render a textarea', () => {
    const { getByLabelText } = render(<TestComponent />);
    expect(getByLabelText('Description').tagName.toLowerCase()).toEqual(
      'textarea'
    );
  });

  it('should forward the passed value', () => {
    const { getByLabelText } = render(<TestComponent value="foo" />);
    expect(getByLabelText('Description').value).toEqual('foo');
  });

  it('should forward the placeholder', () => {
    const { getByLabelText } = render(
      <TestComponent placeholder="Enter a description" />
    );
    expect(getByLabelText('Description')).toHaveAttribute(
      'placeholder',
      'Enter a description'
    );
  });

  it('should have focus automatically when isAutofocussed is passed', () => {
    const { getByLabelText } = render(<TestComponent isAutofocussed={true} />);
    expect(getByLabelText('Description')).toHaveFocus();
  });

  it('should have ARIA properties for the readonly state', () => {
    const { getByLabelText } = render(<TestComponent isReadOnly={true} />);
    expect(getByLabelText('Description')).toHaveAttribute(
      'aria-readonly',
      'true'
    );
  });

  it('should forward disabled attribute when disabled', () => {
    const { getByLabelText } = render(<TestComponent isDisabled={true} />);
    expect(getByLabelText('Description')).toHaveAttribute('disabled');
  });

  it('should call onFocus when the input is focused', () => {
    const onFocus = jest.fn();
    const { getByLabelText } = render(<TestComponent onFocus={onFocus} />);
    const textArea = getByLabelText('Description');
    textArea.focus();
    expect(textArea).toHaveFocus();
    expect(onFocus).toHaveBeenCalled();
  });

  it('should call onBlur when the input is loses focus', () => {
    const onBlur = jest.fn();
    const { getByLabelText } = render(<TestComponent onBlur={onBlur} />);
    const textArea = getByLabelText('Description');
    textArea.focus();
    expect(textArea).toHaveFocus();
    textArea.blur();
    expect(onBlur).toHaveBeenCalled();
  });

  it('should allow changing value of the textarea', () => {
    const { getByLabelText } = render(<TestComponent />);
    const event = { target: { value: 'I want chicken' } };
    const textArea = getByLabelText('Description');
    fireEvent.focus(textArea);
    fireEvent.change(textArea, event);
    fireEvent.keyDown(textArea, { key: 'Enter' });
    fireEvent.keyUp(textArea, { key: 'Enter' });
    expect(textArea.value).toEqual('I want chicken');
  });
});
