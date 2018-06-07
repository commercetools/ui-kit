import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash.isnil';
import Cleave from 'cleave.js/react';
import classnames from 'classnames';
import Downshift from 'downshift';
import { injectIntl, intlShape } from 'react-intl';
import { defaultMemoize } from 'reselect';
import {
  getSeparatorsForLocale,
  isNumberish,
} from '@commercetools-local/utils/numbers';
import { CaretDownIcon, CaretUpIcon } from '../../icons';
import AccessibleButton from '../../buttons/accessible-button';
import Contraints from '../../materials/constraints';
import messages from './messages';
import styles from './money-input.mod.css';

export const MAXIMUM_PRECISION = 20;

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

// Since the Cleave component might call the onChange handler with a string
// we need to cast the string back to a number.
// This function ensures that the value is always either
// - undefined
// - JavaScript number
export const parseNumberToMoney = (number, fractionDigits) => {
  if (!isNumberish(number)) return undefined;
  return parseFloat(number * 0.1 ** fractionDigits).toFixed(fractionDigits);
};

const getCleaveOptions = language => {
  const separators = getSeparatorsForLocale(language);
  return {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    numeralDecimalMark: separators.decSeparator,
    delimiter: separators.thoSeparator,
    // As this value can't be set dynamically, setting the maximum value
    // supported by the `fractionDigits` prop on `HighPrecisionMoney` allows
    // the value to be shown with any precision set from 0 to 20
    numeralDecimalScale: MAXIMUM_PRECISION,
    // This option is provided to help Cleave slice the numerical values
    // according to a certain "scale". The default value is `10` which
    // effectively affects all numerical values
    // in MC where the value exceeds the length of `10`
    // We provide `0` to disable this feature.
    numeralIntegerScale: 0,
  };
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
    buttonRef={props.buttonRef}
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
  isDisabled: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  buttonRef: PropTypes.func.isRequired,

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
              buttonRef={props.setButtonReference}
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
  setButtonReference: PropTypes.func,
};

export class MoneyInput extends React.PureComponent {
  static displayName = 'MoneyInput';

  static propTypes = {
    value: PropTypes.shape({
      currencyCode: PropTypes.string.isRequired,
      centAmount: PropTypes.number,
    }).isRequired,

    /* to fix centAmount depending on Money type fractionDigits prop */
    fractionDigits: PropTypes.number,
    language: PropTypes.string.isRequired,
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
    fractionDigits: 2,
    isDisabled: false,
    currencies: [],
    horizontalConstraint: 'scale',
  };

  state = {
    cleaveComponentReference: null,
    dropdownButtonReference: null,
  };

  handleInit = cleaveComponentReference => {
    this.setState({ cleaveComponentReference });
    const initialMoneyValue = parseNumberToMoney(
      this.props.value.centAmount,
      this.props.fractionDigits
    );
    if (!isNil(initialMoneyValue)) {
      cleaveComponentReference.setRawValue(initialMoneyValue);
    } else {
      cleaveComponentReference.setRawValue('');
    }
  };

  setDropdownButtonReference = dropdownButtonReference =>
    this.setState({ dropdownButtonReference });

  handleCurrencyChange = (currency, toggleMenu) => {
    this.props.onChange({
      centAmount: this.props.value.centAmount,
      currencyCode: currency,
    });
    toggleMenu();
  };

  handleAmountChange = event => {
    const nextValue = event.target.rawValue;
    if (this.props.value.centAmount === nextValue || !isNumberish(nextValue))
      return;
    const centAmountValue =
      nextValue.length > 0
        ? Math.trunc(Math.round(nextValue * 10 ** this.props.fractionDigits))
        : undefined;

    this.props.onChange({
      currencyCode: this.props.value.currencyCode,
      centAmount: centAmountValue,
    });
  };

  handleBlur = () => {
    if (this.state.cleaveComponentReference)
      this.state.cleaveComponentReference.setRawValue(
        !isNil(this.props.value.centAmount)
          ? parseNumberToMoney(
              this.props.value.centAmount,
              this.props.fractionDigits
            )
          : ''
      );
    if (this.props.onBlur) this.props.onBlur(this.props.value);
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
              setButtonReference={this.setDropdownButtonReference}
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
          <Cleave
            placeholder={this.props.placeholder}
            options={defaultMemoize(getCleaveOptions(this.props.language))}
            className={getAmountStyles({
              isDisabled: this.props.isDisabled,
              hasAmountError: this.props.hasAmountError,
              hasAmountWarning: this.props.hasAmountWarning,
            })}
            onChange={this.handleAmountChange}
            onInit={this.handleInit}
            onBlur={this.handleBlur}
            disabled={this.props.isDisabled}
          />
        </div>
      </Contraints.Horizontal>
    );
  }
}

export default MoneyInput;
