import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Downshift from 'downshift';
import { injectIntl, intlShape } from 'react-intl';
import {
  getSeparatorsForLocale,
  isNumberish,
} from '@commercetools-local/utils/numbers';
import { CaretDownIcon, CaretUpIcon } from '../../icons';
import AccessibleButton from '../../buttons/accessible-button';
import Contraints from '../../materials/constraints';
import messages from './messages';
import styles from './money-input.mod.css';
import currencies from './currencies.json';

// The first time the component renders, we want to try to show the centAmount
// as a formatted number
// When the user changes the value, we don't want to format again.. only when
// the user blurs the field.
//
// When the user types in 22.1, we want the centAmount to be 2210, not 221.
// This needs to happen for all currencies, but only for centPrecision.
//
// The input can operate with two precisions: centPrecision and highPrecision
//   - centPrecision means the input will use NaN for centAmountAsNumberwhen the
//     fractionDigits of the currency are exceeded
//   - highPrecision will allow up to 20 fractionDigits and use NaN otherwise
//
// A full example of an Money value (centPrecision) would be
// {
//   "type": "centPrecision",
//   "currencyCode": "EUR",
//   "centAmount": 4200,
//   "fractionDigits": 2
// }
// which equals 42.00 €
//
// A full example of an HighPrecisionMoney value (highPrecision) would be
// {
//  "type": "highPrecision",
//  "currencyCode": "EUR",
//  "centAmount": 1,
//  "preciseAmount": 123456,
//  "fractionDigits": 7
// }
// which equals 0.0123456 €
//
// When enableHpp is true, the input will call onChange with either
// a HighPrecisionMoney or a regular Money value, depending on the currency
// and the number of provided fraction digits. It will be called with a
// HighPrecisionMoney value when the number of fraction digits exceeds the
// default number of fraction digits of that currency.

const parseAmount = ({ amount, separators }) => {
  const replaceCommas = RegExp(separators.thoSeparator, 'gi');
  const centAmountWithoutFormat = amount.replace(replaceCommas, '');

  const parsedAmount = parseFloat(centAmountWithoutFormat, 10);
  if (isNaN(parsedAmount)) return NaN;
  return parsedAmount;
};

const getCurrencyDropdownSelectStyles = props => {
  if (props.isDisabled) return styles['currency-disabled'];
  if (props.hasCurrencyError) return styles['currency-error'];
  if (props.hasCurrencyWarning) return styles['currency-warning'];
  if (props.isOpen) return styles['currency-active'];

  return styles['currency-default'];
};

const getCurrencyDropdownOptionsStyles = props => {
  if (props.hasCurrencyError) return styles['options-wrapper-error'];
  if (props.hasCurrencyWarning) return styles['options-wrapper-warning'];

  return styles['options-wrapper-active'];
};

const getAmountStyles = props => {
  if (props.isDisabled) return styles['amount-disabled'];
  if (props.hasAmountError) return styles['amount-error'];
  if (props.hasAmountWarning) return styles['amount-warning'];

  return styles['amount-default'];
};

export const Currency = props => (
  <AccessibleButton
    label={props.currency}
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    className={classnames(styles['currency-button'], {
      [styles['currency-button-disabled']]: props.isDisabled,
    })}
  >
    {props.currency}
  </AccessibleButton>
);

Currency.displayName = 'Currency';
Currency.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  currency: PropTypes.string.isRequired,
};

export const DropdownChevron = props => (
  <AccessibleButton
    label={props.intl.formatMessage(messages.chevronLabel)}
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    isOpen={props.isOpen}
    className={classnames(styles['chevron-icon'], {
      [styles['chevron-icon-disabled']]: props.isDisabled,
    })}
  >
    <div className={styles['icon-wrapper']}>
      {props.isOpen ? (
        <CaretUpIcon size="scale" />
      ) : (
        <CaretDownIcon size="scale" />
      )}
    </div>
  </AccessibleButton>
);

DropdownChevron.displayName = 'DropdownChevron';
DropdownChevron.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,

  // Intl
  intl: intlShape,
};

export const DropdownChevronWithIntl = injectIntl(DropdownChevron);

export const Option = props => (
  <AccessibleButton
    label={props.children}
    onClick={props.onClick}
    className={styles['option-wrapper']}
  >
    {props.children}
  </AccessibleButton>
);
Option.displayName = 'Option';
Option.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export const CurrencyDropdown = props => (
  <Downshift
    render={({ isOpen, toggleMenu }) => (
      <div
        className={getCurrencyDropdownSelectStyles({
          isDisabled: props.isDisabled,
          hasCurrencyError: props.hasCurrencyError,
          hasCurrencyWarning: props.hasCurrencyWarning,
          isOpen,
        })}
      >
        <div className={styles['currency-wrapper']}>
          <Currency
            isDisabled={props.isDisabled}
            onClick={toggleMenu}
            currency={props.currencyCode}
          />
          {props.currencies.length > 0 && (
            <DropdownChevronWithIntl
              onClick={toggleMenu}
              isDisabled={props.isDisabled}
              isOpen={isOpen}
            />
          )}
        </div>
        {isOpen &&
          props.currencies.length > 0 && (
            <div
              className={getCurrencyDropdownOptionsStyles({
                hasCurrencyError: props.hasCurrencyError,
                hasCurrencyWarning: props.hasCurrencyWarning,
              })}
            >
              {props.currencies.map(currency => (
                <Option
                  key={currency}
                  onClick={() => {
                    props.handleChange(currency, toggleMenu);
                  }}
                >
                  {currency}
                </Option>
              ))}
            </div>
          )}
      </div>
    )}
  />
);

CurrencyDropdown.displayName = 'CurrencyDropdown';
CurrencyDropdown.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencyCode: PropTypes.string,
  isDisabled: PropTypes.bool,
  hasCurrencyError: PropTypes.bool,
  hasCurrencyWarning: PropTypes.bool,
};

// Turns the user input into a value the MoneyInput can pass up
// This converts the value into a highPrecision when HPP is enabled and the
// user value can not be stored as a centPrecision price
const createMoneyValue = (currencyCode, amount, enableHpp, separators) => {
  if (!currencyCode) {
    return {
      type: 'centPrecision',
      currencyCode: null,
      centAmount: NaN,
      amount,
      fractionDigits: null,
    };
  }

  const currency = currencies[currencyCode];
  if (!currency) {
    return {
      type: 'centPrecision',
      currencyCode,
      centAmount: NaN,
      amount,
      fractionDigits: null,
    };
  }

  const expectedFractionDigits = currency.fractionDigits;

  if (amount.length === 0) {
    return {
      type: 'centPrecision',
      currencyCode,
      centAmount: NaN,
      amount: '',
      fractionDigits: expectedFractionDigits,
    };
  }

  const amountAsNumber = parseAmount({ amount, separators });
  const centAmount = amountAsNumber * 10 ** currency.fractionDigits;
  const fractionDigitsOfAmount =
    String(amountAsNumber).indexOf('.') === -1
      ? 0
      : String(amountAsNumber).length - String(amountAsNumber).indexOf('.') - 1;

  if (fractionDigitsOfAmount > currency.fractionDigits) {
    if (!enableHpp) {
      return {
        type: 'centPrecision',
        currencyCode,
        centAmount: NaN,
        amount,
        fractionDigits: null,
      };
    }

    return {
      type: 'highPrecision',
      currencyCode,
      // For prices with high precision, the cent amount is rounded to the
      // currencies default number of fraction digits
      centAmount: parseFloat(centAmount.toFixed(0), 10),
      amount,
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
    amount,
    fractionDigits: currency.fractionDigits,
  };
};

const centAmountToFormattedAmount = (centAmount, fractionDigits) =>
  (centAmount / 10 ** fractionDigits).toFixed(fractionDigits);

const getAmountFromMoneyValue = money => {
  // when no value exists
  if (!money) return '';

  if (money.type === 'highPrecision') {
    return String(money.preciseAmount / 10 ** money.fractionDigits);
  }
  const fractionDigits = currencies[money.currencyCode].fractionDigits;
  // format the initial value
  return centAmountToFormattedAmount(money.centAmount, fractionDigits);
};

export default class MoneyInput extends React.PureComponent {
  static displayName = 'MoneyInput';

  static getInputValueFromMoneyValue = money =>
    money
      ? {
          ...money,
          amount: getAmountFromMoneyValue(money),
        }
      : money;

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.shape({
        type: PropTypes.oneOf(['highPrecision']).isRequired,
        currencyCode: PropTypes.string.isRequired,
        centAmount: PropTypes.number,
        amount: PropTypes.string.isRequired,
        preciseAmount: PropTypes.number,
        fractionDigits: PropTypes.number,
      }),
      PropTypes.shape({
        type: PropTypes.oneOf(['centPrecision']),
        currencyCode: PropTypes.string.isRequired,
        centAmount: PropTypes.number,
        amount: PropTypes.string.isRequired,
        fractionDigits: PropTypes.number,
      }).isRequired,
    ]),
    language: PropTypes.string.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    isDisabled: PropTypes.bool,
    enableHpp: PropTypes.bool,
    onChange: PropTypes.func,

    hasCurrencyError: PropTypes.bool,
    hasCurrencyWarning: PropTypes.bool,
    hasAmountError: PropTypes.bool,
    hasAmountWarning: PropTypes.bool,

    horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),

    // Intl
    intl: intlShape,
  };

  static defaultProps = {
    currencies: [],
    horizontalConstraint: 'scale',
  };

  state = {
    separators: getSeparatorsForLocale(this.props.language),
  };

  handleCurrencyChange = (currencyCode, toggleMenu) => {
    if (this.props.value.currencyCode !== currencyCode) {
      this.props.onChange(
        createMoneyValue(
          currencyCode,
          this.props.value.amount.trim(),
          this.props.enableHpp,
          this.state.separators
        )
      );
    }
    toggleMenu();
  };

  handleAmountChange = event => {
    const amount = event.target.value.trim();

    /* if the user enters an invalid character we discard it */
    if (!isNumberish(amount)) return;

    this.props.onChange(
      createMoneyValue(
        this.props.value.currencyCode,
        amount,
        this.props.enableHpp,
        this.state.separators
      )
    );
  };

  handleBlur = () => {
    if (this.props.value.amount.trim().length > 0) {
      const moneyValue = createMoneyValue(
        this.props.value.currencyCode,
        this.props.value.amount.trim(),
        this.props.enableHpp,
        this.state.separators
      );

      if (moneyValue.type === 'centPrecision') {
        const fractionDigits =
          currencies[moneyValue.currencyCode].fractionDigits;
        const formattedAmount = centAmountToFormattedAmount(
          moneyValue.centAmount,
          fractionDigits
        );

        // when the user entered a value with centPrecision, we can format
        // the resulting value to that currency, e.g. 20.1 to 20.10
        if (String(formattedAmount) !== moneyValue.amount) {
          this.props.onChange(
            createMoneyValue(
              this.props.value.currencyCode,
              formattedAmount,
              this.props.enableHpp,
              this.state.separators
            )
          );
        }
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
