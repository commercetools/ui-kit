import React from 'react';
import PropTypes from 'prop-types';
import { oneLine } from 'common-tags';
import { useIntl } from 'react-intl';
import { css } from '@emotion/core';
import { useToggleState, useFieldId } from '@commercetools-uikit/hooks';
import MoneyInput from '@commercetools-uikit/money-input';
import Stack from '@commercetools-uikit/spacings-stack';
import Constraints from '@commercetools-uikit/constraints';
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
} from '@commercetools-uikit/utils';
import CurrencyControl from './currency-control';

const sequentialId = createSequentialId('localized-money-input-');

// sorts the currencies with the following priority:
// - The selected currency is placed first (e.g EUR)
// - All other currencies follow, sorted alphabetically as well
export const sortCurrencies = (selectedCurrency, allCurrencies) => {
  const remainingCurrencies = allCurrencies.filter(
    (currency) => currency !== selectedCurrency
  );
  return [selectedCurrency, ...remainingCurrencies.sort()];
};

const LocalizedInput = (props) => {
  const { onChange } = props;
  const handleChange = React.useCallback(
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
      // eslint-disable-next-line no-param-reassign
      event.target.currency = props.currency;
      onChange(event);
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
          id={props.id}
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
      <div
        css={css`
          display: flex;
        `}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          {(() => {
            if (props.error) return <div>{props.error}</div>;
            if (props.warning) return <div>{props.warning}</div>;
            return props.currenciesControl;
          })()}
        </div>
      </div>
      {(props.error || props.warning) && props.currenciesControl}
    </Stack>
  );
};

LocalizedInput.displayName = 'LocalizedInput';

LocalizedInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    currencyCode: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
  currency: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  currenciesControl: PropTypes.node,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.node,
  warning: PropTypes.node,
};

const LocalizedMoneyInput = (props) => {
  const intl = useIntl();

  const defaultExpansionState =
    props.hideCurrencyExpansionControls ||
    props.defaultExpandCurrencies ||
    // default to `false`, because useToggleState defaults to `true`
    false;

  const [areCurrenciesExpanded, toggleCurrencies] = useToggleState(
    defaultExpansionState
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

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Stack scale="s">
        {currencies.map((currency, index) => {
          const isFirstCurrency = index === 0;
          if (!isFirstCurrency && !areCurrenciesExpanded) return null;
          const isLastCurrency = index === currencies.length - 1;
          const hasRemainingCurrencies = currencies.length > 1;
          const hasErrorOnRemainingCurrencies =
            props.hasError ||
            getHasErrorOnRemainingLanguages(
              props.errors,
              props.selectedCurrency
            );
          const hasWarningOnRemainingCurrencies =
            props.hasWarning ||
            getHasWarningOnRemainingLanguages(
              props.warnings,
              props.selectedCurrency
            );
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
              currenciesControl={(() => {
                if (
                  !hasRemainingCurrencies ||
                  props.hideCurrencyExpansionControls
                )
                  return null;
                if (isFirstCurrency && !areCurrenciesExpanded)
                  return (
                    <CurrencyControl
                      isClosed={true}
                      onClick={toggleCurrencies}
                      remainingCurrencies={currencies.length - 1}
                    />
                  );
                if (isLastCurrency)
                  return (
                    <CurrencyControl
                      onClick={toggleCurrencies}
                      remainingCurrencies={currencies.length - 1}
                      isDisabled={Boolean(
                        props.hasError ||
                          hasErrorOnRemainingCurrencies ||
                          props.hasWarning ||
                          hasWarningOnRemainingCurrencies
                      )}
                    />
                  );
                return null;
              })()}
              hasError={Boolean(
                props.hasError || (props.errors && props.errors[currency])
              )}
              hasWarning={Boolean(
                props.hasWarning || (props.warnings && props.warnings[currency])
              )}
              intl={intl}
              warning={props.warnings && props.warnings[currency]}
              error={props.errors && props.errors[currency]}
              {...createLocalizedDataAttributes(props, currency)}
            />
          );
        })}
      </Stack>
    </Constraints.Horizontal>
  );
};

LocalizedMoneyInput.displayName = 'LocalizedMoneyInput';

LocalizedMoneyInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  // then input doesn't accept a "currencies" prop, instead all possible
  // currencies have to exist (with empty or filled strings) on the value:
  // { EUR: {amount: '12.00', currencyCode: 'EUR'}, USD: {amount: '', currencyCode: 'USD'}}
  value: PropTypes.objectOf(
    PropTypes.shape({
      amount: PropTypes.string.isRequired,
      currencyCode: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
  selectedCurrency: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  hideCurrencyExpansionControls: PropTypes.bool,
  defaultExpandCurrencies: (props, propName, componentName, ...rest) => {
    if (
      props.hideCurrencyExpansionControls &&
      typeof props[propName] === 'boolean'
    ) {
      throw new Error(
        oneLine`
          ${componentName}: "${propName}" does not have any effect when
          "hideCurrencyExpansionControls" is set.
        `
      );
    }
    return PropTypes.bool(props, propName, componentName, ...rest);
  },
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  placeholder: PropTypes.objectOf(PropTypes.string),
  horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.node),
  warnings: PropTypes.objectOf(PropTypes.node),
};

LocalizedMoneyInput.getId = getId;

LocalizedMoneyInput.getName = getName;

LocalizedMoneyInput.defaultProps = {
  horizontalConstraint: 'scale',
};

LocalizedMoneyInput.convertToMoneyValues = (values, locale) =>
  Object.values(values).map((value) =>
    MoneyInput.convertToMoneyValue(value, locale)
  );

LocalizedMoneyInput.parseMoneyValues = (moneyValues = [], locale) =>
  moneyValues
    .map((value) => MoneyInput.parseMoneyValue(value, locale))
    .reduce(
      (pairs, value) => ({
        ...pairs,
        [value.currencyCode]: value,
      }),
      {}
    );

LocalizedMoneyInput.getHighPrecisionCurrencies = (values, locale) =>
  Object.keys(values).filter((currencyCode) =>
    MoneyInput.isHighPrecision(values[currencyCode], locale)
  );

LocalizedMoneyInput.getEmptyCurrencies = (values) =>
  Object.keys(values).filter((currencyCode) =>
    MoneyInput.isEmpty(values[currencyCode])
  );

export default LocalizedMoneyInput;
