import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import has from 'lodash.has';
import requiredIf from 'react-required-if';
import Select, { components } from 'react-select';
import { injectIntl } from 'react-intl';
import ClearIndicator from '../../internals/clear-indicator';
import DropdownIndicator from '../../internals/dropdown-indicator';
import isNumberish from '../../../utils/is-numberish';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Contraints from '../../constraints';
import styles from './money-input.mod.css';
import currencies from './currencies.json';
import createSelectStyles from '../../internals/create-select-styles';
import vars from '../../../../materials/custom-properties.json';

const CurrencyLabel = props => (
  <label htmlFor={props.id} className={styles['currency-label']}>
    {props.children}
  </label>
);

CurrencyLabel.displayName = 'CurrencyLabel';

CurrencyLabel.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

const SingleValue = ({ id, ...props }) => (
  <components.SingleValue {...props}>
    <label htmlFor={id}>{props.children}</label>
  </components.SingleValue>
);

SingleValue.displayName = 'SingleValue';

SingleValue.propTypes = {
  id: PropTypes.string,
};

// overwrite styles of createSelectStyles
const createCurrencySelectStyles = ({
  hasWarning,
  hasError,
  isDisabled,
  isReadOnly,
  hasFocus,
}) => {
  const selectStyles = createSelectStyles({ hasWarning, hasError });
  return {
    ...selectStyles,
    control: (base, state) => ({
      ...selectStyles.control(base, state),
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      borderRight: '0',
      minWidth: '72px',
      borderColor: do {
        if (isDisabled) vars['--token-border-color-input-disabled'];
        else if (isReadOnly) vars['--token-border-color-input-readonly'];
        else if (hasError) vars['--token-border-color-input-error'];
        else if (hasWarning) vars['--token-border-color-input-warning'];
        else if (hasFocus) vars['--token-border-color-input-focus'];
        else vars['--token-border-color-input-pristine'];
      },
      '&:hover': do {
        if (isDisabled) vars['--token-border-color-input-disabled'];
        else if (isReadOnly) vars['--token-border-color-input-readonly'];
        else if (hasError) vars['--token-border-color-input-error'];
        else if (hasWarning) vars['--token-border-color-input-warning'];
        else if (hasFocus) vars['--token-border-color-input-focus'];
        else vars['--token-border-color-input-pristine'];
      },
      backgroundColor: do {
        if (isReadOnly) vars['--token-background-color-input-pristine'];
        else base.backgroundColor;
      },
    }),
    singleValue: base => ({
      ...base,
      marginLeft: 0,
      maxWidth: 'initial',
      color: do {
        if (hasError) vars['--token-font-color-error'];
        else if (hasWarning) vars['--token-font-color-warning'];
        else base.color;
      },
    }),
  };
};

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

// Parsing
// Since most users are not careful about how they enter values, we will parse
// both `.` and `,` as decimal separators.
// When a value is `1.000,00` we parse it as `1000`.
// When a value is `1,000.00` we also parse it as `1000`.
//
// This means the highest amount always wins. We do this by comparing the last
// position of `.` and `,`. Whatever occurs later is used as the decimal
// separator.
export const parseRawAmountToNumber = rawAmount => {
  const lastDot = String(rawAmount).lastIndexOf('.');
  const lastComma = String(rawAmount).lastIndexOf(',');

  const separator = lastComma > lastDot ? ',' : '.';
  const throwaway = separator === '.' ? ',' : '\\.';

  // The raw amount with only one sparator
  const normalizedAmount = String(rawAmount)
    .replace(new RegExp(`${throwaway}`, 'g'), '')
    .replace(separator, '.');

  return parseFloat(normalizedAmount, 10);
};

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
export const createMoneyValue = (currencyCode, rawAmount) => {
  if (!currencyCode) return null;

  const currency = currencies[currencyCode];
  if (!currency) return null;

  if (rawAmount.length === 0 || !isNumberish(rawAmount)) return null;

  const amountAsNumber = parseRawAmountToNumber(rawAmount);
  if (isNaN(amountAsNumber)) return null;

  // The cent amount is rounded to the currencie's default number
  // of fraction digits for prices with high precision.
  //
  // Additionally, JavaScript is sometimes incorrect when multiplying floats,
  //   e.g. 2.49 * 100 -> 249.00000000000003
  // While inaccuracy from multiplying floating point numbers is a
  // general problem in JS, we can avoid it by cutting off all
  // decimals. This is possible since cents is the base unit, so we
  // operate on integers anyways
  // Also we should the round the value to ensure that we come close
  // to the nearest decimal value
  // ref: https://github.com/commercetools/merchant-center-frontend/pull/770
  const centAmount = Math.trunc(
    Math.round(amountAsNumber * 10 ** currency.fractionDigits)
  );

  const fractionDigitsOfAmount =
    // The conversion to a string will always use a dot as the separator.
    // That means we don't have to handle a comma.
    String(amountAsNumber).indexOf('.') === -1
      ? 0
      : String(amountAsNumber).length - String(amountAsNumber).indexOf('.') - 1;

  if (fractionDigitsOfAmount > currency.fractionDigits) {
    return {
      type: 'highPrecision',
      currencyCode,
      centAmount,
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

const getAmountAsNumberFromMoneyValue = moneyValue =>
  moneyValue.type === 'highPrecision'
    ? moneyValue.preciseAmount / 10 ** moneyValue.fractionDigits
    : moneyValue.centAmount /
      10 ** currencies[moneyValue.currencyCode].fractionDigits;

// gets called with a string and should return a formatted string
const formatAmount = (rawAmount, currencyCode, locale) => {
  // fallback in case the user didn't enter an amount yet (or it's invalid)
  const moneyValue = createMoneyValue(currencyCode, rawAmount) || {
    currencyCode,
    centAmount: NaN,
  };

  const amount = getAmountAsNumberFromMoneyValue(moneyValue);

  const fractionDigits = moneyValue.preciseAmount
    ? moneyValue.fractionDigits
    : currencies[moneyValue.currencyCode].fractionDigits;

  return isNaN(amount)
    ? ''
    : amount.toLocaleString(locale, { minimumFractionDigits: fractionDigits });
};

const getAmountStyles = props => {
  if (props.isDisabled) return styles['amount-disabled'];
  if (props.hasError) return styles['amount-error'];
  if (props.hasWarning) return styles['amount-warning'];
  if (props.isReadOnly) return styles['amount-readonly'];
  if (props.hasFocus) return styles['amount-focus'];

  return styles['amount-default'];
};

const getAmountInputName = name => (name ? `${name}.amount` : undefined);
const getCurrencyDropdownName = name =>
  name ? `${name}.currencyCode` : undefined;

class MoneyInput extends React.Component {
  static displayName = 'MoneyInput';

  static getAmountInputId = getAmountInputName;

  static getCurrencyDropdownId = getCurrencyDropdownName;

  static convertToMoneyValue = value =>
    createMoneyValue(
      value.currencyCode,
      typeof value.amount === 'string' ? value.amount.trim() : ''
    );

  static parseMoneyValue = (moneyValue, locale) => {
    if (!moneyValue) return { currencyCode: '', amount: '' };

    invariant(
      typeof locale === 'string',
      'MoneyInput.parseMoneyValue: A locale must be passed as the second argument'
    );

    invariant(
      typeof moneyValue === 'object',
      'MoneyInput.parseMoneyValue: Value must be passed as an object or be undefined'
    );

    invariant(
      typeof moneyValue.currencyCode === 'string',
      'MoneyInput.parseMoneyValue: Value must contain "currencyCode"'
    );

    invariant(
      has(currencies, moneyValue.currencyCode),
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
      moneyValue.currencyCode,
      locale
    );

    return { amount, currencyCode: moneyValue.currencyCode };
  };

  static isEmpty = formValue =>
    !formValue ||
    formValue.amount.trim() === '' ||
    formValue.currencyCode.trim() === '';

  static isHighPrecision = formValue => {
    invariant(
      !MoneyInput.isEmpty(formValue),
      'MoneyValue.isHighPrecision may not be called with an empty money value.'
    );
    const moneyValue = MoneyInput.convertToMoneyValue(formValue);
    return moneyValue && moneyValue.type === 'highPrecision';
  };

  static isTouched = touched =>
    Boolean(touched && touched.currencyCode && touched.amount);

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.shape({
      amount: PropTypes.string.isRequired,
      currencyCode: PropTypes.string.isRequired,
    }).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    isAutofocussed: PropTypes.bool,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
    }).isRequired,

    horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
  };

  static defaultProps = {
    currencies: [],
    horizontalConstraint: 'scale',
  };

  state = {
    currencyHasFocus: false,
    amountHasFocus: false,
  };

  handleCurrencyChange = option => {
    const currencyCode = option.value;
    if (this.props.value.currencyCode !== currencyCode) {
      // When the user changes from a currency with 3 fraction digits to
      // a currency with 2 fraction digits, and when the input value was
      // "9.000" (9), then it should change to "9.00" to reflect the new
      // currency's number of fraction digits.
      // When the currency was a high-precision price, then no digits should
      // be lost
      const formattedAmount = formatAmount(
        this.props.value.amount.trim(),
        currencyCode,
        this.props.intl.locale
      );
      // The user could be changing the currency before entering any amount,
      // or while the amount is invalid. In these cases, we don't attempt to
      // format the amount.
      const nextAmount = isNaN(formattedAmount)
        ? this.props.value.amount
        : formattedAmount;

      // change currency code
      const fakeCurrencyEvent = {
        persist: () => {},
        target: {
          id: MoneyInput.getCurrencyDropdownId(this.props.id),
          name: getCurrencyDropdownName(this.props.name),
          value: currencyCode || '',
        },
      };
      this.props.onChange(fakeCurrencyEvent);

      // change amount if necessary
      if (this.props.value.amount !== nextAmount) {
        this.props.onChange({
          persist: () => {},
          target: {
            id: MoneyInput.getAmountInputId(this.props.id),
            name: getAmountInputName(this.props.name),
            value: nextAmount,
          },
        });
      }

      this.amountInputRef.current.focus();
    }
  };

  handleAmountChange = event => {
    if (isNumberish(event.target.value)) {
      this.props.onChange({
        persist: () => {},
        target: {
          id: MoneyInput.getAmountInputId(this.props.id),
          name: getAmountInputName(this.props.name),
          value: event.target.value,
        },
      });
    }
  };

  handleAmountBlur = () => {
    const amount = this.props.value.amount.trim();
    this.setState({ amountHasFocus: false });
    // Skip formatting for empty value or when the input is used with an
    // unknown currency.
    if (amount.length > 0 && currencies[this.props.value.currencyCode]) {
      const formattedAmount = formatAmount(
        amount,
        this.props.value.currencyCode,
        this.props.intl.locale
      );

      // When the user entered a value with centPrecision, we can format
      // the resulting value to that currency, e.g. 20.1 to 20.10
      if (String(formattedAmount) !== amount) {
        // We need to emit an event with the now formatted value
        const fakeEvent = {
          persist: () => {},
          target: {
            id: MoneyInput.getAmountInputId(this.props.id),
            name: getAmountInputName(this.props.name),
            value: formattedAmount,
          },
        };
        this.props.onChange(fakeEvent);
      }
    }
  };

  containerRef = React.createRef();
  amountInputRef = React.createRef();

  render() {
    const hasNoCurrencies = this.props.currencies.length === 0;
    const hasWarning = this.props.hasCurrencyWarning;
    const hasFocus = this.state.currencyHasFocus || this.state.amountHasFocus;

    const currencySelectStyles = createCurrencySelectStyles({
      hasWarning,
      hasError: this.props.hasCurrencyError || this.props.hasError,
      isDisabled: this.props.isDisabled,
      isReadOnly: this.props.isReadOnly,
      hasFocus,
    });
    const options = this.props.currencies.map(currencyCode => ({
      label: currencyCode,
      value: currencyCode,
    }));

    const option = do {
      const matchedOption = options.find(
        optionCandidate =>
          optionCandidate.value === this.props.value.currencyCode
      );
      if (matchedOption) matchedOption;
      // ensure an option is found, even when the currencies don't include
      // the money value's currencyCode
      else if (this.props.value.currencyCode.trim() !== '')
        ({
          label: this.props.value.currencyCode,
          value: this.props.value.currencyCode,
        });
      else null;
    };
    const id = MoneyInput.getCurrencyDropdownId(this.props.id);
    return (
      <Contraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div
          ref={this.containerRef}
          className={styles['field-container']}
          data-testid="money-input-container"
          onBlur={event => {
            // ensures that both fields are marked as touched when one of them
            // is blurred
            if (
              typeof this.props.onBlur === 'function' &&
              !this.containerRef.current.contains(event.relatedTarget)
            ) {
              this.props.onBlur({
                target: {
                  id: MoneyInput.getCurrencyDropdownId(this.props.id),
                  name: getCurrencyDropdownName(this.props.name),
                },
              });
              this.props.onBlur({
                target: {
                  id: MoneyInput.getAmountInputId(this.props.id),
                  name: getAmountInputName(this.props.name),
                },
              });
            }
          }}
        >
          {hasNoCurrencies ? (
            <CurrencyLabel
              id={MoneyInput.getAmountInputId(this.props.id)}
              isDisabled={this.props.isDisabled}
            >
              {option && option.label}
            </CurrencyLabel>
          ) : (
            <Select
              inputId={id}
              name={getCurrencyDropdownName(this.props.name)}
              value={option}
              isDisabled={this.props.isDisabled || this.props.isReadOnly}
              isSearchable={false}
              components={{
                SingleValue: props => <SingleValue {...props} id={id} />,
                DropdownIndicator,
                ClearIndicator,
              }}
              options={options}
              placeholder=""
              styles={currencySelectStyles}
              onFocus={() => {
                if (this.props.onFocus)
                  this.props.onFocus({
                    target: {
                      id: MoneyInput.getCurrencyDropdownId(this.props.id),
                      name: getCurrencyDropdownName(this.props.name),
                    },
                  });
                this.setState({ currencyHasFocus: true });
              }}
              onBlur={() => this.setState({ currencyHasFocus: false })}
              onChange={this.handleCurrencyChange}
              data-testid="currency-dropdown"
            />
          )}
          <input
            ref={this.amountInputRef}
            id={MoneyInput.getAmountInputId(this.props.id)}
            name={getAmountInputName(this.props.name)}
            type="text"
            onFocus={() => {
              if (this.props.onFocus)
                this.props.onFocus({
                  target: {
                    id: MoneyInput.getAmountInputId(this.props.id),
                    name: getAmountInputName(this.props.name),
                  },
                });
              this.setState({ amountHasFocus: true });
            }}
            value={this.props.value.amount}
            className={getAmountStyles({
              isDisabled: this.props.isDisabled,
              hasError: this.props.hasError,
              hasWarning: this.props.hasWarning,
              isReadOnly: this.props.isReadOnly,
              hasFocus,
            })}
            placeholder={this.props.placeholder}
            onChange={this.handleAmountChange}
            onBlur={this.handleAmountBlur}
            disabled={this.props.isDisabled}
            readOnly={this.props.isReadOnly}
            autoFocus={this.props.isAutofocussed}
            {...filterDataAttributes(this.props)}
          />
        </div>
      </Contraints.Horizontal>
    );
  }
}

export default injectIntl(MoneyInput);
