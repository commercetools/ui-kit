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
    event.persist();
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

  describe('when called with a centPrecision price with weird JS rounding', () => {
    it('should treat it as a decimal separator', () => {
      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'EUR', amount: '2.49' })
      ).toEqual({
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 249,
        fractionDigits: 2,
      });

      // This test ensures that rounding is used instead of just cutting the
      // number of. Cutting it of would result in an incorrect 239998.
      expect(
        MoneyInput.convertToMoneyValue({
          currencyCode: 'EUR',
          amount: '2399.99',
        })
      ).toEqual({
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 239999,
        fractionDigits: 2,
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
      expect(() =>
        MoneyInput.parseMoneyValue({ centAmount: 10 }, 'en')
      ).toThrow(
        'MoneyInput.parseMoneyValue: Value must contain "currencyCode"'
      );
    });
  });
  describe('when called with a centPrecision money missing centAmount', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue(
          {
            type: 'centPrecision',
            currencyCode: 'EUR',
          },
          'en'
        )
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });
  describe('when called with a centPrecision money using an unknown currenyCode', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue(
          {
            type: 'centPrecision',
            currencyCode: 'FOO',
          },
          'en'
        )
      ).toThrow(
        'MoneyInput.parseMoneyValue: Value must use known currency code'
      );
    });
  });
  describe('when called with a highPrecision money missing fractionDigits', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue(
          {
            type: 'highPrecision',
            currencyCode: 'EUR',
            preciseAmount: 3,
          },
          'en'
        )
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });
  describe('when called with a highPrecision money missing preciseAmount', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue(
          {
            type: 'highPrecision',
            currencyCode: 'EUR',
            fractionDigits: 2,
          },
          'en'
        )
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });
  describe('when called without a locale', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue({
          type: 'centPrecision',
          centAmount: 1234,
          currencyCode: 'EUR',
          fractionDigits: 2,
        })
      ).toThrow(
        'MoneyInput.parseMoneyValue: A locale must be passed as the second argument'
      );
    });
  });

  describe('when called with a minimal, valid centPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue(
          {
            centAmount: 1234,
            currencyCode: 'EUR',
          },
          'en'
        )
      ).toEqual({ amount: '12.34', currencyCode: 'EUR' });
    });
  });
  describe('when called with a full, valid centPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue(
          {
            type: 'centPrecision',
            centAmount: 1234,
            currencyCode: 'EUR',
            fractionDigits: 2,
          },
          'en'
        )
      ).toEqual({ amount: '12.34', currencyCode: 'EUR' });
    });
  });
  describe('when called with a minimal highPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue(
          {
            type: 'highPrecision',
            currencyCode: 'EUR',
            fractionDigits: 3,
            preciseAmount: 12345,
          },
          'en'
        )
      ).toEqual({ amount: '12.345', currencyCode: 'EUR' });
    });
  });
  describe('when called with a full highPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue(
          {
            type: 'highPrecision',
            centAmount: 1234,
            currencyCode: 'EUR',
            fractionDigits: 3,
            preciseAmount: 12345,
          },
          'en'
        )
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

  it('should have an HTML name based on the passed name', () => {
    const { getByLabelText } = render(<TestComponent name="foo" />);
    expect(getByLabelText('Amount')).toHaveAttribute('name', 'foo.amount');
  });

  it('should show the passed value', () => {
    const { getByLabelText, getByTestId } = render(
      <TestComponent value={{ amount: '20', currencyCode: 'EUR' }} />
    );
    expect(getByLabelText('Amount')).toHaveAttribute('value', '20');
    expect(getByTestId('money-input-container')).toHaveTextContent('EUR');
  });

  it('should call onFocus when the currency select is focused', () => {
    const onFocus = jest.fn();
    const { getByLabelText } = render(
      <TestComponent
        value={{ amount: '20', currencyCode: 'EUR' }}
        onFocus={onFocus}
      />
    );
    getByLabelText('EUR').focus();
    expect(getByLabelText('EUR')).toHaveFocus();
    expect(onFocus).toHaveBeenCalledWith({
      target: { id: 'some-id.currencyCode', name: 'some-name.currencyCode' },
    });
  });

  it('should call onBlur twice when amount input loses focus for outside element', () => {
    const onBlur = jest.fn();
    const { getByLabelText } = render(
      <TestComponent
        value={{ amount: '20', currencyCode: 'EUR' }}
        onBlur={onBlur}
      />
    );
    getByLabelText('Amount').focus();
    expect(getByLabelText('Amount')).toHaveFocus();
    getByLabelText('Amount').blur();
    expect(getByLabelText('Amount')).not.toHaveFocus();

    // onBlur should be called twice as we want to mark both,
    // currency dropdown and amount input as touched when the element
    // which gained focus is not part of the MoneyInput
    expect(onBlur).toHaveBeenCalledWith({
      target: { id: 'some-id.currencyCode', name: 'some-name.currencyCode' },
    });
    expect(onBlur).toHaveBeenCalledWith({
      target: { id: 'some-id.amount', name: 'some-name.amount' },
    });
  });

  it('should call onBlur twice when currency select loses focus', () => {
    const onBlur = jest.fn();
    const { getByLabelText } = render(
      <TestComponent
        value={{ amount: '20', currencyCode: 'EUR' }}
        onBlur={onBlur}
      />
    );
    getByLabelText('EUR').focus();
    expect(getByLabelText('EUR')).toHaveFocus();
    getByLabelText('EUR').blur();
    expect(getByLabelText('EUR')).not.toHaveFocus();

    // onBlur should be called twice as we want to mark both,
    // currency dropdown and amount input as touched when the element
    // which gained focus is not part of the MoneyInput
    expect(onBlur).toHaveBeenCalledWith({
      target: { id: 'some-id.currencyCode', name: 'some-name.currencyCode' },
    });
    expect(onBlur).toHaveBeenCalledWith({
      target: { id: 'some-id.amount', name: 'some-name.amount' },
    });
  });

  it('should not call onBlur when focus switches from currency to amount', () => {
    const onBlur = jest.fn();
    const { getByLabelText } = render(
      <TestComponent
        value={{ amount: '20', currencyCode: 'EUR' }}
        onBlur={onBlur}
      />
    );
    getByLabelText('EUR').focus();
    expect(getByLabelText('EUR')).toHaveFocus();

    getByLabelText('Amount').focus();
    expect(getByLabelText('EUR')).not.toHaveFocus();
    expect(getByLabelText('Amount')).toHaveFocus();

    expect(onBlur).not.toHaveBeenCalled();
  });

  it('should not call onBlur when focus switches from amount to currency', () => {
    const onBlur = jest.fn();
    const { getByLabelText } = render(
      <TestComponent
        value={{ amount: '20', currencyCode: 'EUR' }}
        onBlur={onBlur}
      />
    );

    getByLabelText('Amount').focus();
    expect(getByLabelText('Amount')).toHaveFocus();

    getByLabelText('EUR').focus();
    expect(getByLabelText('EUR')).toHaveFocus();
    expect(getByLabelText('Amount')).not.toHaveFocus();

    expect(onBlur).not.toHaveBeenCalled();
  });

  it('should allow changing the amount with numbers', () => {
    let event;

    const onChange = e => {
      event = {
        persist: e.persist,
        target: {
          value: e.target.value,
          name: e.target.name,
        },
      };
    };
    const { getByLabelText } = render(<TestComponent onChange={onChange} />);

    fireEvent.change(getByLabelText('Amount'), { target: { value: '12' } });

    // event should be the updated amount
    expect(event).toEqual({
      persist: expect.any(Function),
      target: {
        name: 'some-name.amount',
        value: '12',
      },
    });
  });

  it('should not allow changing the amount with invalid numbers', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<TestComponent onChange={onChange} />);

    fireEvent.change(getByLabelText('Amount'), {
      target: { value: 'non number' },
    });

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('should allow changing the currency', () => {
    const onChange = jest.fn();

    // We add labels here to be able to find the elements by their id and to
    // ensure the MoneyInput is usable in forms which use labels
    const { getByLabelText } = render(<TestComponent onChange={onChange} />);

    // open using keyboard
    fireEvent.focus(getByLabelText('EUR'));
    fireEvent.keyDown(getByLabelText('EUR'), { key: 'ArrowDown' });

    // change currency to USD using keyboard
    fireEvent.keyDown(getByLabelText('EUR'), { key: 'ArrowDown' });
    fireEvent.keyDown(getByLabelText('EUR'), { key: 'Enter' });

    // onChange should be called when changing the currency
    expect(onChange).toHaveBeenCalledWith({
      persist: expect.any(Function),
      target: {
        id: 'some-id.currencyCode',
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
    fireEvent.change(getByLabelText('Amount'), {
      target: { value: '12' },
    });

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

    // open currency dropdown using keyboard
    fireEvent.focus(getByLabelText('EUR'));
    fireEvent.keyDown(getByLabelText('EUR'), { key: 'ArrowDown' });

    // change currency to KWD using keyboard
    fireEvent.keyDown(getByLabelText('EUR'), { key: 'ArrowDown' });
    fireEvent.keyDown(getByLabelText('EUR'), { key: 'Enter' });

    // We can't use .toHaveAttribute('value', ' 12.500') as the attribute
    // itself does not change in the DOM tree. Only the actual value changes.
    expect(getByLabelText('Amount').value).toEqual('12.500');
  });

  describe('when the locale is custom', () => {
    // The implementation of MoneyInput relies on Number.prototype.toLocaleString,
    // but it only respects the english format in JSDOM, so we need to mock it.
    const originalToLocaleString = Number.prototype.toLocaleString;
    beforeEach(() => {
      // eslint-disable-next-line no-extend-native
      Number.prototype.toLocaleString = jest.fn(function toLocaleString(
        language,
        options
      ) {
        return `(${this}).toLocaleString(${language}, ${JSON.stringify(
          options
        )})`;
      });
    });
    afterEach(() => {
      // eslint-disable-next-line no-extend-native
      Number.prototype.toLocaleString = originalToLocaleString;
    });

    it('should format the amount on blur to US format when locale is en', () => {
      const { getByLabelText } = render(
        <TestComponent
          currencies={['EUR']}
          value={{ currencyCode: 'EUR', amount: '12.5' }}
        />,
        { locale: 'en' }
      );

      //
      getByLabelText('Amount').focus();
      fireEvent.blur(getByLabelText('Amount'));

      // We can't use .toHaveAttribute() as the attribute
      // itself does not change in the DOM tree. Only the actual value changes.
      expect(getByLabelText('Amount').value).toEqual(
        '(12.5).toLocaleString(en, {"minimumFractionDigits":2})'
      );
    });

    it('should format the amount on blur to german format when locale is de', () => {
      const { getByLabelText } = render(
        <TestComponent
          currencies={['EUR']}
          value={{ currencyCode: 'EUR', amount: '12.5' }}
        />,
        { locale: 'de' }
      );

      getByLabelText('Amount').focus();
      fireEvent.blur(getByLabelText('Amount'));

      // We can't use .toHaveAttribute() as the attribute
      // itself does not change in the DOM tree. Only the actual value changes.
      expect(getByLabelText('Amount').value).toEqual(
        '(12.5).toLocaleString(de, {"minimumFractionDigits":2})'
      );
    });
  });

  it('should have focus the amount input automatically when isAutofocussed is passed', () => {
    const { getByLabelText } = render(<TestComponent isAutofocussed={true} />);
    expect(getByLabelText('Amount')).toHaveFocus();
  });

  it('should render a readonly input when readonly', () => {
    const { getByLabelText } = render(<TestComponent isReadOnly={true} />);
    expect(getByLabelText('Amount')).toHaveAttribute('readonly');
  });
  it('should render a disabled currency select when readonly', () => {
    const { getByLabelText } = render(<TestComponent isReadOnly={true} />);
    expect(getByLabelText('EUR')).toHaveAttribute('disabled');
  });
});
