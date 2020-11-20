import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import has from 'lodash/has';
import requiredIf from 'react-required-if';
import Select, { components } from 'react-select';
import { useIntl } from 'react-intl';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import {
  isNumberish,
  SafeHTMLElement,
  filterDataAttributes,
} from '@commercetools-uikit/utils';
import Tooltip from '@commercetools-uikit/tooltip';
import {
  DropdownIndicator,
  createSelectStyles,
} from '@commercetools-uikit/select-utils';
import { FractionDigitsIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import { useToggleState } from '@commercetools-uikit/hooks';
import currencies from './currencies.json';
import {
  getHighPrecisionWrapperStyles,
  getCurrencyLabelStyles,
  getAmountInputStyles,
} from './money-input.styles';
import messages from './messages';

const TooltipWrapper = styled.div`
  display: flex;
`;

const getPortalId = (id) => `portal-${id}`;
const getPortalNode = (id) => document.querySelector(`#${getPortalId(id)}`);

const Portal = (props) => {
  const domNode = getPortalNode(props.id);
  return ReactDOM.createPortal(props.children, domNode);
};

const CurrencyLabel = (props) => (
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
const createCurrencySelectStyles = (
  { hasWarning, hasError, isDisabled, isReadOnly, hasFocus, menuPortalZIndex },
  theme
) => {
  const selectStyles = createSelectStyles(
    {
      hasWarning,
      hasError,
      menuPortalZIndex,
    },
    theme
  );
  return {
    ...selectStyles,
    control: (base, state) => ({
      ...selectStyles.control(base, state),
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      borderRight: '0',
      minWidth: '72px',
      borderColor: (() => {
        if (isDisabled)
          return `${vars.borderColorForInputWhenDisabled} !important`;
        if (hasError) return vars.borderColorForInputWhenError;
        if (hasWarning) return vars.borderColorForInputWhenWarning;
        if (hasFocus) return vars.borderColorForInputWhenFocused;
        if (isReadOnly)
          return `${vars.borderColorForInputWhenReadonly} !important`;
        return vars.borderColorForInput;
      })(),
      cursor: (() => {
        if (isDisabled) return 'not-allowed';
        if (isReadOnly) return `default`;
        return 'pointer';
      })(),
      backgroundColor: (() => {
        if (isReadOnly) return vars.backgroundColorForInput;
        return base.backgroundColor;
      })(),
    }),
    singleValue: (base) => ({
      ...base,
      marginLeft: 0,
      maxWidth: 'initial',
      color: (() => {
        if (isDisabled) return vars.fontColorForInputWhenDisabled;
        if (hasError) return vars.fontColorForInputWhenError;
        if (hasWarning) return vars.fontColorForInputWhenWarning;
        if (isReadOnly) return vars.fontColorForInputWhenReadonly;
        return base.color;
      })(),
    }),
    dropdownIndicator: () => ({
      fill: isReadOnly ? vars.fontColorForInputWhenReadonly : '',
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
  let fractionsSeparator;

  if (locale) {
    fractionsSeparator = (2.5) // we need any number with fractions, so that we know what is the fraction
      .toLocaleString(locale) // "symbol" for the provided locale
      .replace(/\d/g, ''); // then we remove the numbers and keep the "symbol"
  } else {
    const lastDot = String(rawAmount).lastIndexOf('.');
    const lastComma = String(rawAmount).lastIndexOf(',');
    fractionsSeparator = lastComma > lastDot ? ',' : '.';
  }

  fractionsSeparator = fractionsSeparator === '.' ? '\\.' : fractionsSeparator; // here we escape the '.' to use it as regex
  // The raw amount with only one sparator
  const normalizedAmount = String(rawAmount)
    .replace(new RegExp(`[^0-9${fractionsSeparator}]`, 'g'), '') // we just keep the numbers and the fraction symbol
    .replace(fractionsSeparator, '.'); // then we change whatever `fractionsSeparator` was to `.` so we can parse it as float

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

const getAmountAsNumberFromMoneyValue = (moneyValue) =>
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

const getAmountInputName = (name) => (name ? `${name}.amount` : undefined);
const getCurrencyDropdownName = (name) =>
  name ? `${name}.currencyCode` : undefined;

const MoneyInput = (props) => {
  const intl = useIntl();
  const [currencyHasFocus, toggleCurrencyHasFocus] = useToggleState(false);
  const [amountHasFocus, toggleAmountHasFocus] = useToggleState(false);

  const containerRef = React.useRef();
  const amountInputRef = React.useRef();

  const { onFocus } = props;
  const handleAmountFocus = React.useCallback(() => {
    if (onFocus)
      onFocus({
        target: {
          id: MoneyInput.getAmountInputId(props.id),
          name: getAmountInputName(props.name),
        },
      });
    toggleAmountHasFocus(true);
  }, [toggleAmountHasFocus, onFocus, props.id, props.name]);

  const { onChange } = props;
  const handleAmountBlur = React.useCallback(() => {
    const amount = props.value.amount.trim();
    toggleAmountHasFocus(false);
    // Skip formatting for empty value or when the input is used with an
    // unknown currency.
    if (amount.length > 0 && currencies[props.value.currencyCode]) {
      const formattedAmount = formatAmount(
        amount,
        props.value.currencyCode,
        intl.locale
      );

      // When the user entered a value with centPrecision, we can format
      // the resulting value to that currency, e.g. 20.1 to 20.10
      if (String(formattedAmount) !== amount) {
        // We need to emit an event with the now formatted value
        const fakeEvent = {
          persist: () => {},
          target: {
            id: MoneyInput.getAmountInputId(props.id),
            name: getAmountInputName(props.name),
            value: formattedAmount,
          },
        };
        onChange(fakeEvent);
      }
    }
  }, [
    intl.locale,
    onChange,
    props.id,
    props.name,
    props.value.amount,
    props.value.currencyCode,
    toggleAmountHasFocus,
  ]);

  const handleAmountChange = React.useCallback(
    (event) => {
      if (isNumberish(event.target.value)) {
        onChange({
          persist: () => {},
          target: {
            id: MoneyInput.getAmountInputId(props.id),
            name: getAmountInputName(props.name),
            value: event.target.value,
          },
        });
      }
    },
    [onChange, props.id, props.name]
  );

  const handleCurrencyChange = React.useCallback(
    (option) => {
      const currencyCode = option.value;
      if (props.value.currencyCode !== currencyCode) {
        // When the user changes from a currency with 3 fraction digits to
        // a currency with 2 fraction digits, and when the input value was
        // "9.000" (9), then it should change to "9.00" to reflect the new
        // currency's number of fraction digits.
        // When the currency was a high-precision price, then no digits should
        // be lost
        const formattedAmount = formatAmount(
          props.value.amount.trim(),
          currencyCode,
          intl.locale
        );
        // The user could be changing the currency before entering any amount,
        // or while the amount is invalid. In these cases, we don't attempt to
        // format the amount.
        const nextAmount = isNaN(formattedAmount)
          ? props.value.amount
          : formattedAmount;

        // change currency code
        const fakeCurrencyEvent = {
          persist: () => {},
          target: {
            id: MoneyInput.getCurrencyDropdownId(props.id),
            name: getCurrencyDropdownName(props.name),
            value: currencyCode || '',
          },
        };
        onChange(fakeCurrencyEvent);

        // change amount if necessary
        if (props.value.amount !== nextAmount) {
          onChange({
            persist: () => {},
            target: {
              id: MoneyInput.getAmountInputId(props.id),
              name: getAmountInputName(props.name),
              value: nextAmount,
            },
          });
        }

        amountInputRef.current.focus();
      }
    },
    [
      intl.locale,
      onChange,
      props.id,
      props.name,
      props.value.amount,
      props.value.currencyCode,
    ]
  );

  const handleCurrencyFocus = React.useCallback(() => {
    if (onFocus)
      onFocus({
        target: {
          id: MoneyInput.getCurrencyDropdownId(props.id),
          name: getCurrencyDropdownName(props.name),
        },
      });

    toggleCurrencyHasFocus(true);
  }, [onFocus, toggleCurrencyHasFocus, props.name, props.id]);

  const handleCurrencyBlur = React.useCallback(() => {
    toggleCurrencyHasFocus(false);
  }, [toggleCurrencyHasFocus]);

  const hasNoCurrencies = props.currencies.length === 0;
  const hasFocus = currencyHasFocus || amountHasFocus;
  const theme = useTheme();
  const currencySelectStyles = createCurrencySelectStyles(
    {
      hasWarning: props.hasWarning,
      hasError: props.hasError,
      isDisabled: props.isDisabled,
      isReadOnly: props.isReadOnly,
      hasFocus,
      menuPortalZIndex: props.menuPortalZIndex,
    },
    theme
  );
  const options = props.currencies.map((currencyCode) => ({
    label: currencyCode,
    value: currencyCode,
  }));

  const option = (() => {
    const matchedOption = options.find(
      (optionCandidate) => optionCandidate.value === props.value.currencyCode
    );
    if (matchedOption) return matchedOption;
    // ensure an option is found, even when the currencies don't include
    // the money value's currencyCode
    if (props.value.currencyCode.trim() !== '')
      return {
        label: props.value.currencyCode,
        value: props.value.currencyCode,
      };
    return null;
  })();

  const id = MoneyInput.getCurrencyDropdownId(props.id);

  const isHighPrecision =
    !MoneyInput.isEmpty(props.value) &&
    MoneyInput.isHighPrecision(props.value, intl.locale);

  const { onBlur } = props;
  const handleContainerBlur = React.useCallback(
    (event) => {
      // ensures that both fields are marked as touched when one of them
      // is blurred
      if (
        typeof onBlur === 'function' &&
        !containerRef.current.contains(event.relatedTarget)
      ) {
        onBlur({
          target: {
            id: MoneyInput.getCurrencyDropdownId(props.id),
            name: getCurrencyDropdownName(props.name),
          },
        });
        onBlur({
          target: {
            id: MoneyInput.getAmountInputId(props.id),
            name: getAmountInputName(props.name),
          },
        });
      }
    },
    [onBlur, props.id, props.name]
  );

  const TooltipPortal = React.useCallback(
    (remainingProps) => <Portal {...remainingProps} id={props.id} />,
    [props.id]
  );

  return (
    <Constraints.Horizontal
      max={Constraints.parseHorizontalConstraintProp(
        props.horizontalConstraint
      )}
    >
      <div
        ref={containerRef}
        css={css`
          font-family: inherit;
          width: 100%;
          position: relative;
          display: flex;
        `}
        data-testid="money-input-container"
        onBlur={handleContainerBlur}
      >
        {hasNoCurrencies ? (
          <CurrencyLabel
            id={MoneyInput.getAmountInputId(props.id)}
            isDisabled={props.isDisabled}
          >
            {option && option.label}
          </CurrencyLabel>
        ) : (
          <Select
            inputId={id}
            name={getCurrencyDropdownName(props.name)}
            value={option}
            isDisabled={props.isDisabled}
            isSearchable={false}
            components={{
              // eslint-disable-next-line react/display-name
              SingleValue: (innerProps) => (
                <SingleValue {...innerProps} id={id} />
              ),
              // eslint-disable-next-line react/display-name
              Input: (ownProps) => (
                // eslint-disable-next-line react/prop-types
                <components.Input {...ownProps} readOnly={props.isReadOnly} />
              ),
              DropdownIndicator,
            }}
            options={options}
            menuIsOpen={props.isReadOnly ? false : undefined}
            placeholder=""
            styles={currencySelectStyles}
            onFocus={handleCurrencyFocus}
            menuPortalTarget={props.menuPortalTarget}
            menuShouldBlockScroll={props.menuShouldBlockScroll}
            onBlur={handleCurrencyBlur}
            onChange={handleCurrencyChange}
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
            ref={amountInputRef}
            id={MoneyInput.getAmountInputId(props.id)}
            autoComplete={props.autoComplete}
            name={getAmountInputName(props.name)}
            type="text"
            onFocus={handleAmountFocus}
            value={props.value.amount}
            css={[
              getAmountInputStyles({ ...props, hasFocus }),
              // accounts for size of icon
              props.hasHighPrecisionBadge &&
                isHighPrecision &&
                css`
                  padding-right: ${vars.spacingL};
                `,
            ]}
            placeholder={props.placeholder}
            onChange={handleAmountChange}
            onBlur={handleAmountBlur}
            disabled={props.isDisabled}
            readOnly={props.isReadOnly}
            autoFocus={props.isAutofocussed}
            {...filterDataAttributes(props)}
          />
          {props.hasHighPrecisionBadge && isHighPrecision && (
            <React.Fragment>
              {!props.isDisabled && <div id={getPortalId(props.id)} />}
              <div
                css={() =>
                  getHighPrecisionWrapperStyles({
                    isDisabled: props.isDisabled,
                  })
                }
              >
                <Tooltip
                  off={props.isDisabled}
                  placement="top-end"
                  // we use negative margin to make up for the padding in the Tooltip Wrapper
                  // so that the tooltip is flush with the component
                  styles={{
                    body: {
                      margin: `${vars.spacingS} -${vars.spacingXs} ${vars.spacingS} 0`,
                    },
                  }}
                  title={intl.formatMessage(messages.highPrecision)}
                  components={{
                    TooltipWrapperComponent: TooltipPortal,
                    WrapperComponent: TooltipWrapper,
                  }}
                >
                  <FractionDigitsIcon
                    color={props.isDisabled ? 'neutral60' : 'info'}
                  />
                </Tooltip>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Constraints.Horizontal>
  );
};

MoneyInput.displayName = 'MoneyInput';

MoneyInput.getAmountInputId = getAmountInputName;

MoneyInput.getCurrencyDropdownId = getCurrencyDropdownName;

MoneyInput.convertToMoneyValue = (value, locale) =>
  createMoneyValue(
    value.currencyCode,
    typeof value.amount === 'string' ? value.amount.trim() : '',
    locale
  );

MoneyInput.parseMoneyValue = (moneyValue, locale) => {
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
    getAmountAsNumberFromMoneyValue(moneyValue).toLocaleString(locale, {
      minimumFractionDigits: moneyValue.fractionDigits,
    }),
    moneyValue.currencyCode,
    locale
  );

  return { amount, currencyCode: moneyValue.currencyCode };
};

MoneyInput.isEmpty = (formValue) =>
  !formValue ||
  formValue.amount.trim() === '' ||
  formValue.currencyCode.trim() === '';

MoneyInput.isHighPrecision = (formValue, locale) => {
  invariant(
    !MoneyInput.isEmpty(formValue),
    'MoneyValue.isHighPrecision may not be called with an empty money value.'
  );
  const moneyValue = MoneyInput.convertToMoneyValue(formValue, locale);
  return moneyValue && moneyValue.type === 'highPrecision';
};

MoneyInput.isTouched = (touched) =>
  Boolean(touched && touched.currencyCode && touched.amount);

MoneyInput.propTypes = {
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id: PropTypes.string,
  /**
   * Used as HTML `autocomplete` property
   */
  autoComplete: PropTypes.string,
  /**
   * The prefix used to create a HTML `name` property for the amount input field (`${name}.amount`) and the currency dropdown (`${name}.currencyCode`).
   */
  name: PropTypes.string,
  /**
   * Value of the input. Consists of the currency code and an amount. `amount` is a string representing the amount. A dot has to be used as the decimal separator.
   */
  value: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    currencyCode: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * List of possible currencies. When not provided or empty, the component renders a label with the value's currency instead of a dropdown.
   */
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Placeholder text for the input
   */
  placeholder: PropTypes.string,
  /**
   * Called when input is blurred
   */
  onBlur: PropTypes.func,
  /**
   * Called when input is focused
   */
  onFocus: PropTypes.func,
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled: PropTypes.bool,
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly: PropTypes.bool,
  /**
   * Focus the input on initial render
   */
  isAutofocussed: PropTypes.bool,
  /**
   * Called with the event of the input or dropdown when either the currency or the amount have changed.
   * <br />
   * Signature: `(event) => void`
   */
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  /**
   * Dom element to portal the currency select menu to
   */
  menuPortalTarget: PropTypes.instanceOf(SafeHTMLElement),
  /**
   * z-index value for the currency select menu portal
   */
  menuPortalZIndex: PropTypes.number,
  /**
   * whether the menu should block scroll while open
   */
  menuShouldBlockScroll: PropTypes.bool,
  /**
   * Indicates that input has errors
   */
  hasError: PropTypes.bool,
  /**
   * Control to indicate on the input if there are selected values that are potentially invalid
   */
  hasWarning: PropTypes.bool,
  /**
   * Shows high precision badge in case current value uses high precision.
   */
  hasHighPrecisionBadge: PropTypes.bool,
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf([
    's',
    'm',
    'l',
    'xl',
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    'scale',
    'auto',
  ]),
};

MoneyInput.defaultProps = {
  currencies: [],
  horizontalConstraint: 'scale',
  menuPortalZIndex: 1,
};

export default MoneyInput;
