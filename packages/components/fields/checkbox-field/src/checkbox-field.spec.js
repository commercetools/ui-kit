import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../../../test/test-utils';
import CheckboxField from './checkbox-field';

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
    id: 'checkbox-field',
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
        <label htmlFor={this.props.id}>CheckboxField</label>
        <CheckboxField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        >
          Accept Terms
        </CheckboxField>
      </div>
    );
  }
}

const renderCheckboxField = (customProps, options) => {
  const props = {
    title: 'CheckBox Field',
    onChange: jest.fn(),
    ...customProps,
  };
  return {
    ...render(<Story {...props} />, options),
    onChange: props.onChange,
  };
};

describe('CheckboxField', () => {
  it('should render a checkbox field', () => {
    const { getByLabelText } = renderCheckboxField();
    expect(getByLabelText('Accept Terms')).toBeInTheDocument();
  });

  it('should have an HTML name', () => {
    const { container } = renderCheckboxField({ name: 'foo' });
    expect(container.querySelector('[name="foo"]')).toBeInTheDocument();
  });

  it('should call onChange when changing the value', () => {
    const { getByLabelText, onChange } = renderCheckboxField({
      isChecked: true,
    });
    fireEvent.click(getByLabelText(/CheckboxField/));
    expect(onChange).toHaveBeenCalled();
  });

  describe('when `description` is passed', () => {
    it('should render a description', () => {
      const { getByText } = renderCheckboxField({
        description: 'foo description',
      });
      expect(getByText('foo description')).toBeInTheDocument();
    });
  });

  describe('when `hint` is passed', () => {
    it('should render a hint', () => {
      const { getByText } = renderCheckboxField({ hint: 'foo hint' });
      expect(getByText('foo hint')).toBeInTheDocument();
    });
  });

  describe('when `hintIcon` is passed', () => {
    it('should render hintIcon and hint', () => {
      const { getByText } = renderCheckboxField({
        hintIcon: <span>icon hint</span>,
        hint: <span>foo hint</span>,
      });
      expect(getByText('icon hint')).toBeInTheDocument();
      expect(getByText('foo hint')).toBeInTheDocument();
    });
  });

  describe('when `badge` is passed', () => {
    it('should render a badge', () => {
      const { getByText } = renderCheckboxField({ badge: 'foo badge' });
      expect(getByText('foo badge')).toBeInTheDocument();
    });
  });

  describe('when disabled', () => {
    it('should disable the input', () => {
      const { getByLabelText } = renderCheckboxField({ isDisabled: true });
      expect(getByLabelText(/CheckboxField/)).toBeDisabled();
    });
  });

  describe('when readOnly', () => {
    it('should disable the input', () => {
      const { getByLabelText } = renderCheckboxField({ isReadOnly: true });
      expect(getByLabelText(/CheckboxField/)).toHaveAttribute('readonly');
    });
  });

  describe('when required', () => {
    it('should add `*` to title`', () => {
      const { getByText } = renderCheckboxField({ isRequired: true });
      expect(getByText('*')).toBeInTheDocument();
    });
  });

  describe('when showing an info button', () => {
    it('should render an info button', () => {
      const onInfoButtonClick = jest.fn();
      const { getByLabelText } = renderCheckboxField({
        onInfoButtonClick,
      });
      expect(getByLabelText('More Info')).toBeInTheDocument();
    });
    it('should call onInfoButtonClick when button is clicked', () => {
      const onInfoButtonClick = jest.fn();
      const { getByLabelText } = renderCheckboxField({ onInfoButtonClick });
      getByLabelText('More Info').click();
      expect(onInfoButtonClick).toHaveBeenCalled();
    });
  });

  describe('when field is touched and has errors', () => {
    describe('when field empty', () => {
      it('should render a default error', () => {
        const { getByText } = renderCheckboxField({
          touched: true,
          errors: { missing: true },
        });
        expect(getByText(/field is required/i)).toBeInTheDocument();
      });
    });
    describe('when there is a custom error', () => {
      it('should render the custom error message', () => {
        const { getByText } = renderCheckboxField({
          touched: true,
          errors: { custom: true },
          renderError: () => 'Custom error',
        });
        expect(getByText('Custom error')).toBeInTheDocument();
      });
    });
  });
});
