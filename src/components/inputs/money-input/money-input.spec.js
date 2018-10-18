import React from 'react';
import PropTypes from 'prop-types';
import MoneyInput from './money-input';
import { render, fireEvent } from '../../../test-utils';

// We use this component to simulate the whole flow of
// changing a value and formatting on blur.
class TestComponent extends React.Component {
  state = {
    value: this.props.value,
  };
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.shape({
      amount: PropTypes.string,
      currencyCode: PropTypes.string,
    }),
    onChange: PropTypes.func,
  };
  static defaultProps = {
    id: 'some-id',
    name: 'some-name',
    value: {
      currencyCode: 'EUR',
      amount: '12.50',
    },
    currencies: ['EUR', 'USD'],
  };
  handleChange = event => {
    if (event.target.name === 'some-name.amount') {
      this.setState(prevState => ({
        value: { ...prevState.value, amount: event.target.value },
      }));
    }
    if (event.target.name === 'some-name.currencyCode') {
      this.setState(prevState => ({
        value: { ...prevState.value, currencyCode: event.target.value },
      }));
    }
  };
  render() {
    return (
      <React.Fragment>
        <label htmlFor={MoneyInput.getAmountInputId(this.props.id)}>
          Amount
        </label>
        <label htmlFor={MoneyInput.getCurrencyDropdownId(this.props.id)}>
          Currency Code
        </label>
        <MoneyInput
          {...this.props}
          onChange={this.props.onChange || this.handleChange}
          value={this.state.value}
        />
      </React.Fragment>
    );
  }
}

describe('MoneyInput.getCurrencyDropdownId', () => {
  describe('when an id is passed', () => {
    it('should return the created it', () => {
      expect(MoneyInput.getCurrencyDropdownId('foo')).toBe('foo.currencyCode');
    });
  });
  describe('when no id is passed', () => {
    it('should return no id', () => {
      expect(MoneyInput.getCurrencyDropdownId()).toBe(undefined);
    });
  });
});

describe('MoneyInput.getAmountInputId', () => {
  describe('when an id is passed', () => {
    it('should return the created it', () => {
      expect(MoneyInput.getAmountInputId('foo')).toBe('foo.amount');
    });
  });
  describe('when no id is passed', () => {
    it('should return no id', () => {
      expect(MoneyInput.getAmountInputId()).toBe(undefined);
    });
  });
});

describe('MoneyInput.convertToMoneyValue', () => {
  describe('when there is no currency code', () => {
    it('should return an invalid object', () => {
      expect(MoneyInput.convertToMoneyValue({ amount: '1' })).toEqual(null);
    });
  });
  describe('when an unknown currency is used', () => {
    it('should return an invalid object', () => {
      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'foo', amount: '1' })
      ).toEqual(null);
    });
  });

  describe('when no amount is present', () => {
    it('should return an invalid object', () => {
      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'EUR', amount: '' })
      ).toEqual(null);
      expect(MoneyInput.convertToMoneyValue({ currencyCode: 'EUR' })).toEqual(
        null
      );
    });
  });

  describe('when amount can not be parsed', () => {
    it('should return an error object', () => {
      // The function generally only needs to handle values
      // which the input[type=number] emits
      // All those are guaranteed to be parseable by the browsers anyways.
      // So the case described here can only happen when the function is called
      // with an amount not obtained through the browser.
      //
      // Examples for such non-input values would be '1.2.3' and '1,2.3'
      //
      // In case we ever switch the input to type="text", we should add more
      // tests here.

      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'EUR', amount: 'foo' })
      ).toEqual(null);
    });
  });

  // The browser always transforms "1,2" to "1.2" on the event
  // so we don't need to handle the comma case.
  describe('when called with a centPrecision price', () => {
    it('should treat it as a decimal separator', () => {
      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'EUR', amount: '1.2' })
      ).toEqual({
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 120,
        fractionDigits: 2,
      });

      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'KWD', amount: '1.234' })
      ).toEqual({
        type: 'centPrecision',
        currencyCode: 'KWD',
        centAmount: 1234,
        fractionDigits: 3,
      });
    });
  });

  describe('when called with a high precision price', () => {
    it('should return a money value of type "highPrecision"', () => {
      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'EUR', amount: '1.234' })
      ).toEqual({
        type: 'highPrecision',
        currencyCode: 'EUR',
        centAmount: 123,
        fractionDigits: 3,
        preciseAmount: 1234,
      });
    });
  });
});

describe('MoneyInput.parseMoneyValue', () => {
  describe('when called without a value', () => {
    it('should return a default value', () => {
      expect(MoneyInput.parseMoneyValue()).toEqual({
        currencyCode: '',
        amount: '',
      });
    });
  });
  describe('when called with a value missing currencyCode', () => {
    it('should throw', () => {
      expect(() => MoneyInput.parseMoneyValue({ centAmount: 10 })).toThrow(
        'MoneyInput.parseMoneyValue: Value must contain "currencyCode"'
      );
    });
  });
  describe('when called with a centPrecision money missing centAmount', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue({
          type: 'centPrecision',
          currencyCode: 'EUR',
        })
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });
  describe('when called with a centPrecision money using an unknown currenyCode', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue({
          type: 'centPrecision',
          currencyCode: 'FOO',
        })
      ).toThrow(
        'MoneyInput.parseMoneyValue: Value must use known currency code'
      );
    });
  });
  describe('when called with a highPrecision money missing fractionDigits', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue({
          type: 'highPrecision',
          currencyCode: 'EUR',
          preciseAmount: 3,
        })
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });
  describe('when called with a highPrecision money missing preciseAmount', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue({
          type: 'highPrecision',
          currencyCode: 'EUR',
          fractionDigits: 2,
        })
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });

  describe('when called with a minimal, valid centPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue({
          centAmount: 1234,
          currencyCode: 'EUR',
        })
      ).toEqual({ amount: '12.34', currencyCode: 'EUR' });
    });
  });
  describe('when called with a full, valid centPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue({
          type: 'centPrecision',
          centAmount: 1234,
          currencyCode: 'EUR',
          fractionDigits: 2,
        })
      ).toEqual({ amount: '12.34', currencyCode: 'EUR' });
    });
  });
  describe('when called with a minimal highPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue({
          type: 'highPrecision',
          currencyCode: 'EUR',
          fractionDigits: 3,
          preciseAmount: 12345,
        })
      ).toEqual({ amount: '12.345', currencyCode: 'EUR' });
    });
  });
  describe('when called with a full highPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue({
          type: 'highPrecision',
          centAmount: 1234,
          currencyCode: 'EUR',
          fractionDigits: 3,
          preciseAmount: 12345,
        })
      ).toEqual({ amount: '12.345', currencyCode: 'EUR' });
    });
  });
});

describe('MoneyInput.isEmpty', () => {
  describe('when value is filled out', () => {
    it('should return false', () => {
      expect(MoneyInput.isEmpty({ amount: '5', currencyCode: 'EUR' })).toBe(
        false
      );
    });
  });
  describe('when value is empty', () => {
    it('should return true', () => {
      expect(MoneyInput.isEmpty({ amount: '', currencyCode: 'EUR' })).toBe(
        true
      );
      expect(MoneyInput.isEmpty({ amount: '5', currencyCode: '' })).toBe(true);
      expect(MoneyInput.isEmpty()).toBe(true);
    });
  });
});

describe('MoneyInput.isHighPrecision', () => {
  describe('when called with a high precision money value', () => {
    it('should return true', () => {
      expect(
        MoneyInput.isHighPrecision({ amount: '2.001', currencyCode: 'EUR' })
      ).toBe(true);
    });
  });
  describe('when called with a regular precision money value', () => {
    it('should return false', () => {
      expect(
        MoneyInput.isHighPrecision({ amount: '2.00', currencyCode: 'EUR' })
      ).toBe(false);
    });
  });
  describe('when called with an empty money value', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.isHighPrecision({ amount: '', currencyCode: 'EUR' })
      ).toThrow();
    });
  });
});

// -----------------------------------------------------------------------------

describe('MoneyInput', () => {
  it('should forward data-attributes', () => {
    const { getByLabelText } = render(<TestComponent data-foo="bar" />);
    expect(getByLabelText('Amount')).toHaveAttribute('data-foo', 'bar');
  });

  it('should render a number input', () => {
    const { getByLabelText } = render(<TestComponent />);
    expect(getByLabelText('Amount')).toHaveAttribute('type', 'number');
  });

  it('should have an HTML name based on the passed name', () => {
    const { getByLabelText } = render(<TestComponent name="foo" />);
    expect(getByLabelText('Amount')).toHaveAttribute('name', 'foo.amount');
  });

  it('should show the passed value', () => {
    const { getByLabelText } = render(
      <TestComponent value={{ amount: '20', currencyCode: 'EUR' }} />
    );
    expect(getByLabelText('Amount')).toHaveAttribute('value', '20');
    expect(getByLabelText('Currency Code')).toHaveTextContent('EUR');
  });

  it('should allow changing the amount', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<TestComponent onChange={onChange} />);

    const event = { target: { value: '12' } };
    fireEvent.change(getByLabelText('Amount'), event);

    // onChange should be called with the updated amount
    expect(onChange).toHaveBeenCalledWith({
      persist: expect.any(Function),
      target: {
        name: 'some-name.amount',
        value: '12',
      },
    });
  });

  it('should allow changing the currency', () => {
    const onChange = jest.fn();

    // We add labels here to be able to find the elements by their id and to
    // ensure the MoneyInput is usable in forms which use labels
    const { getByLabelText } = render(<TestComponent onChange={onChange} />);

    // open
    fireEvent.click(getByLabelText('Currency Code'));

    // change currency to USD
    fireEvent.click(document.querySelector('[aria-label="USD"]'));

    // onChange should be called when changing the currency
    expect(onChange).toHaveBeenCalledWith({
      persist: expect.any(Function),
      target: {
        name: 'some-name.currencyCode',
        value: 'USD',
      },
    });

    // the amount input should have focus after changing the currency
    expect(getByLabelText('Amount')).toHaveFocus();
  });

  it('should format the amount on blur', () => {
    const { getByLabelText } = render(<TestComponent />);

    // change amount
    fireEvent.change(getByLabelText('Amount'), { target: { value: '12' } });

    // blur amount
    fireEvent.blur(getByLabelText('Amount'));

    // input should have the formatted value after blurring
    expect(getByLabelText('Amount')).toHaveAttribute('value', '12.00');
  });

  // The original currency (EUR) uses 2 fraction digits, whereas the
  // next currency (KWD) uses 3 fraction digits.
  // We expect the last fraction to get added when changing the value
  it('should format the amount when the currency changes', async () => {
    const { getByLabelText } = render(
      <TestComponent
        currencies={['EUR', 'KWD']}
        value={{ currencyCode: 'EUR', amount: '12.50' }}
      />
    );

    // change currency
    fireEvent.click(getByLabelText('Currency Code'));

    // change currency to KWD
    fireEvent.click(document.querySelector('[aria-label="KWD"]'));

    expect(getByLabelText('Currency Code')).toHaveTextContent('KWD');

    // We can't use .toHaveAttribute('value', ' 12.500') as the attribute
    // itself does not change in the DOM tree. Only the actual value changes.
    expect(getByLabelText('Amount').value).toEqual('12.500');
  });
});
