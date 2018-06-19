import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import invariant from 'invariant';
import { isNumberish } from '@commercetools-local/utils/numbers';
import Contraints from '../../materials/constraints';
import styles from './money-input.mod.css';
import currencies from './currencies.json';
import Currency from './currency';
import CurrencyDropdown from './currency-dropdown';

// The MoneyInput component always operates on a value consisting of:
//   { amount: String, currencyCode: String }
//
// The amount may only use a dot as the decimal separator.
// The currencyCode must be supported by the API.
//
// The MoneyInput does not do any validation on its own. It only serves as a way
// to get the amount and currencyCode input from the user. Validation is always
// up to the parent.
//
// The CTP API supports prices two types of prices: centPrecision and
// highPrecision. The MoneyInput itself does not know about these. However,
// it has two static methods defined (convertToMoneyValue and parseMoneyValue),
// which can be used to convert between MoneyInput value and the MoneyValue
// supported by the API.
// Some places in the API do not support highPrecision prices, but the
// convertToMoneyValue will always return either a centPrecision or a
// highPrecision price. It's up the MoneyInput's parent to show a validation
// error in case a highPrecision price is used.
//
// A value is considered as to have highPrecision when the number of supplied
// fraction digits exceed the number of fraction digits the currency uses. For
// example, 42.00 € is always a centPrecision price, while 42.001 € is always a
// highPrecision price. It is not possible to hae 42.00 € as a highPrecision
// price.
//
// The first time the component renders, we want to try to show the centAmount
// as a formatted number. To achieve this, the parseMoneyValue function can
// be used to turn the API value into a value the MoneyInput understands.
// During this transformation, the money value will get formatted into "amount".
//
// When the user changes the value, we don't want to format again. We only format
// in case the user blurs the field. This avoids many edge cases where the
// formatting would mess with the user's input.
//
//
// A full example of an MoneyValue with centPrecision would be
// {
//   "type": "centPrecision",
//   "currencyCode": "EUR",
//   "centAmount": 4200,
//   "fractionDigits": 2
// }
// which equals 42.00 €
//
// A full example of an MoneyValue with highPrecision would be
// {
//  "type": "highPrecision",
//  "currencyCode": "EUR",
//  "centAmount": 1,
//  "preciseAmount": 123456,
//  "fractionDigits": 7
// }
// which equals 0.0123456 €

// Parses the value returned from <input type="number" />'s onChange function
// The input will only call us with parseable values, or an empty string
// The function will return NaN for the empty string.
export const parseAmount = amount => parseFloat(amount, 10);

// Turns the user input into a value the MoneyInput can pass up through onChange
// In case the number of fraction digits contained in "amount" exceeds the
// number of fraction digits the currency uses, it will emit a price of
// type "highPrecision" instead of the regular "centPrecision".
// It will return "null" in case an invalid value is entered.
// The value is invalid when
//  - no amount was entered
//  - an invalid amount was entered
//  - no currency was selected
//
// This function expects the "amount" to be a trimmed value.
export const createMoneyValue = (currencyCode, amount) => {
  if (!currencyCode) return null;

  const currency = currencies[currencyCode];
  if (!currency) return null;

  if (amount.length === 0 || !isNumberish(amount)) return null;

  const amountAsNumber = parseAmount(amount);
  if (isNaN(amountAsNumber)) return null;

  const centAmount = amountAsNumber * 10 ** currency.fractionDigits;
  const fractionDigitsOfAmount =
    // The input will always use a dot as the separator.
    // That means we don't have to handle a comma.
    String(amountAsNumber).indexOf('.') === -1
      ? 0
      : String(amountAsNumber).length - String(amountAsNumber).indexOf('.') - 1;

  if (fractionDigitsOfAmount > currency.fractionDigits) {
    return {
      type: 'highPrecision',
      currencyCode,
      // For prices with high precision, the cent amount is rounded to the
      // currencies default number of fraction digits
      centAmount: parseFloat(centAmount.toFixed(0), 10),
      preciseAmount: parseInt(
        amountAsNumber * 10 ** fractionDigitsOfAmount,
        10
      ),
      fractionDigits: fractionDigitsOfAmount,
    };
  }

  return {
    type: 'centPrecision',
    currencyCode,
    centAmount,
    fractionDigits: currency.fractionDigits,
  };
};

const formatAmount = (amount, currencyCode) => {
  // fallback in case the user didn't enter an amount yet (or it's invalid)
  const moneyValue = createMoneyValue(currencyCode, amount) || {
    currencyCode,
    centAmount: NaN,
  };
  // format highPrecision so that . gets replaced by, and vice versa.
  if (moneyValue.type === 'highPrecision') {
    return (moneyValue.preciseAmount / 10 ** moneyValue.fractionDigits).toFixed(
      moneyValue.fractionDigits
    );
  }
  return (moneyValue.centAmount / 10 ** moneyValue.fractionDigits).toFixed(
    moneyValue.fractionDigits
  );
};

const getAmountAsNumberFromMoneyValue = money =>
  money.type === 'highPrecision'
    ? money.preciseAmount / 10 ** money.fractionDigits
    : money.centAmount / 10 ** currencies[money.currencyCode].fractionDigits;

const getAmountStyles = props => {
  if (props.isDisabled) return styles['amount-disabled'];
  if (props.hasAmountError) return styles['amount-error'];
  if (props.hasAmountWarning) return styles['amount-warning'];

  return styles['amount-default'];
};

export default class MoneyInput extends React.Component {
  static displayName = 'MoneyInput';

  static convertToMoneyValue = value =>
    createMoneyValue(
      value.currencyCode,
      typeof value.amount === 'string' ? value.amount.trim() : ''
    );

  static parseMoneyValue = moneyValue => {
    if (!moneyValue) return { currencyCode: '', amount: '' };

    invariant(
      typeof moneyValue === 'object',
      'MoneyInput.parseMoneyValue: Value must be passed as an object or be undefined'
    );

    invariant(
      typeof moneyValue.currencyCode === 'string',
      'MoneyInput.parseMoneyValue: Value must contain "currencyCode"'
    );

    invariant(
      Object.hasOwnProperty.call(currencies, moneyValue.currencyCode),
      'MoneyInput.parseMoneyValue: Value must use known currency code'
    );

    invariant(
      // highPrecision or centPrecision values must be set
      typeof moneyValue.centAmount === 'number' ||
        (typeof moneyValue.preciseAmount === 'number' &&
          typeof moneyValue.fractionDigits === 'number'),
      'MoneyInput.parseMoneyValue: Value must contain "amount"'
    );

    const amount = formatAmount(
      String(getAmountAsNumberFromMoneyValue(moneyValue)),
      moneyValue.currencyCode
    );

    return { amount, currencyCode: moneyValue.currencyCode };
  };

  static propTypes = {
    value: PropTypes.shape({
      amount: PropTypes.string.isRequired,
      currencyCode: PropTypes.string.isRequired,
    }).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func,

    hasCurrencyError: PropTypes.bool,
    hasCurrencyWarning: PropTypes.bool,
    hasAmountError: PropTypes.bool,
    hasAmountWarning: PropTypes.bool,

    horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
  };

  static defaultProps = {
    currencies: [],
    horizontalConstraint: 'scale',
  };

  handleCurrencyChange = (currencyCode, toggleMenu) => {
    if (this.props.value.currencyCode !== currencyCode) {
      // When the user changes from a currency with 3 fraction digits to
      // a currency with 2 fraction digits, and when the input value was
      // "9.000" (9), then it should change to "9.00" to reflect the new
      // currency's number of fraction digits.
      // When the currency was a high-precision price, then no digits should
      // be lost
      const formattedAmount = formatAmount(
        this.props.value.amount.trim(),
        currencyCode
      );
      this.props.onChange({
        currencyCode,
        // The user could be changing the currency before entering any amount,
        // or while the amount is invalid. In these cases, we don't attempt to
        // format the amount.
        amount: isNaN(formattedAmount)
          ? this.props.value.amount
          : formattedAmount,
      });
    }
    toggleMenu();
  };

  handleAmountChange = event =>
    this.props.onChange({
      currencyCode: this.props.value.currencyCode,
      amount: event.target.value.trim(),
    });

  handleBlur = () => {
    const amount = this.props.value.amount.trim();
    if (amount.length > 0) {
      const formattedAmount = formatAmount(
        amount,
        this.props.value.currencyCode
      );
      // when the user entered a value with centPrecision, we can format
      // the resulting value to that currency, e.g. 20.1 to 20.10
      if (String(formattedAmount) !== amount) {
        this.props.onChange({
          currencyCode: this.props.value.currencyCode,
          amount: formattedAmount,
        });
      }
    }
    if (this.props.onBlur) this.props.onBlur();
  };

  render() {
    return (
      <Contraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div className={styles['field-container']}>
          {this.props.currencies.length > 0 ? (
            <CurrencyDropdown
              currencies={this.props.currencies}
              currencyCode={this.props.value.currencyCode}
              handleChange={this.handleCurrencyChange}
              isDisabled={this.props.isDisabled}
              hasCurrencyError={this.props.hasCurrencyError}
              hasCurrencyWarning={this.props.hasCurrencyWarning}
            />
          ) : (
            <div
              className={classnames(styles['currency-label'], {
                [styles['currency-label-disabled']]: this.props.isDisabled,
              })}
            >
              <div className={styles['currency-wrapper']}>
                <Currency
                  isDisabled={this.props.isDisabled}
                  currency={this.props.value.currencyCode}
                />
              </div>
            </div>
          )}
          <input
            type="number"
            value={this.props.value.amount}
            className={getAmountStyles({
              isDisabled: this.props.isDisabled,
              hasAmountError: this.props.hasAmountError,
              hasAmountWarning: this.props.hasAmountWarning,
            })}
            placeholder={this.props.placeholder}
            onChange={this.handleAmountChange}
            onBlur={this.handleBlur}
            disabled={this.props.isDisabled}
          />
        </div>
      </Contraints.Horizontal>
    );
  }
}
