import { Component } from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../../../test/test-utils';
import MoneyField from './money-field';
import MoneyInput from '../../../inputs/money-input';

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
    value: PropTypes.shape({
      amount: PropTypes.string.isRequired,
      currencyCode: PropTypes.string.isRequired,
    }),
    id: PropTypes.string,
  };
  static defaultProps = {
    title: 'foo',
    id: 'money-field',
    value: { amount: '', currencyCode: 'EUR' },
    currencies: ['EUR', 'USD'],
  };
  state = {
    value: this.props.value,
  };
  handleChange = (event) => {
    if (this.props.onChange) this.props.onChange(event);

    this.setState((prevState) => ({
      value: {
        ...prevState.value,
        [event.target.name]: event.target.value,
      },
    }));
  };
  render() {
    return (
      <div>
        <label htmlFor={MoneyInput.getAmountInputId(this.props.id)}>
          Amount
        </label>
        <MoneyField
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderMoneyField = (props, options) =>
  render(<Story {...props} />, options);

it('should render a money field', () => {
  const { getByLabelText } = renderMoneyField();
  expect(getByLabelText('Amount')).toBeInTheDocument();
  expect(getByLabelText('EUR')).toBeInTheDocument();
});

it('should render a title', () => {
  const { getByText } = renderMoneyField({ title: 'foo title' });
  expect(getByText('foo title')).toBeInTheDocument();
});

it('should forward data-attributes', () => {
  const { container } = renderMoneyField({ 'data-foo': 'bar' });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name for dropdown and amount input', () => {
  const { container } = renderMoneyField({ name: 'foo' });
  expect(container.querySelector('[name="foo.amount"]')).toBeInTheDocument();
  expect(
    container.querySelector('[name="foo.currencyCode"]')
  ).toBeInTheDocument();
});

it('should pass autocomplete', () => {
  const { getByLabelText } = renderMoneyField({ autoComplete: 'off' });
  expect(getByLabelText('Amount')).toHaveAttribute('autocomplete', 'off');
});

it('should call onFocus when amount input is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderMoneyField({ onFocus });
  getByLabelText('Amount').focus();
  expect(getByLabelText('Amount')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onFocus when currency select is focused', () => {
  const onFocus = jest.fn();
  const { getByLabelText } = renderMoneyField({ onFocus });
  getByLabelText('EUR').focus();
  expect(getByLabelText('EUR')).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});

it('should call onBlur when amount input loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderMoneyField({ onBlur });
  getByLabelText('Amount').focus();
  expect(getByLabelText('Amount')).toHaveFocus();
  getByLabelText('Amount').blur();
  expect(getByLabelText('Amount')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should call onBlur when currency select loses focus', () => {
  const onBlur = jest.fn();
  const { getByLabelText } = renderMoneyField({ onBlur });
  getByLabelText('EUR').focus();
  expect(getByLabelText('EUR')).toHaveFocus();
  getByLabelText('EUR').blur();
  expect(getByLabelText('EUR')).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should focus the amount input automatically when isAutofocussed is passed', () => {
  const { getByLabelText } = renderMoneyField({
    isAutofocussed: true,
  });
  expect(getByLabelText('Amount')).toHaveFocus();
});

it('should call onChange when changing the value', () => {
  const onChange = jest.fn();
  const { getByLabelText } = renderMoneyField({
    id: 'money-field-id',
    name: 'money-field-name',
    onChange,
  });
  fireEvent.change(getByLabelText('Amount'), { target: { value: '20' } });

  fireEvent.focus(getByLabelText('EUR'));
  fireEvent.keyDown(getByLabelText('EUR'), { key: 'ArrowDown' });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith({
    persist: expect.any(Function),
    target: {
      id: 'money-field-id.amount',
      name: 'money-field-name.amount',
      value: '20',
    },
  });

  // change currency to USD using keyboard
  fireEvent.keyDown(getByLabelText('EUR'), { key: 'ArrowDown' });
  fireEvent.keyDown(getByLabelText('EUR'), { key: 'Enter' });

  // it should change the currency
  expect(onChange).toHaveBeenCalledWith({
    persist: expect.any(Function),
    target: {
      id: 'money-field-id.currencyCode',
      name: 'money-field-name.currencyCode',
      value: 'USD',
    },
  });

  // it should move the focus back to the input
  expect(getByLabelText('Amount')).toHaveFocus();

  // onChange should be called when changing the currency
  expect(onChange).toHaveBeenCalledTimes(2);
});

describe('when `description` is passed', () => {
  it('should render a description', () => {
    const { getByText } = renderMoneyField({
      description: 'foo description',
    });
    expect(getByText('foo description')).toBeInTheDocument();
  });
});

describe('when `hint` is passed', () => {
  it('should render a hint', () => {
    const { getByText } = renderMoneyField({ hint: 'foo hint' });
    expect(getByText('foo hint')).toBeInTheDocument();
  });
});

describe('when disabled', () => {
  it('should disable the inputs', () => {
    const { getByLabelText } = renderMoneyField({ isDisabled: true });
    expect(getByLabelText('Amount')).toBeDisabled();
    expect(getByLabelText('EUR')).toBeDisabled();
  });
});

describe('when readOnly', () => {
  it('should make the inputs readonly', () => {
    const { getByLabelText } = renderMoneyField({ isReadOnly: true });
    expect(getByLabelText('Amount')).toHaveAttribute('readonly');
    expect(getByLabelText('EUR').inputMode).toBe('none');
  });
});

describe('when required', () => {
  it('should add `*` to title`', () => {
    const { getByText } = renderMoneyField({ isRequired: true });
    expect(getByText('*')).toBeInTheDocument();
  });
});

describe('when showing an info button', () => {
  it('should render an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderMoneyField({
      onInfoButtonClick,
    });
    expect(getByLabelText('More Info')).toBeInTheDocument();
  });
  it('should call onInfoButtonClick when button is clicked', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = renderMoneyField({ onInfoButtonClick });
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalled();
  });
});

describe('when field is touched and has errors', () => {
  it('should render an id for the error container that is based on the component id', () => {
    const { container } = renderMoneyField({
      touched: { amount: true, currencyCode: true },
      errors: { missing: true },
    });
    expect(container.querySelector('#money-field-errors')).toBeInTheDocument();
  });
  it('should set the aria-errormessage value to the id of the error container', () => {
    const { getByRole } = renderMoneyField({
      touched: { amount: true, currencyCode: true },
      errors: { missing: true },
    });
    expect(getByRole('textbox')).toHaveAccessibleErrorMessage(
      /field is required/i
    );
  });
  describe('when field empty', () => {
    it('should render a default error', () => {
      const { getByText } = renderMoneyField({
        touched: { amount: true, currencyCode: true },
        errors: { missing: true },
      });
      expect(getByText(/field is required/i)).toBeInTheDocument();
    });
  });
  describe('when there is a custom error', () => {
    it('should render the custom error message', () => {
      const { getByText } = renderMoneyField({
        touched: { amount: true, currencyCode: true },
        errors: { customError: true },
        renderError: () => 'Custom error',
      });
      expect(getByText('Custom error')).toBeInTheDocument();
    });
  });
});

describe('when field is touched and has warnings', () => {
  it('should render an id for the warning container that is based on the component id', () => {
    const { container } = renderMoneyField({
      touched: { amount: true, currencyCode: true },
      warnings: { customWarning: true },
      renderWarning: () => 'Custom warning',
    });
    expect(
      container.querySelector('#money-field-warnings')
    ).toBeInTheDocument();
  });
  describe('when there is a custom warning', () => {
    it('should render the custom warning message', () => {
      const { getByText } = renderMoneyField({
        touched: { amount: true, currencyCode: true },
        warnings: { customWarning: true },
        renderWarning: () => 'Custom warning',
      });
      expect(getByText('Custom warning')).toBeInTheDocument();
    });
  });
});

describe('when `hintIcon` is passed', () => {
  it('should render hintIcon and hint', async () => {
    const { findByText } = renderMoneyField({
      hintIcon: <span>icon hint</span>,
      hint: <span>foo hint</span>,
    });
    expect(await findByText('icon hint')).toBeInTheDocument();
    expect(await findByText('foo hint')).toBeInTheDocument();
  });
});
