import React from 'react';
import PropTypes from 'prop-types';
import without from 'lodash.without';
import oneLine from 'common-tags/lib/oneLine';
import { injectIntl } from 'react-intl';
import Spacings from '../../spacings';
import Constraints from '../../constraints';
import {
  createLocalizedDataAttributes,
  getHasErrorOnRemainingLanguages,
  getHasWarningOnRemainingLanguages,
  getId,
  getName,
} from '../../../utils/localized';
import createSequentialId from '../../../utils/create-sequential-id';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import MoneyInput from '../money-input';
import CurrencyControl from './currency-control';
import styles from './localized-money-input.mod.css';

const sequentialId = createSequentialId('localized-money-input-');
// sorts the currencies with the following priority:
// - The selected currency is placed first (e.g EUR)
// - All other currencies follow, sorted alphabetically as well
export const sortCurrencies = (selectedCurrency, allCurrencies) => {
  const remainingCurrencies = without(allCurrencies, selectedCurrency);
  return [selectedCurrency, ...remainingCurrencies.sort()];
};

class LocalizedInput extends React.Component {
  static displayName = 'LocalizedInput';

  static propTypes = {
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
    currenciesControl: PropTypes.node,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    placeholder: PropTypes.string,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    error: PropTypes.node,
    warning: PropTypes.node,
  };

  handleChange = event => {
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
    event.target.currency = this.props.currency;
    this.props.onChange(event);
  };

  render() {
    return (
      <Spacings.Stack scale="xs">
        <div className={styles.fieldContainer}>
          <MoneyInput
            id={this.props.id}
            name={this.props.name}
            value={this.props.value}
            onChange={this.handleChange}
            onBlur={this.props.onBlur}
            isDisabled={this.props.isDisabled}
            placeholder={this.props.placeholder}
            hasError={this.props.hasError}
            hasWarning={this.props.hasWarning}
            {...filterDataAttributes(this.props)}
          />
        </div>
        <div className={styles.commandsContainer}>
          <div className={styles.commandsLeft}>
            {do {
              if (this.props.error) <div>{this.props.error}</div>;
              else if (this.props.warning) <div>{this.props.warning}</div>;
              else this.props.currenciesControl;
            }}
          </div>
        </div>
        {(this.props.error || this.props.warning) &&
          this.props.currenciesControl}
      </Spacings.Stack>
    );
  }
}

export class LocalizedMoneyInput extends React.Component {
  static displayName = 'LocalizedMoneyInput';

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    // then input doesn't accept a "currencies" prop, instead all possible
    // currencies have to exist (with empty or filled strings) on the value:
    //   { EUR: '12.00', USD: '14.23', CAD: '13.70' }
    value: PropTypes.objectOf(PropTypes.string).isRequired,
    onChange: PropTypes.func,
    selectedCurrency: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    hideCurrencyExpansionControls: PropTypes.bool,
    isDefaultExpanded: (props, propName, componentName, ...rest) => {
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
    placeholder: PropTypes.objectOf(PropTypes.string),
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    errors: PropTypes.objectOf(PropTypes.node),
    warnings: PropTypes.objectOf(PropTypes.node),
    // HoC
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  static getId = getId;

  static getName = getName;

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  static convertToMoneyValues = values =>
    Object.keys(values).map(currencyCode =>
      MoneyInput.convertToMoneyValue({
        currencyCode,
        amount: values[currencyCode],
      })
    );

  static parseMoneyValues = (moneyValues = [], locale) =>
    moneyValues
      .map(value => MoneyInput.parseMoneyValue(value, locale))
      .reduce(
        (pairs, value) => ({
          ...pairs,
          [value.currencyCode]: value.amount,
        }),
        {}
      );

  static getHighPrecisionCurrencies = values =>
    Object.keys(values).filter(currency =>
      MoneyInput.isHighPrecision({
        currencyCode: currency,
        amount: values[currency],
      })
    );

  static getEmptyCurrencies = values =>
    Object.keys(values).filter(currency =>
      MoneyInput.isEmpty({
        currencyCode: currency,
        amount: values[currency],
      })
    );

  state = {
    // This state is used to show/hide the remaining currencies
    areCurrenciesOpened: this.props.isDefaultExpanded,
  };

  toggleCurrencies = () =>
    this.setState(prevState => ({
      areCurrenciesOpened: !prevState.areCurrenciesOpened,
    }));

  static getDerivedStateFromProps = (props, state) => {
    // We want to automatically open the currencies when an error or a warning is present on a
    // hidden input, and we want to keep the currencies open even after the
    // error was resolved, so that the user can collapse it manually.
    // Otherwise it would close as soon as the error disappears.
    const hasErrorOnRemainingCurrencies =
      props.hasError ||
      getHasErrorOnRemainingLanguages(props.errors, props.selectedCurrency);
    const hasWarningOnRemainingCurrencies =
      props.hasWarning ||
      getHasWarningOnRemainingLanguages(props.warnings, props.selectedCurrency);
    const areCurrenciesOpened =
      hasErrorOnRemainingCurrencies ||
      hasWarningOnRemainingCurrencies ||
      props.hideCurrencyExpansionControls ||
      state.areCurrenciesOpened;

    const id = do {
      if (props.id) props.id;
      else if (state.id) state.id;
      else sequentialId();
    };

    return { areCurrenciesOpened, id };
  };

  render() {
    const currencies = sortCurrencies(
      this.props.selectedCurrency,
      Object.keys(this.props.value)
    );
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Spacings.Stack scale="s">
          {currencies.map((currency, index) => {
            const isFirstCurrency = index === 0;
            if (!isFirstCurrency && !this.state.areCurrenciesOpened)
              return null;
            const isLastCurrency = index === currencies.length - 1;
            const hasRemainingCurrencies = currencies.length > 1;
            const hasErrorOnRemainingCurrencies =
              this.props.hasError ||
              getHasErrorOnRemainingLanguages(
                this.props.errors,
                this.props.selectedCurrency
              );
            const hasWarningOnRemainingCurrencies =
              this.props.hasWarning ||
              getHasWarningOnRemainingLanguages(
                this.props.warnings,
                this.props.selectedCurrency
              );
            return (
              <LocalizedInput
                key={currency}
                id={LocalizedMoneyInput.getId(this.state.id, currency)}
                name={LocalizedMoneyInput.getName(this.props.name, currency)}
                value={{
                  currencyCode: currency,
                  amount: this.props.value[currency],
                }}
                onChange={this.props.onChange}
                currency={currency}
                placeholder={
                  this.props.placeholder
                    ? this.props.placeholder[currency]
                    : undefined
                }
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                isDisabled={this.props.isDisabled}
                currenciesControl={(() => {
                  if (
                    !hasRemainingCurrencies ||
                    this.props.hideCurrencyExpansionControls
                  )
                    return null;
                  if (isFirstCurrency && !this.state.areCurrenciesOpened)
                    return (
                      <CurrencyControl
                        isClosed={true}
                        onClick={this.toggleCurrencies}
                        remainingCurrencies={currencies.length - 1}
                      />
                    );
                  if (isLastCurrency)
                    return (
                      <CurrencyControl
                        onClick={this.toggleCurrencies}
                        remainingCurrencies={currencies.length - 1}
                        isDisabled={Boolean(
                          this.props.hasError ||
                            hasErrorOnRemainingCurrencies ||
                            this.props.hasWarning ||
                            hasWarningOnRemainingCurrencies
                        )}
                      />
                    );
                  return null;
                })()}
                hasError={Boolean(
                  this.props.hasError ||
                    (this.props.errors && this.props.errors[currency])
                )}
                hasWarning={Boolean(
                  this.props.hasWarning ||
                    (this.props.warnings && this.props.warnings[currency])
                )}
                intl={this.props.intl}
                warning={this.props.warnings && this.props.warnings[currency]}
                error={this.props.errors && this.props.errors[currency]}
                {...createLocalizedDataAttributes(this.props, currency)}
              />
            );
          })}
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(LocalizedMoneyInput);
