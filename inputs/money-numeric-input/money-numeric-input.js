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
import styles from './money-numeric-input.mod.css';

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

const Options = props => (
  <div className={styles['options-wrapper']}>{props.children}</div>
);
Options.displayName = 'Options';
Options.propTypes = {
  children: PropTypes.node.isRequired,
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

export class MoneyNumericInput extends React.PureComponent {
  static displayName = 'MoneyNumericInput';

  static propTypes = {
    currencyInputName: PropTypes.string,
    amountInputName: PropTypes.string,
    value: PropTypes.number,
    /* to fix amount depending on Money type fractionDigits prop */
    fractionDigits: PropTypes.number,
    language: PropTypes.string.isRequired,
    currency: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    currencies: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    isDisabled: PropTypes.bool,

    onCurrencyChange: PropTypes.func,
    hasCurrencyError: PropTypes.bool,
    hasCurrencyWarning: PropTypes.bool,

    onAmountChange: PropTypes.func,
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
    moneyValue: parseNumberToMoney(this.props.value, this.props.fractionDigits),
    centAmountValue: this.props.value,
    cleaveComponentReference: null,
    dropdownButtonReference: null,
    fractionDigits: this.props.fractionDigits,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.cleaveComponentReference &&
      (prevState.centAmountValue !== nextProps.value ||
        prevState.fractionDigits !== nextProps.fractionDigits)
    ) {
      prevState.cleaveComponentReference.setRawValue(
        !isNil(nextProps.value)
          ? parseNumberToMoney(nextProps.value, nextProps.fractionDigits)
          : ''
      );
      return {
        ...prevState,
        fractionDigits: nextProps.fractionDigits,
        moneyValue: parseNumberToMoney(
          nextProps.value,
          nextProps.fractionDigits
        ),
      };
    }
    return null;
  }

  setDropdownButtonReference = dropdownButtonReference =>
    this.setState({ dropdownButtonReference });

  handleInit = cleaveComponentReference => {
    this.setState({ cleaveComponentReference });
    if (!isNil(this.state.moneyValue)) {
      cleaveComponentReference.setRawValue(this.state.moneyValue);
    } else {
      cleaveComponentReference.setRawValue('');
    }
  };

  handleAmountChange = event => {
    const nextValue = event.target.rawValue;
    if (this.state.moneyValue === nextValue) return;
    const centAmountValue = Math.trunc(
      Math.round(event.target.rawValue * 10 ** this.props.fractionDigits)
    );
    this.setState({ moneyValue: nextValue, centAmountValue });
    this.props.onAmountChange({
      ...event,
      target: {
        ...event.target,
        value: centAmountValue,
      },
    });
  };

  handleBlur = () => {
    this.setValue(this.props.value);
    if (this.props.onBlur) this.props.onBlur(this.props.value);
  };

  registerTextInputRef = ref => {
    this.textInput = ref;
  };

  getCleaveOptions = () => {
    const separators = getSeparatorsForLocale(this.props.language);
    return {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      numeralDecimalMark: separators.decSeparator,
      delimiter: separators.thoSeparator,
      numeralDecimalScale: this.state.fractionDigits,
      // This option is provided to help Cleave slice the numerical values
      // according to a certain "scale". The default value is `10` which
      // effectively affects all numerical values (including AttributeMoney)
      // in MC where the value exceeds the length of `10`
      // We provide `0` to disable this feature.
      numeralIntegerScale: 0,
    };
  };

  handleCurrencyChange = (event, currency) =>
    this.props.onCurrencyChange({
      ...event,
      target: {
        ...event.target,
        value: currency.value,
        label: currency.label,
      },
    });

  render() {
    return (
      <Contraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div key={this.props.language} className={styles['field-container']}>
          <Downshift
            render={({ isOpen, toggleMenu }) => (
              <div
                className={classnames(
                  styles['currency-dropdown-container'],
                  getCurrencyDropdownContainerStyles(this.props, isOpen)
                )}
              >
                <div className={styles['currency-selected-wrapper']}>
                  <AccessibleButton
                    label={this.props.currency ? this.props.currency.label : ''}
                    onClick={toggleMenu}
                    isDisabled={
                      this.props.currencies.length === 0 ||
                      this.props.isDisabled
                    }
                    className={classnames(styles['currency-selected'], {
                      [styles['currency-disabled']]:
                        this.props.currencies.length === 0 ||
                        this.props.isDisabled,
                    })}
                  >
                    {this.props.currency ? this.props.currency.label : ''}
                  </AccessibleButton>
                  {this.props.currencies.length > 0 && (
                    <DropdownChevron
                      buttonRef={this.setDropdownButtonReference}
                      onClick={toggleMenu}
                      isDisabled={this.props.isDisabled}
                      isOpen={isOpen}
                      className={classnames(
                        styles['chevron-icon'],
                        getCurrencyStyles(this.props, isOpen)
                      )}
                    />
                  )}
                </div>
                {isOpen &&
                  this.props.currencies.length > 0 && (
                    <Options>
                      {this.props.currencies.map(currency => (
                        <Option
                          key={currency.value}
                          name={this.props.currencyInputName}
                          onClick={event => {
                            this.handleCurrencyChange(event, currency);
                            toggleMenu();
                          }}
                        >
                          {currency.label}
                        </Option>
                      ))}
                    </Options>
                  )}
              </div>
            )}
          />
          <Cleave
            placeholder={this.props.placeholder}
            htmlRef={this.registerTextInputRef}
            options={this.getCleaveOptions()}
            name={this.props.amountInputName}
            className={getAmountStyles(this.props)}
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

export default MoneyNumericInput;
