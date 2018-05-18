import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash.isnil';
import Cleave from 'cleave.js/react';
import classnames from 'classnames';
import Downshift from 'downshift';
import {
  getSeparatorsForLocale,
  isNumberish,
} from '@commercetools-local/utils/numbers';
import { CaretDownIcon, CaretUpIcon } from '../../icons';
import AccessibleButton from '../../buttons/accessible-button';
import Contraints from '../../materials/constraints';
import styles from './money-input.mod.css';

const getCurrencyDropdownSelectStyles = (props, isOpen) => {
  if (props.isDisabled) return styles['currency-disabled'];
  if (props.hasCurrencyError) return styles['currency-error'];
  if (props.hasCurrencyWarning) return styles['currency-warning'];
  if (isOpen) return styles['currency-active'];

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

const getCleaveOptions = (language, fractionDigits) => {
  const separators = getSeparatorsForLocale(language);
  return {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    numeralDecimalMark: separators.decSeparator,
    delimiter: separators.thoSeparator,
    numeralDecimalScale: fractionDigits,
    // This option is provided to help Cleave slice the numerical values
    // according to a certain "scale". The default value is `10` which
    // effectively affects all numerical values (including AttributeMoney)
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
    label="Open/Close Dropdown"
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    isOpen={props.isOpen}
    className={classnames(styles['chevron-icon'], {
      [styles['chevron-icon-disabled']]: props.isDisabled,
    })}
  >
    <div className={styles['icon-wrapper']}>
      {React.cloneElement(props.isOpen ? <CaretUpIcon /> : <CaretDownIcon />, {
        size: 'scale',
      })}
    </div>
  </AccessibleButton>
);

DropdownChevron.displayName = 'DropdownChevron';
DropdownChevron.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  buttonRef: PropTypes.func.isRequired,
};

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

export class MoneyInput extends React.PureComponent {
  static displayName = 'MoneyInput';

  static propTypes = {
    value: PropTypes.shape({
      currencyCode: PropTypes.string,
      amount: PropTypes.number,
    }).isRequired,
    /* to fix amount depending on Money type fractionDigits prop */
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
  };

  state = {
    centAmountValue: this.props.value.amount,
    cleaveComponentReference: null,
    dropdownButtonReference: null,
    fractionDigits: this.props.fractionDigits,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.cleaveComponentReference &&
      (prevState.centAmountValue !== this.props.value.amount ||
        prevState.fractionDigits !== this.props.fractionDigits)
    ) {
      prevState.cleaveComponentReference.setRawValue(
        !isNil(this.props.value.amount)
          ? parseNumberToMoney(
              this.props.value.amount,
              this.props.fractionDigits
            )
          : ''
      );

      this.setState({
        ...prevState,
        centAmountValue: this.props.value.amount,
        fractionDigits: this.props.fractionDigits,
      });
    }
  }

  handleInit = cleaveComponentReference => {
    this.setState({ cleaveComponentReference });
    const initialMoneyValue = parseNumberToMoney(
      this.props.value.amount,
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
      ...this.props.value,
      currencyCode: currency,
    });
    toggleMenu();
  };

  handleAmountChange = event => {
    const nextValue = event.target.rawValue;
    if (this.props.value.amount === nextValue) return;
    const centAmountValue = nextValue
      ? Math.trunc(Math.round(nextValue * 10 ** this.state.fractionDigits))
      : undefined;
    this.props.onChange({
      ...this.props.value,
      amount: centAmountValue,
    });
  };

  handleBlur = () => {
    if (this.props.onBlur) this.props.onBlur(this.props.value);
  };

  registerTextInputRef = ref => {
    this.textInput = ref;
  };

  render() {
    return (
      <Contraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div key={this.props.language} className={styles['field-container']}>
          {this.props.currencies.length > 0 ? (
            <Downshift
              render={({ isOpen, toggleMenu }) => (
                <div
                  className={getCurrencyDropdownSelectStyles(
                    {
                      isDisabled: this.props.isDisabled,
                      hasCurrencyError: this.props.hasCurrencyError,
                      hasCurrencyWarning: this.props.hasCurrencyWarning,
                    },
                    isOpen
                  )}
                >
                  <div className={styles['currency-wrapper']}>
                    <Currency
                      isDisabled={this.props.isDisabled}
                      onClick={toggleMenu}
                      currency={this.props.value.currencyCode}
                    />
                    {this.props.currencies.length > 0 && (
                      <DropdownChevron
                        buttonRef={this.setDropdownButtonReference}
                        onClick={toggleMenu}
                        isDisabled={this.props.isDisabled}
                        isOpen={isOpen}
                      />
                    )}
                  </div>
                  {isOpen &&
                    this.props.currencies.length > 0 && (
                      <div
                        className={getCurrencyDropdownOptionsStyles({
                          hasCurrencyError: this.props.hasCurrencyError,
                          hasCurrencyWarning: this.props.hasCurrencyWarning,
                        })}
                      >
                        {this.props.currencies.map(currency => (
                          <Option
                            key={currency}
                            onClick={() => {
                              this.handleCurrencyChange(currency, toggleMenu);
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
          {/*
          turning the fractionDigits into an array is only to force the Cleave
          to rerender when the prop changes, as the options object cannot be
          updated dynamically
          */}
          {[this.props.fractionDigits].map(fractionDigits => (
            <Cleave
              key="money-amount-input"
              placeholder={this.props.placeholder}
              htmlRef={this.registerTextInputRef}
              options={getCleaveOptions(this.props.language, fractionDigits)}
              className={getAmountStyles({
                isDisabled: this.props.isDisabled,
                hasAmountError: this.props.hasAmountError,
                hasAmountWarning: this.props.hasAmountWarning,
              })}
              onChange={this.handleAmountChange}
              onInit={this.handleInit}
              onBlur={this.props.onBlur}
              disabled={this.props.isDisabled}
            />
          ))}
        </div>
      </Contraints.Horizontal>
    );
  }
}

export default MoneyInput;
