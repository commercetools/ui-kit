import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import has from 'lodash/has';
import requiredIf from 'react-required-if';
import Select, { components } from 'react-select';
import { injectIntl } from 'react-intl';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import vars from '../../../../materials/custom-properties';
import DropdownIndicator from '../../internals/dropdown-indicator';
import isNumberish from '../../../utils/is-numberish';
import SafeHTMLElement from '../../../utils/helpers/safeHTMLElement';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Contraints from '../../constraints';
import Tooltip from '../../tooltip';
import { FractionDigitsIcon } from '../../icons';
import currencies from './currencies.json';
import createSelectStyles from '../../internals/create-select-styles';
import {
  getHighPrecisionWrapperStyles,
  getCurrencyLabelStyles,
  getAmountInputStyles,
} from './money-input.styles';
import messages from './messages';

const TooltipWrapper = styled.div`
  display: flex;
`;

const CurrencyLabel = props => (
  <label htmlFor={props.id} css={getCurrencyLabelStyles()}>
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
  children: PropTypes.node,
};

// overwrite styles of createSelectStyles
const createCurrencySelectStyles = ({
  hasWarning,
  hasError,
  isDisabled,
  isReadOnly,
  hasFocus,
  menuPortalZIndex,
}) => {
  const selectStyles = createSelectStyles({
    hasWarning,
    hasError,
    menuPortalZIndex,
  });
  return {
    ...selectStyles,
    control: (base, state) => ({
      ...selectStyles.control(base, state),
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      borderRight: '0',
      minWidth: '72px',
      borderColor: (() => {
        if (isDisabled) return vars.borderColorForInputWhenDisabled;
        if (isReadOnly) return vars.borderColorForInputWhenReadonly;
        if (hasError) return vars.borderColorForInputWhenError;
        if (hasWarning) return vars.borderColorForInputWhenWarning;
        if (hasFocus) return vars.borderColorForInputWhenFocused;
        return vars.borderColorForInput;
      })(),
      '&:hover': (() => {
        if (isDisabled) return vars.borderColorForInputWhenDisabled;
        if (isReadOnly) return vars.borderColorForInputWhenReadonly;
        if (hasError) return vars.borderColorForInputWhenError;
        if (hasWarning) return vars.borderColorForInputWhenWarning;
        if (hasFocus) return vars.borderColorForInputWhenFocused;
        return vars.borderColorForInput;
      })(),
      backgroundColor: (() => {
        if (isReadOnly) return vars.backgroundColorForInput;
        return base.backgroundColor;
      })(),
    }),
    singleValue: base => ({
      ...base,
      marginLeft: 0,
      maxWidth: 'initial',
      color: (() => {
        if (hasError) return vars.fontColorForInputWhenError;
        if (hasWarning) return vars.fontColorForInputWhenWarning;
        return base.color;
      })(),
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
export const parseRawAmountToNumber = (rawAmount, locale) => {
  let throwaway;
  let separator;

  if (locale) {
    [throwaway, separator] = (9999.999) // we need any number that has more than 3 digits to show the thousand sepirator, and has fractions
      .toLocaleString(locale) // after this step (localizing it) it'll be either 9,999.999 or 9.999,999 based in the locale
      .replace(/9/g, '') // then we remove the number `9` to endup with `,.` or `.,`
      .split('')
      .map(symbol => (symbol === '.' ? '\\.' : symbol)); // here we escape the '.' to use it as regex
  } else {
    const lastDot = String(rawAmount).lastIndexOf('.');
    const lastComma = String(rawAmount).lastIndexOf(',');

    separator = lastComma > lastDot ? ',' : '.';
    throwaway = separator === '.' ? ',' : '\\.';
  }
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
export const createMoneyValue = (currencyCode, rawAmount, locale) => {
  if (!currencyCode) return null;

  const currency = currencies[currencyCode];
  if (!currency) return null;

  if (rawAmount.length === 0 || !isNumberish(rawAmount)) return null;

  invariant(
    locale || currency.fractionDigits !== 0,
    `A locale must be provided when currency has no fraction digits (${currencyCode})`
  );
  const amountAsNumber = parseRawAmountToNumber(rawAmount, locale);
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
        // Here we need to convert  a number like 8.066652 to its centamount
        // We could do that by multiplying it with 10 ** number-of-fraction-digits
        // but then we'll run into problems with JavaScript's floating point
        // number precision and end up with 8066651.9999999, and then parseInt
        // cuts off the remainder.
        // So instead of using maths to convert the number, we just replace
        // the dot inside the number which does the same thing.
        // We don't need to replace "," as well, as numbers always us a dot
        // when converted using String().
        //
        // The mathematical way: amountAsNumber * 10 ** fractionDigitsOfAmount,
        String(amountAsNumber).replace('.', ''),
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
  const moneyValue = createMoneyValue(currencyCode, rawAmount, locale) || {
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

const getAmountInputName = name => (name ? `${name}.amount` : undefined);
const getCurrencyDropdownName = name =>
  name ? `${name}.currencyCode` : undefined;

class MoneyInput extends React.Component {
  static displayName = 'MoneyInput';

  static getAmountInputId = getAmountInputName;

  static getCurrencyDropdownId = getCurrencyDropdownName;

  static convertToMoneyValue = (value, locale) =>
    createMoneyValue(
      value.currencyCode,
      typeof value.amount === 'string' ? value.amount.trim() : '',
      locale
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
      getAmountAsNumberFromMoneyValue(moneyValue).toLocaleString(locale),
      moneyValue.currencyCode,
      locale
    );

    return { amount, currencyCode: moneyValue.currencyCode };
  };

  static isEmpty = formValue =>
    !formValue ||
    formValue.amount.trim() === '' ||
    formValue.currencyCode.trim() === '';

  static isHighPrecision = (formValue, locale) => {
    invariant(
      !MoneyInput.isEmpty(formValue),
      'MoneyValue.isHighPrecision may not be called with an empty money value.'
    );
    const moneyValue = MoneyInput.convertToMoneyValue(formValue, locale);
    return moneyValue && moneyValue.type === 'highPrecision';
  };

  static isTouched = touched =>
    Boolean(touched && touched.currencyCode && touched.amount);

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    autoComplete: PropTypes.string,
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
    menuPortalTarget: PropTypes.instanceOf(SafeHTMLElement),
    menuPortalZIndex: PropTypes.number.isRequired,
    menuShouldBlockScroll: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    hasHighPrecisionBadge: PropTypes.bool,
    horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
  };

  static defaultProps = {
    currencies: [],
    horizontalConstraint: 'scale',
    menuPortalZIndex: 1,
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
    const hasFocus = this.state.currencyHasFocus || this.state.amountHasFocus;

    const currencySelectStyles = createCurrencySelectStyles({
      hasWarning: this.props.hasWarning,
      hasError: this.props.hasError,
      isDisabled: this.props.isDisabled,
      isReadOnly: this.props.isReadOnly,
      hasFocus,
      menuPortalZIndex: this.props.menuPortalZIndex,
    });
    const options = this.props.currencies.map(currencyCode => ({
      label: currencyCode,
      value: currencyCode,
    }));

    const option = (() => {
      const matchedOption = options.find(
        optionCandidate =>
          optionCandidate.value === this.props.value.currencyCode
      );
      if (matchedOption) return matchedOption;
      // ensure an option is found, even when the currencies don't include
      // the money value's currencyCode
      if (this.props.value.currencyCode.trim() !== '')
        return {
          label: this.props.value.currencyCode,
          value: this.props.value.currencyCode,
        };
      return null;
    })();
    const id = MoneyInput.getCurrencyDropdownId(this.props.id);

    const isHighPrecision =
      !MoneyInput.isEmpty(this.props.value) &&
      MoneyInput.isHighPrecision(this.props.value, this.props.intl.locale);

    return (
      <Contraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div
          ref={this.containerRef}
          css={css`
            font-family: ${vars.fontFamilyDefault};
            width: 100%;
            position: relative;
            display: flex;
          `}
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
              menuPortalTarget={this.props.menuPortalTarget}
              menuShouldBlockScroll={this.props.menuShouldBlockScroll}
              onBlur={() => this.setState({ currencyHasFocus: false })}
              onChange={this.handleCurrencyChange}
              data-testid="currency-dropdown"
            />
          )}
          <div
            css={css`
              position: relative;
              width: 100%;
            `}
          >
            <input
              ref={this.amountInputRef}
              id={MoneyInput.getAmountInputId(this.props.id)}
              autoComplete={this.props.autoComplete}
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
              css={[
                getAmountInputStyles({ ...this.props, hasFocus }),
                // accounts for size of icon
                this.props.hasHighPrecisionBadge &&
                  isHighPrecision &&
                  css`
                    padding-right: ${vars.spacingL};
                  `,
              ]}
              placeholder={this.props.placeholder}
              onChange={this.handleAmountChange}
              onBlur={this.handleAmountBlur}
              disabled={this.props.isDisabled}
              readOnly={this.props.isReadOnly}
              autoFocus={this.props.isAutofocussed}
              {...filterDataAttributes(this.props)}
            />
            {this.props.hasHighPrecisionBadge && isHighPrecision && (
              <div
                css={() =>
                  getHighPrecisionWrapperStyles({
                    isDisabled: this.props.isDisabled,
                  })
                }
              >
                <Tooltip
                  off={this.props.isDisabled}
                  placement="top-end"
                  // we use negative margin to make up for the padding in the Tooltip Wrapper
                  // so that the tooltip is flush with the component
                  styles={{
                    body: {
                      margin: `${vars.spacing8} -${vars.spacing4} ${
                        vars.spacing8
                      } 0`,
                    },
                  }}
                  title={this.props.intl.formatMessage(messages.highPrecision)}
                  components={{
                    WrapperComponent: TooltipWrapper,
                  }}
                >
                  <FractionDigitsIcon
                    theme={this.props.isDisabled ? 'grey' : 'blue'}
                  />
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </Contraints.Horizontal>
    );
  }
}

export default injectIntl(MoneyInput);
