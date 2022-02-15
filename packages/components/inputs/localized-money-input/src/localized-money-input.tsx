//@ts-nocheck - WIP: this will be taken off once a package having the exported TCurrencyCode is merged.
import {
  useCallback,
  type FocusEventHandler,
  type ChangeEventHandler,
  type ReactNode,
} from 'react';
import { useIntl, type IntlShape } from 'react-intl';
import { css } from '@emotion/react';
import { useToggleState, useFieldId } from '@commercetools-uikit/hooks';
import MoneyInput, {
  type TCurrencyCode,
} from '@commercetools-uikit/money-input';
import Stack from '@commercetools-uikit/spacings-stack';
import Constraints from '@commercetools-uikit/constraints';
import { CoinsIcon } from '@commercetools-uikit/icons';
import {
  createLocalizedDataAttributes,
  getHasErrorOnRemainingLanguages,
  getHasWarningOnRemainingLanguages,
  getId,
  getName,
} from '@commercetools-uikit/localized-utils';
import {
  createSequentialId,
  filterDataAttributes,
  warning,
} from '@commercetools-uikit/utils';
import { LocalizedInputToggle } from '@commercetools-uikit/input-utils';
import messages from './messages';

type TValue = {
  amount: string;
  currencyCode: TCurrencyCode;
};

type TEvent = {
  target: {
    id?: string;
    name?: string;
    value?: string | string[] | null;
  };
};

declare type TMoneyValue = {
  type: string;
  currencyCode: TCurrencyCode;
  centAmount: number;
  preciseAmount: number;
  fractionDigits: number;
};

type TLocalizedMoneyInputProps = {
  id?: string;
  name?: string;
  // then input doesn't accept a "currencies" prop, instead all possible
  // currencies have to exist (with empty or filled strings) on the value:
  // { EUR: {amount: '12.00', currencyCode: 'EUR'}, USD: {amount: '', currencyCode: 'USD'}}
  value: Record<string, TValue>;
  onChange?: ChangeEventHandler;
  selectedCurrency: string;
  onBlur?: (event: TEvent) => void;
  onFocus?: FocusEventHandler;
  hideCurrencyExpansionControls?: boolean;
  defaultExpandCurrencies?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  placeholder?: Record<string, string>;
  horizontalConstraint?:
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  hasError?: boolean;
  hasWarning?: boolean;
  errors?: Record<string, ReactNode>;
  warnings?: Record<string, ReactNode>;
};

type TLocalizedInputProps = {
  id?: string;
  name?: string;
  value: TValue;
  onChange?: ChangeEventHandler;
  currency: string;
  onBlur?: (event: TEvent) => void;
  onFocus?: FocusEventHandler;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  placeholder?: string;
  error?: ReactNode;
  warning?: ReactNode;
  intl?: IntlShape;
};

const sequentialId = createSequentialId('localized-money-input-');

// sorts the currencies with the following priority:
// - The selected currency is placed first (e.g EUR)
// - All other currencies follow, sorted alphabetically as well
export const sortCurrencies = (
  selectedCurrency: string,
  allCurrencies: string[]
) => {
  const remainingCurrencies = allCurrencies.filter(
    (currency) => currency !== selectedCurrency
  );
  return [selectedCurrency, ...remainingCurrencies.sort()];
};

const LocalizedInput = (props: TLocalizedInputProps) => {
  const { onChange } = props;
  const handleChange = useCallback(
    (event) => {
      // We manipulate the event to add the currency to the target.
      // That way the users  can read
      // event.target.currency and event.target.value to determine the next value.
      //
      // We only need this information for the story, the MC application code will
      // never need to access the information in such an inconvenient way, as
      // Formik can deal with a name like "foo.en" and sets the value correctly.
      // We can't use this as we aren't guaranteed a name in the story as the user
      // might clear it using the knob, and then we can't parse the currency from
      // the input name anymore.
      //
      event.target.currency = props.currency;
      onChange?.(event);
    },
    [props.currency, onChange]
  );
  return (
    <Stack scale="xs">
      <div
        css={css`
          width: 100%;
          position: relative;
          display: flex;
        `}
      >
        <MoneyInput
          menuShouldBlockScroll={undefined} //NB: had to add missing prop
          id={props.id} //NB: Had to add missing prop - open for dicsussion
          name={props.name}
          value={props.value}
          onChange={handleChange}
          onBlur={props.onBlur}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          placeholder={props.placeholder}
          hasError={props.hasError}
          hasWarning={props.hasWarning}
          {...filterDataAttributes(props)}
        />
      </div>
      {(props.error || props.warning) && (
        <div>{props.error ? props.error : props.warning}</div>
      )}
    </Stack>
  );
};

LocalizedInput.displayName = 'LocalizedInput';

const LocalizedMoneyInput = (props: TLocalizedMoneyInputProps) => {
  const intl = useIntl();

  const defaultExpansionState =
    props.hideCurrencyExpansionControls ||
    props.defaultExpandCurrencies ||
    // default to `false`, because useToggleState defaults to `true`
    false;

  const [areCurrenciesExpanded, toggleCurrencies] = useToggleState(
    defaultExpansionState
  );

  const onLocalizedMoneyInputToggle = useCallback(
    () => toggleCurrencies(),
    [toggleCurrencies]
  );

  const id = useFieldId(props.id, sequentialId);

  const hasErrorInRemainingCurrencies =
    props.hasError ||
    getHasErrorOnRemainingLanguages(props.errors, props.selectedCurrency);

  const hasWarningInRemainingCurrencies =
    props.hasWarning ||
    getHasWarningOnRemainingLanguages(props.warnings, props.selectedCurrency);

  if (hasErrorInRemainingCurrencies || hasWarningInRemainingCurrencies) {
    // this update within render replaces the old `getDerivedStateFromProps` functionality
    // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
    if (!areCurrenciesExpanded) {
      toggleCurrencies();
    }
  }

  const currencies = sortCurrencies(
    props.selectedCurrency!,
    Object.keys(props.value)
  );

  const shouldRenderCurrencyControl =
    currencies.length > 1 && !props.hideCurrencyExpansionControls;

  if (props.hideCurrencyExpansionControls) {
    warning(
      typeof props.defaultExpandCurrencies !== 'boolean',
      'LocaliszedMoneyInput: "defaultExpandCurrencies" does not have any effect when "hideCurrencyExpansionControls" is set.'
    );
  }

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <Stack scale="xs">
        <Stack scale="s">
          {currencies.map((currency, index) => {
            const isFirstCurrency = index === 0;
            if (!isFirstCurrency && !areCurrenciesExpanded) return null;

            return (
              <LocalizedInput
                key={currency}
                id={LocalizedMoneyInput.getId(id, currency)}
                name={LocalizedMoneyInput.getName(props.name, currency)}
                value={props.value[currency]}
                onChange={props.onChange}
                currency={currency}
                placeholder={
                  props.placeholder ? props.placeholder[currency] : undefined
                }
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                isDisabled={props.isDisabled}
                isReadOnly={props.isReadOnly}
                hasError={Boolean(
                  props.hasError || (props.errors && props.errors[currency])
                )}
                hasWarning={Boolean(
                  props.hasWarning ||
                    (props.warnings && props.warnings[currency])
                )}
                intl={intl}
                warning={props.warnings && props.warnings[currency]}
                error={props.errors && props.errors[currency]}
                {...createLocalizedDataAttributes(props, currency)}
              />
            );
          })}
        </Stack>
        {shouldRenderCurrencyControl && (
          <LocalizedInputToggle
            icon={<CoinsIcon />}
            onClick={onLocalizedMoneyInputToggle}
            isOpen={areCurrenciesExpanded}
            isDisabled={
              areCurrenciesExpanded &&
              Boolean(
                hasErrorInRemainingCurrencies || hasWarningInRemainingCurrencies
              )
            }
            showMessage={intl.formatMessage(messages.show, {
              remainingCurrencies: currencies.length - 1,
            })}
            hideMessage={intl.formatMessage(messages.hide, {
              remainingCurrencies: currencies.length - 1,
            })}
          />
        )}
      </Stack>
    </Constraints.Horizontal>
  );
};

LocalizedMoneyInput.displayName = 'LocalizedMoneyInput';

LocalizedMoneyInput.getId = getId;

LocalizedMoneyInput.getName = getName;

LocalizedMoneyInput.defaultProps = {
  horizontalConstraint: 'scale',
};

LocalizedMoneyInput.convertToMoneyValues = (values: TValue[], locale: string) =>
  Object.values(values).map((value) =>
    MoneyInput.convertToMoneyValue(value, locale)
  );

LocalizedMoneyInput.parseMoneyValues = (
  moneyValues = [] as TMoneyValue[],
  locale: string
) =>
  moneyValues
    .map((value) => MoneyInput.parseMoneyValue(value, locale))
    .reduce(
      (pairs, value) => ({
        ...pairs,
        [value.currencyCode]: value,
      }),
      {}
    );

LocalizedMoneyInput.getHighPrecisionCurrencies = (
  values: Record<string, TValue>,
  locale: string
) =>
  Object.keys(values).filter((currencyCode) =>
    MoneyInput.isHighPrecision(values[currencyCode], locale)
  );

LocalizedMoneyInput.getEmptyCurrencies = (values: Record<string, TValue>) =>
  Object.keys(values).filter((currencyCode) =>
    MoneyInput.isEmpty(values[currencyCode])
  );

export default LocalizedMoneyInput;
