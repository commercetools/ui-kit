import { useCallback, type ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { css } from '@emotion/react';
import { useToggleState, useFieldId } from '@commercetools-uikit/hooks';
import MoneyInput, {
  type TCurrencyCode,
  type TMoneyValue,
  type TValue,
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

type TCustomEvent = {
  target: {
    id?: string;
    name?: string;
    value?: string | string[] | null;
  };
  persist?: () => void;
};

export type TLocalizedMoneyInputProps = {
  /**
   * Used as HTML id property.
   */
  id?: string;
  /**
   * The prefix used to create a HTML `name` property for the amount input field (`${name}.amount`).
   */
  name?: string;
  /**
   * value of possible currency
   * <br/>
   * the input doesn't accept a "currencies" prop, instead all possible
   * currencies have to exist (with empty or filled strings) on the value:
   * { EUR: {amount: '12.00', currencyCode: 'EUR'}, USD: {amount: '', currencyCode: 'USD'}}
   */
  value: Record<string, TValue>;
  /**
   * Called with the event of the input.
   */
  onChange?: (event: TCustomEvent) => void;
  /**
   * the currently selected currency
   */
  selectedCurrency: string;
  /**
   * Called when input is blurred
   */
  onBlur?: (event: TCustomEvent) => void;
  /**
   * Called when input is focused
   */
  onFocus?: (event: TCustomEvent) => void;
  /**
   * Will hide the currency expansion controls when set to `true`. All currencies will be shown when set to `true`.
   */
  hideCurrencyExpansionControls?: boolean;
  /**
   * Controls whether one or all currencirs are visible by default
   */
  defaultExpandCurrencies?: boolean;
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled?: boolean;
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly?: boolean;
  /**
   * Placeholder text for the input
   */
  placeholder?: Record<string, string>;
  /**
   * Horizontal size limit of the input fields.
   */
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
  /**
   * Indicates that input has errors
   */
  hasError?: boolean;
  /**
   * Control to indicate on the input if there are values that are potentially invalid
   */
  hasWarning?: boolean;
  /**
   * A map of errors. Error messages for known errors are rendered automatically.
   * <br>
   * Unknown errors will be forwarded to `renderError`
   */
  errors?: Record<string, ReactNode>;
  /**
   * A map of warnings.
   */
  warnings?: Record<string, ReactNode>;
  /**
   * Shows high precision badge in case current value uses high precision.
   */
  hasHighPrecisionBadge?: boolean;
};

type TLocalizedInputProps = {
  /**
   * Used as HTML id property.
   */
  id?: string;
  /**
   * The prefix used to create a HTML `name` property for the amount input field (`${name}.amount`).
   */
  name?: string;
  /**
   * value of possible currency
   */
  value: TValue;
  /**
   * Called with the event of the input.
   */
  onChange?: (event: TCustomEvent) => void;
  /**
   * Called with the event of the input.
   */
  currency: string;
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
   * Indicates that input has errors
   */
  hasError?: boolean;
  /**
   * Control to indicate on the input if there are values that are potentially invalid
   */
  hasWarning?: boolean;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * A map of errors. Error messages for known errors are rendered automatically.
   * <br>
   * Unknown errors will be forwarded to `renderError`
   */
  error?: ReactNode;
  /**
   * HTML node to display warning
   */
  warning?: ReactNode;
  /**
   * Shows high precision badge in case current value uses high precision.
   */
  hasHighPrecisionBadge?: boolean;
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
          name={props.name}
          value={props.value}
          onChange={handleChange}
          onBlur={props.onBlur}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          placeholder={props.placeholder}
          hasError={props.hasError}
          hasWarning={props.hasWarning}
          hasHighPrecisionBadge={props.hasHighPrecisionBadge}
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
    props.selectedCurrency,
    Object.keys(props.value)
  );

  const shouldRenderCurrencyControl =
    currencies.length > 1 && !props.hideCurrencyExpansionControls;

  if (props.hideCurrencyExpansionControls) {
    warning(
      typeof props.defaultExpandCurrencies !== 'boolean',
      'LocalizedMoneyInput: "defaultExpandCurrencies" does not have any effect when "hideCurrencyExpansionControls" is set.'
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
                warning={props.warnings && props.warnings[currency]}
                error={props.errors && props.errors[currency]}
                {...createLocalizedDataAttributes(props, currency)}
                hasHighPrecisionBadge={props.hasHighPrecisionBadge}
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

LocalizedMoneyInput.convertToMoneyValues = (
  values: TValue[],
  locale: string
): Array<TMoneyValue | null> =>
  Object.values(values).map<TMoneyValue | null>((value) => {
    return MoneyInput.convertToMoneyValue(value, locale);
  });

LocalizedMoneyInput.parseMoneyValues = (
  moneyValues: TMoneyValue[] = [],
  locale: string
): Record<TCurrencyCode, TValue> =>
  moneyValues.reduce<Record<TCurrencyCode, TValue>>((allValues, moneyValue) => {
    const value = MoneyInput.parseMoneyValue(moneyValue, locale);
    return {
      ...allValues,
      [value.currencyCode]: value,
    };
  }, {} as Record<TCurrencyCode, TValue>);

LocalizedMoneyInput.getHighPrecisionCurrencies = (
  values: Record<TCurrencyCode, TValue>,
  locale: string
): TCurrencyCode[] => {
  const typedCurrencyCodes = Object.keys(values) as TCurrencyCode[];
  return typedCurrencyCodes.filter((currencyCode) =>
    MoneyInput.isHighPrecision(values[currencyCode], locale)
  );
};

LocalizedMoneyInput.getEmptyCurrencies = (
  values: Record<TCurrencyCode, TValue>
): TCurrencyCode[] => {
  const typedCurrencyCodes = Object.keys(values) as TCurrencyCode[];
  return typedCurrencyCodes.filter((currencyCode) =>
    MoneyInput.isEmpty(values[currencyCode])
  );
};

export default LocalizedMoneyInput;
