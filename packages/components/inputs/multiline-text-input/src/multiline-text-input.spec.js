import { Component } from 'react';
import PropTypes from 'prop-types';
import { screen, render, fireEvent } from '../../../../../test/test-utils';
import MultilineTextInput from './multiline-text-input';

class TestComponent extends Component {
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
      <>
        <label htmlFor={this.props.id}>Description</label>
        <MultilineTextInput
          {...this.props}
          value={this.state.value}
          onChange={this.props.onChange || this.handleChange}
        />
      </>
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
    render(<TestComponent data-foo="bar" />);
    expect(screen.getByLabelText('Description')).toHaveAttribute(
      'data-foo',
      'bar'
    );
  });

  it('should have role `textbox`', () => {
    render(<TestComponent />);
    expect(screen.getByLabelText('Description')).toHaveAttribute(
      'role',
      'textbox'
    );
  });

  it('should have role aria-multiline set to `true`', () => {
    render(<TestComponent />);
    expect(screen.getByLabelText('Description')).toHaveAttribute(
      'aria-multiline',
      'true'
    );
  });

  it('should pass autoComplete', () => {
    render(<TestComponent autoComplete="off" />);
    expect(screen.getByLabelText('Description')).toHaveAttribute(
      'autoComplete',
      'off'
    );
  });

  it('should forward html name', () => {
    render(<TestComponent name="field1" />);
    expect(screen.getByLabelText('Description')).toHaveAttribute(
      'name',
      'field1'
    );
  });

  it('should render a textarea', () => {
    render(<TestComponent />);
    expect(screen.getByLabelText('Description').tagName.toLowerCase()).toEqual(
      'textarea'
    );
  });

  it('should forward the passed value', () => {
    render(<TestComponent value="foo" />);
    expect(screen.getByLabelText('Description').value).toEqual('foo');
  });

  it('should forward the placeholder', () => {
    render(<TestComponent placeholder="Enter a description" />);
    expect(screen.getByLabelText('Description')).toHaveAttribute(
      'placeholder',
      'Enter a description'
    );
  });

  it('should have focus automatically when isAutofocussed is passed', () => {
    render(<TestComponent isAutofocussed={true} />);
    expect(screen.getByLabelText('Description')).toHaveFocus();
  });

  it('should have ARIA properties for the readonly state', () => {
    render(<TestComponent isReadOnly={true} />);
    expect(screen.getByLabelText('Description')).toHaveAttribute(
      'aria-readonly',
      'true'
    );
  });

  it('should forward disabled attribute when disabled', () => {
    render(<TestComponent isDisabled={true} />);
    expect(screen.getByLabelText('Description')).toBeDisabled();
  });

  it('should call onFocus when the input is focused', async () => {
    const onFocus = jest.fn();
    render(<TestComponent onFocus={onFocus} />);
    const textArea = screen.getByLabelText('Description');
    await fireEvent.asyncFocus(textArea);
    expect(textArea).toHaveFocus();
    expect(onFocus).toHaveBeenCalled();
  });

  it('should call onBlur when the input is loses focus', async () => {
    const onBlur = jest.fn();
    render(<TestComponent onBlur={onBlur} />);
    const textArea = screen.getByLabelText('Description');
    await fireEvent.asyncFocus(textArea);
    expect(textArea).toHaveFocus();
    await fireEvent.asyncBlur(textArea);
    expect(onBlur).toHaveBeenCalled();
  });

  it('should allow changing value of the textarea', () => {
    render(<TestComponent />);
    const event = { target: { value: 'I want chicken' } };
    const textArea = screen.getByLabelText('Description');
    fireEvent.focus(textArea);
    fireEvent.change(textArea, event);
    fireEvent.keyDown(textArea, { key: 'Enter' });
    fireEvent.keyUp(textArea, { key: 'Enter' });
    expect(textArea.value).toEqual('I want chicken');
  });
});
