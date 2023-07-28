import { useRef, useCallback, type ReactNode } from 'react';
import ReactDOM from 'react-dom';
import has from 'lodash/has';
import Select, {
  components,
  type SingleValueProps,
  type Props as ReactSelectProps,
} from 'react-select';
import { useIntl } from 'react-intl';
import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import {
  warning,
  isNumberish,
  filterDataAttributes,
  createSequentialId,
} from '@commercetools-uikit/utils';
import Tooltip from '@commercetools-uikit/tooltip';
import {
  DropdownIndicator,
  createSelectStyles,
  warnIfMenuPortalPropsAreMissing,
} from '@commercetools-uikit/select-utils';
import { FractionDigitsIcon } from '@commercetools-uikit/icons';
import Constraints, { TMaxProp } from '@commercetools-uikit/constraints';
import { useFieldId, useToggleState } from '@commercetools-uikit/hooks';
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

const moneyInputSequentialId = createSequentialId('money-input-');

const getPortalId = (id?: string) => `portal-${id}`;
const getPortalNode = (id?: string) =>
  document.querySelector(`#${getPortalId(id)}`);

type TLabel = {
  id: string;
  children?: ReactNode;
  isDisabled?: boolean;
  isReadOnly?: boolean;
};

const Portal = (props: TLabel) => {
  const domNode = getPortalNode(props.id);
  if (domNode) {
    return ReactDOM.createPortal(props.children, domNode);
  }
  return null;
};

const CurrencyLabel = (props: TLabel) => (
  <label htmlFor={props.id} css={getCurrencyLabelStyles(props)}>
    {props.children}
  </label>
);

CurrencyLabel.displayName = 'CurrencyLabel';

type TSingleValue = {
  id?: string;
  children?: ReactNode;
} & SingleValueProps;

const SingleValue = ({ id, ...props }: TSingleValue) => (
  <components.SingleValue {...props}>
    <label htmlFor={id}>{props.children}</label>
  </components.SingleValue>
);

SingleValue.displayName = 'SingleValue';

type TCreateCurrencySelectStyles = (
  input: TInputProps & {
    currencyHasFocus?: boolean;
    horizontalConstraint?: TMaxProp;
  }
) => void;

export type TInputProps = {
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  menuPortalZIndex?: number;
  /** @deprecated */
  theme?: Theme;
};

type TBase = {
  backgroundColor?: string;
  color?: string;
};
// overwrite styles of createSelectStyles
const createCurrencySelectStyles: TCreateCurrencySelectStyles = ({
  hasWarning,
  hasError,
  isDisabled,
  isReadOnly,
  menuPortalZIndex,
  horizontalConstraint,
  currencyHasFocus,
}) => {
  const selectStyles = createSelectStyles({
    hasWarning,
    hasError,
    menuPortalZIndex,
    isReadOnly,
    isDisabled,
    horizontalConstraint,
  });
  return {
    ...selectStyles,
    control: (base: TBase, state: ReactSelectProps) => ({
      ...selectStyles.control(base, state),
      padding: designTokens.paddingForMoneyInputCurrencyDropdown,
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      borderRight: '0',
      minWidth: designTokens.minWidthForMoneyInputCurrencyDropdown,
      height: '100%',
      borderColor: (() => {
        if (isDisabled)
          return `${designTokens.borderColorForInputWhenDisabled} !important`;
        if (isReadOnly)
          return `${designTokens.borderColorForInputWhenReadonly} !important`;
        if (hasError) return designTokens.borderColorForInputWhenError;
        if (hasWarning) return designTokens.borderColorForInputWhenWarning;
        if (currencyHasFocus) {
          return designTokens.borderColorForInputWhenFocused;
        }
        return designTokens.borderColorForInput;
      })(),
      cursor: (() => {
        if (isDisabled) return 'not-allowed';
        if (isReadOnly) return `default`;
        return 'pointer';
      })(),
      backgroundColor: (() => {
        if (isReadOnly) return designTokens.backgroundColorForInputWhenReadonly;
        return base.backgroundColor;
      })(),
      '&:hover': {
        borderColor: designTokens.borderColorForInput,
      },
      '&:hover:not(:read-only):not(:disabled)': {
        backgroundColor: designTokens.backgroundColorForInputWhenHovered,
      },
    }),
    singleValue: (base: TBase) => ({
      ...base,
      marginLeft: 0,
      maxWidth: 'initial',
      color: (() => {
        if (isDisabled) return designTokens.fontColorForInputWhenDisabled;
        if (hasError) return designTokens.fontColorForInputWhenError;
        if (hasWarning) return designTokens.fontColorForInputWhenWarning;
        if (isReadOnly) return designTokens.fontColorForInputWhenReadonly;
        return base.color;
      })(),
    }),
    dropdownIndicator: () => ({
      fill: isReadOnly
        ? designTokens.fontColorForInputWhenReadonly
        : designTokens.fontColorForMoneyInputCurrencyDropdownIndicator,
    }),
  };
};

export type TCurrencyCode = keyof typeof currencies;

type TMoneyConditionalProps =
  | { type: 'highPrecision'; preciseAmount: number }
  | {
      /**
       * Usually either a `centPrecision` or a `highPrecision`.
       */
      type: 'centPrecision';
      preciseAmount?: never;
    };
export type TMoneyValue = {
  currencyCode: TCurrencyCode;
  centAmount: number;
  fractionDigits: number;
} & TMoneyConditionalProps;
// The MoneyInput component always operates on a value consisting of:
// ```
// { amount: String, currencyCode: String }
// ```
//
// The amount may only use a dot as the decimal separator.
// The `currencyCode` must be supported by the API.
//
// The `MoneyInput` does not do any validation on its own. It only serves as a way
// to get the amount and `currencyCode` input from the user. Validation is always
// up to the parent.
//
// The CTP API supports two types of prices: `centPrecision` and `highPrecision`.
// The `MoneyInput` itself does not know about these. However,
// it has two static methods defined (`convertToMoneyValue` and `parseMoneyValue`),
// which can be used to convert between `MoneyInput` value and the `MoneyValue`
// supported by the API.
// Some places in the API do not support `highPrecision` prices, but the
// `convertToMoneyValue `will always return either a `centPrecision `or a
// `highPrecision` price. It's up the `MoneyInput`'s parent to show a validation
// error in case a `highPrecision` price is used.
//
// A value is considered as to have `highPrecision` when the number of supplied
// fraction digits exceed the number of fraction digits the currency uses. For
// example, `EUR 42.00` is always a `centPrecision` price, while `EUR 42.001` is always a
// `highPrecision` price. It is not possible to have `EUR 42.00` as a `highPrecision`
// price.
//
// The first time the component renders, we want to try to show the `centAmount`
// as a formatted number. To achieve this, the `parseMoneyValue` function can
// be used to turn the API value into a value the `MoneyInput` understands.
// During this transformation, the money value will get formatted into "amount".
//
// When the user changes the value, we don't want to format again. We only format
// in case the user blurs the field. This avoids many edge cases where the
// formatting would mess with the user's input.
//
//
// A full example of an `MoneyValue` with `centPrecision` would be
// ```
// {
//   "type": "centPrecision",
//   "currencyCode": "EUR",
//   "centAmount": 4200,
//   "fractionDigits": 2
// }
// ```
// which equals `EUR 42.00`.
//
// A full example of an `MoneyValue` with `highPrecision` would be
// ```
// {
//  "type": "highPrecision",
//  "currencyCode": "EUR",
//  "centAmount": 1,
//  "preciseAmount": 123456,
//  "fractionDigits": 7
// }
// ```
// which equals `EUR 0.0123456`

// Parsing
// Since most users are not careful about how they enter values, we will parse
// both `.` and `,` as decimal separators.
// When a value is `1.000,00` we parse it as `1000`.
// When a value is `1,000.00` we also parse it as `1000`.
//
// This means the highest amount always wins. We do this by comparing the last
// position of `.` and `,`. Whatever occurs later is used as the decimal separator.
export const parseRawAmountToNumber = (rawAmount: string, locale: string) => {
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
    .replace(new RegExp(`[^-0-9${fractionsSeparator}]`, 'g'), '') // we just keep the numbers and the fraction symbol
    .replace(fractionsSeparator, '.'); // then we change whatever `fractionsSeparator` was to `.` so we can parse it as float

  return parseFloat(normalizedAmount);
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

export const createMoneyValue = (
  rawAmount: string,
  locale: string,
  currencyCode?: TCurrencyCode | ''
): TMoneyValue | null => {
  if (!currencyCode) return null;

  const currency = currencies[currencyCode];
  if (!currency) return null;

  if (rawAmount.length === 0 || !isNumberish(rawAmount)) return null;

  warning(
    locale || currency.fractionDigits !== 0,
    `MoneyInput: A locale must be provided when currency has no fraction digits (${currencyCode})`
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
const createEmptyMoneyValue = (currencyCode: TCurrencyCode): TMoneyValue => ({
  type: 'centPrecision',
  currencyCode,
  centAmount: NaN,
  fractionDigits: 2,
});

const getAmountAsNumberFromMoneyValue = (moneyValue: TMoneyValue) =>
  moneyValue.type === 'highPrecision'
    ? moneyValue.preciseAmount / 10 ** moneyValue.fractionDigits
    : moneyValue.centAmount /
      10 ** currencies[moneyValue.currencyCode].fractionDigits;

// gets called with a string and should return a formatted string
const formatAmount = (
  rawAmount: string,
  locale: string,
  currencyCode: TCurrencyCode
) => {
  // fallback in case the user didn't enter an amount yet (or it's invalid)
  const moneyValue =
    createMoneyValue(rawAmount, locale, currencyCode) ||
    createEmptyMoneyValue(currencyCode);

  const amount = getAmountAsNumberFromMoneyValue(moneyValue);

  const fractionDigits = moneyValue.preciseAmount
    ? moneyValue.fractionDigits
    : currencies[moneyValue.currencyCode].fractionDigits;

  return isNaN(amount)
    ? ''
    : amount.toLocaleString(locale, { minimumFractionDigits: fractionDigits });
};

const getAmountInputName = (name?: string) =>
  name ? `${name}.amount` : undefined;
const getCurrencyDropdownName = (name?: string) =>
  name ? `${name}.currencyCode` : undefined;

export type TValue = {
  amount: string;
  currencyCode: TCurrencyCode | '';
};

type TCustomEvent = {
  target: {
    id?: string;
    name?: string;
    value?: string | string[] | null;
  };
  persist?: () => void;
};

type TMoneyInputProps = {
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Used as HTML `autocomplete` property
   */
  autoComplete?: string;
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
  /**
   * The prefix used to create a HTML `name` property for the amount input field (`${name}.amount`) and the currency dropdown (`${name}.currencyCode`).
   */
  name?: string;
  /**
   * Value of the input. Consists of the currency code and an amount. `amount` is a string representing the amount. A dot has to be used as the decimal separator.
   */
  value: TValue;
  /**
   * List of possible currencies. When not provided or empty, the component renders a label with the value's currency instead of a dropdown.
   */
  currencies: string[];
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Called when input is blurred
   */
  onBlur?: (event: TCustomEvent) => void;
  /**
   * Called when input is focused
   */
  onFocus?: (event: TCustomEvent) => void;
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled?: boolean;
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly?: boolean;
  /**
   * Focus the input on initial render
   */
  isAutofocussed?: boolean;
  /**
   * Called with the event of the input or dropdown when either the currency or the amount have changed.
   */
  onChange?: (event: TCustomEvent) => void;
  /**
   * Dom element to portal the currency select menu to
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuPortalTarget?: ReactSelectProps['menuPortalTarget'];
  /**
   * z-index value for the currency select menu portal
   * <br>
   * Use in conjunction with `menuPortalTarget`
   */
  menuPortalZIndex?: number;
  /**
   * whether the menu should block scroll while open
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuShouldBlockScroll?: ReactSelectProps['menuShouldBlockScroll'];
  /**
   * Indicates that input has errors
   */
  hasError?: boolean;
  /**
   * Control to indicate on the input if there are selected values that are potentially invalid
   */
  hasWarning?: boolean;
  /**
   * Shows high precision badge in case current value uses high precision.
   */
  hasHighPrecisionBadge?: boolean;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?: TMaxProp;
};

const defaultProps: Pick<
  TMoneyInputProps,
  'currencies' | 'horizontalConstraint' | 'menuPortalZIndex'
> = {
  currencies: [],
  horizontalConstraint: 'scale',
  menuPortalZIndex: 1,
};

const MoneyInput = (props: TMoneyInputProps) => {
  const intl = useIntl();
  const [currencyHasFocus, toggleCurrencyHasFocus] = useToggleState(false);
  const [amountHasFocus, toggleAmountHasFocus] = useToggleState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const moneyInputId = useFieldId(props.id, moneyInputSequentialId);

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'MoneyInput: "onChange" is required when is not read only.'
    );
  }

  warnIfMenuPortalPropsAreMissing({
    menuPortalZIndex: props.menuPortalZIndex,
    menuPortalTarget: props.menuPortalTarget,
    componentName: 'MoneyInput',
  });

  const { onFocus } = props;
  const handleAmountFocus = useCallback(() => {
    if (onFocus)
      onFocus({
        target: {
          id: MoneyInput.getAmountInputId(moneyInputId),
          name: getAmountInputName(props.name),
        },
      });
    toggleAmountHasFocus(true);
  }, [toggleAmountHasFocus, onFocus, moneyInputId, props.name]);

  const { onChange } = props;
  const handleAmountBlur = useCallback(() => {
    const amount = props.value.amount.trim();
    toggleAmountHasFocus(false);
    // Skip formatting for empty value or when the input is used with an
    // unknown currency.
    if (
      amount.length > 0 &&
      props.value.currencyCode &&
      currencies[props.value.currencyCode]
    ) {
      const formattedAmount = formatAmount(
        amount,
        intl.locale,
        props.value.currencyCode
      );

      // When the user entered a value with centPrecision, we can format
      // the resulting value to that currency, e.g. 20.1 to 20.10
      if (String(formattedAmount) !== amount) {
        // We need to emit an event with the now formatted value
        const fakeEvent = {
          persist: () => {},
          target: {
            id: MoneyInput.getAmountInputId(moneyInputId),
            name: getAmountInputName(props.name),
            value: formattedAmount,
          },
        };
        onChange?.(fakeEvent);
      }
    }
  }, [
    intl.locale,
    onChange,
    moneyInputId,
    props.name,
    props.value.amount,
    props.value.currencyCode,
    toggleAmountHasFocus,
  ]);

  const handleAmountChange = useCallback(
    (event) => {
      if (isNumberish(event.target.value)) {
        onChange?.({
          persist: () => {},
          target: {
            id: MoneyInput.getAmountInputId(moneyInputId),
            name: getAmountInputName(props.name),
            value: event.target.value,
          },
        });
      }
    },
    [onChange, moneyInputId, props.name]
  );

  const handleCurrencyChange = useCallback(
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
          intl.locale,
          currencyCode
        );
        // The user could be changing the currency before entering any amount,
        // or while the amount is invalid. In these cases, we don't attempt to
        // format the amount.
        const nextAmount = isNaN(Number(formattedAmount))
          ? props.value.amount
          : formattedAmount;

        // change currency code
        const fakeCurrencyEvent = {
          persist: () => {},
          target: {
            id: MoneyInput.getCurrencyDropdownId(moneyInputId),
            name: getCurrencyDropdownName(props.name),
            value: currencyCode || '',
          },
        };
        onChange?.(fakeCurrencyEvent);

        // change amount if necessary
        if (props.value.amount !== nextAmount) {
          onChange?.({
            persist: () => {},
            target: {
              id: MoneyInput.getAmountInputId(moneyInputId),
              name: getAmountInputName(props.name),
              value: nextAmount,
            },
          });
        }

        amountInputRef.current?.focus();
      }
    },
    [
      intl.locale,
      onChange,
      moneyInputId,
      props.name,
      props.value.amount,
      props.value.currencyCode,
    ]
  );

  const handleCurrencyFocus = useCallback(() => {
    if (onFocus)
      onFocus({
        target: {
          id: MoneyInput.getCurrencyDropdownId(moneyInputId),
          name: getCurrencyDropdownName(props.name),
        },
      });

    toggleCurrencyHasFocus(true);
  }, [onFocus, toggleCurrencyHasFocus, props.name, moneyInputId]);

  const handleCurrencyBlur = useCallback(() => {
    toggleCurrencyHasFocus(false);
  }, [toggleCurrencyHasFocus]);

  const hasNoCurrencies = props.currencies.length === 0;
  const hasFocus = currencyHasFocus || amountHasFocus;
  const currencySelectStyles = createCurrencySelectStyles({
    hasWarning: props.hasWarning,
    hasError: props.hasError,
    isDisabled: props.isDisabled,
    isReadOnly: props.isReadOnly,
    menuPortalZIndex: props.menuPortalZIndex,
    horizontalConstraint: props.horizontalConstraint,
    currencyHasFocus,
  });
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

  const isHighPrecision =
    !MoneyInput.isEmpty(props.value) &&
    MoneyInput.isHighPrecision(props.value, intl.locale);

  const { onBlur } = props;
  const handleContainerBlur = useCallback(
    (event) => {
      // ensures that both fields are marked as touched when one of them
      // is blurred
      if (
        typeof onBlur === 'function' &&
        !containerRef.current?.contains(event.relatedTarget)
      ) {
        onBlur({
          target: {
            id: MoneyInput.getCurrencyDropdownId(moneyInputId),
            name: getCurrencyDropdownName(props.name),
          },
        });
        onBlur({
          target: {
            id: MoneyInput.getAmountInputId(moneyInputId),
            name: getAmountInputName(props.name),
          },
        });
      }
    },
    [onBlur, moneyInputId, props.name]
  );

  const TooltipPortal = useCallback(
    (remainingProps) => <Portal {...remainingProps} id={props.id} />,
    [props.id]
  );

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
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
            id={MoneyInput.getAmountInputId(moneyInputId) as string}
            isDisabled={props.isDisabled}
            isReadOnly={props.isReadOnly}
          >
            {option && option.label}
          </CurrencyLabel>
        ) : (
          <Select
            inputId={MoneyInput.getCurrencyDropdownId(moneyInputId)}
            name={getCurrencyDropdownName(props.name)}
            value={option}
            isDisabled={props.isDisabled}
            isSearchable={false}
            components={
              {
                SingleValue: (innerProps) => (
                  <SingleValue
                    {...innerProps}
                    id={MoneyInput.getCurrencyDropdownId(moneyInputId)}
                  />
                ),
                Input: (ownProps) => (
                  <components.Input {...ownProps} readOnly={props.isReadOnly} />
                ),
                DropdownIndicator,
              } as ReactSelectProps['components']
            }
            options={options}
            menuIsOpen={props.isReadOnly ? false : undefined}
            placeholder=""
            styles={currencySelectStyles as ReactSelectProps['styles']}
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
            id={MoneyInput.getAmountInputId(moneyInputId)}
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
                  padding-right: ${designTokens.spacing40};
                `,
              currencyHasFocus &&
                !props.isDisabled &&
                !props.isReadOnly &&
                css`
                  border-left-color: ${designTokens.borderColorForInputWhenFocused};
                `,
            ]}
            placeholder={props.placeholder}
            onChange={handleAmountChange}
            onBlur={handleAmountBlur}
            disabled={props.isDisabled}
            readOnly={props.isReadOnly}
            autoFocus={props.isAutofocussed}
            {...filterDataAttributes(props)}
            /* ARIA */
            aria-invalid={props['aria-invalid']}
            aria-errormessage={props['aria-errormessage']}
          />
          {props.hasHighPrecisionBadge && isHighPrecision && (
            <>
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
                      margin: `${designTokens.spacing20} -${designTokens.spacing10} ${designTokens.spacing20} 0`,
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
            </>
          )}
        </div>
      </div>
    </Constraints.Horizontal>
  );
};

MoneyInput.displayName = 'MoneyInput';

MoneyInput.getAmountInputId = getAmountInputName;

MoneyInput.getCurrencyDropdownId = getCurrencyDropdownName;

MoneyInput.convertToMoneyValue = (value: TValue, locale: string) =>
  createMoneyValue(
    typeof value.amount === 'string' ? value.amount.trim() : '',
    locale,
    value.currencyCode
  );

MoneyInput.parseMoneyValue = (
  moneyValue: TMoneyValue,
  locale: string
): TValue => {
  if (!moneyValue) return { currencyCode: '', amount: '' };

  warning(
    typeof locale === 'string',
    'MoneyInput.parseMoneyValue: A locale must be passed as the second argument'
  );

  warning(
    typeof moneyValue === 'object',
    'MoneyInput.parseMoneyValue: Value must be passed as an object or be undefined'
  );

  warning(
    typeof moneyValue.currencyCode === 'string',
    'MoneyInput.parseMoneyValue: Value must contain "currencyCode"'
  );

  warning(
    has(currencies, moneyValue.currencyCode),
    'MoneyInput.parseMoneyValue: Value must use known currency code'
  );

  warning(
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
    locale,
    moneyValue.currencyCode
  );

  return { amount, currencyCode: moneyValue.currencyCode };
};

MoneyInput.isEmpty = (formValue: TValue) =>
  !formValue ||
  formValue.amount.trim() === '' ||
  formValue.currencyCode.trim() === '';

MoneyInput.isHighPrecision = (formValue: TValue, locale: string): boolean => {
  warning(
    !MoneyInput.isEmpty(formValue),
    'MoneyValue.isHighPrecision may not be called with an empty money value.'
  );
  const moneyValue = MoneyInput.convertToMoneyValue(formValue, locale);
  return moneyValue?.type === 'highPrecision';
};

type TTouched = {
  amount?: boolean;
  currencyCode?: boolean;
};

MoneyInput.isTouched = (touched?: TTouched) =>
  Boolean(touched && touched.currencyCode && touched.amount);

MoneyInput.defaultProps = defaultProps;

export default MoneyInput;
