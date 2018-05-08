import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash.isnil';
import Cleave from 'cleave.js/react';
import TetherComponent from 'react-tether';
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

const getCurrencyDropdownContainerStyles = (props, isOpen) => {
  if (props.isDisabled) return styles['disabled-currency-dropdown-container'];
  if (isOpen) return styles['currency-dropdown-open-container'];
  if (props.hasCurrencyError) return styles['currency-error'];
  if (props.hasCurrencyWarning) return styles['currency-warning'];

  return null;
};

const getCurrencyStyles = (props, isOpen) => {
  if (props.isDisabled) return styles['currency-disabled'];
  if (!isOpen) {
    if (props.hasCurrencyError) return styles['currency-error'];
    if (props.hasCurrencyWarning) return styles['currency-warning'];
  }
  return null;
};

const getAmountStyles = props => {
  if (props.isDisabled) return styles.disabled;
  if (props.hasAmountError) return styles.error;
  if (props.hasAmountWarning) return styles.warning;

  return styles.pristine;
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
    className={classnames(styles.currency, {
      [styles['currency-disabled']]: props.isDisabled,
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
    className={props.className}
  >
    <div className={styles['icon-wrapper']}>
      {React.cloneElement(
        props.isOpen && !props.isDisabled ? <CaretUpIcon /> : <CaretDownIcon />,
        {
          size: 'scale',
        }
      )}
    </div>
  </AccessibleButton>
);

DropdownChevron.displayName = 'DropdownChevron';
DropdownChevron.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
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
    currencies: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func,

    hasCurrencyError: PropTypes.bool,
    hasCurrencyWarning: PropTypes.bool,
    hasAmountError: PropTypes.bool,
    hasAmountWarning: PropTypes.bool,

    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
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
      ? Math.trunc(Math.round(nextValue * 10 ** this.props.fractionDigits))
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
    const selectedCurrency = this.props.currencies.find(
      currency => currency.value === this.props.value.currencyCode
    );
    const currencyLabel = selectedCurrency
      ? selectedCurrency.label
      : this.props.value.currencyCode;
    return (
      <Contraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div key={this.props.language} className={styles['field-container']}>
          {this.props.currencies.length > 1 ? (
            <Downshift
              render={({ isOpen, toggleMenu }) => (
                <div
                  className={classnames(
                    styles['currency-dropdown'],
                    getCurrencyDropdownContainerStyles(
                      {
                        isDisabled: this.props.isDisabled,
                        hasCurrencyError: this.props.hasCurrencyError,
                        hasCurrencyWarning: this.props.hasCurrencyWarning,
                      },
                      isOpen
                    )
                  )}
                >
                  <TetherComponent
                    attachment="top left"
                    targetAttachment="top left"
                    constraints={[
                      {
                        to: 'scrollParent',
                        attachment: 'target',
                      },
                    ]}
                    // this is the height of the dropdown header
                    offset="-24px 0"
                  >
                    <div className={styles['currency-wrapper']}>
                      <Currency
                        isDisabled={this.props.isDisabled}
                        onClick={toggleMenu}
                        currency={currencyLabel || ''}
                      />
                      {this.props.currencies.length > 1 && (
                        <DropdownChevron
                          buttonRef={this.setDropdownButtonReference}
                          onClick={toggleMenu}
                          isDisabled={this.props.isDisabled}
                          isOpen={isOpen}
                          className={classnames(
                            styles['chevron-icon'],
                            getCurrencyStyles(
                              {
                                isDisabled: this.props.isDisabled,
                                hasCurrencyError: this.props.hasCurrencyError,
                                hasCurrencyWarning: this.props
                                  .hasCurrencyWarning,
                              },
                              isOpen
                            )
                          )}
                        />
                      )}
                    </div>
                    {isOpen &&
                      this.props.currencies.length > 1 && (
                        <div className={styles['options-wrapper']}>
                          {this.props.currencies.map(currency => (
                            <Option
                              key={currency.value}
                              onClick={() => {
                                this.handleCurrencyChange(
                                  currency.value,
                                  toggleMenu
                                );
                              }}
                            >
                              {currency.label}
                            </Option>
                          ))}
                        </div>
                      )}
                  </TetherComponent>
                </div>
              )}
            />
          ) : (
            <div
              className={classnames(styles['currency-label'], {
                [styles['disabled-currency-label']]: this.props.isDisabled,
              })}
            >
              <div className={styles['currency-wrapper']}>
                <Currency
                  isDisabled={this.props.isDisabled}
                  currency={currencyLabel || ''}
                />
              </div>
            </div>
          )}
          <Cleave
            placeholder={this.props.placeholder}
            htmlRef={this.registerTextInputRef}
            options={getCleaveOptions(
              this.props.language,
              this.state.fractionDigits
            )}
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
        </div>
      </Contraints.Horizontal>
    );
  }
}

export default MoneyInput;
