import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash.isnil';
import Cleave from 'cleave.js/react';
import classnames from 'classnames';
import {
  getSeparatorsForLocale,
  isNumberish,
} from '@commercetools-local/utils/numbers';
import { CaretDownIcon, CaretUpIcon } from '../../icons';
import AccessibleButton from '../../buttons/accessible-button';
import Contraints from '../../materials/constraints';
import styles from './money-numeric-input.mod.css';

const getCurrencyStyles = props => {
  if (props.hasCurrencyError) return styles['currency-error'];
  if (props.hasCurrencyWarning) return styles['currency-warning'];

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
export const parseNumberToMoney = (number, fractionDigit) => {
  if (!isNumberish(number)) return undefined;
  return parseFloat(number * 0.1 ** fractionDigit).toFixed(fractionDigit);
};

const DropdownChevron = props => (
  <AccessibleButton
    buttonRef={props.buttonRef}
    label="Open Dropdown"
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    isOpen={props.isOpen}
    className={props.className}
  >
    <div className={styles.iconWrapper}>
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

export const CurrencyDropdownHead = props => (
  <div className={styles['selected-option-wrapper']}>
    <AccessibleButton
      label={props.children}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      className={classnames(styles['selected-option'], {
        [styles['currency-disabled']]: props.isDisabled,
      })}
    >
      {props.children}
    </AccessibleButton>
    {props.chevron}
  </div>
);

CurrencyDropdownHead.displayName = 'CurrencyDropdownHead';
CurrencyDropdownHead.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  chevron: PropTypes.element,
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
    currencyName: PropTypes.string,
    amountName: PropTypes.string,
    value: PropTypes.number,
    /* to fix amount depending on Money type fractionDigit prop */
    fractionDigit: PropTypes.number,
    language: PropTypes.string.isRequired,
    selectedCurrency: PropTypes.shape({
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
    isCurrencySelectable: PropTypes.bool,

    onCurrencyChange: PropTypes.func,
    hasCurrencyError: PropTypes.bool,
    hasCurrencyWarning: PropTypes.bool,

    onAmountChange: PropTypes.func,
    hasAmountError: PropTypes.bool,
    hasAmountWarning: PropTypes.bool,

    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  };

  static defaultProps = {
    fractionDigit: 2,
    isDisabled: false,
    isCurrencySelectable: true,
  };

  state = {
    moneyValue: parseNumberToMoney(this.props.value, this.props.fractionDigit),
    centAmountValue: this.props.value,
    cleaveComponentReference: null,
    dropdownButtonReference: null,
    isDropdownOpen: false,
    fractionDigit: this.props.fractionDigit,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.cleaveComponentReference &&
      (prevState.centAmountValue !== nextProps.value ||
        prevState.fractionDigit !== nextProps.fractionDigit)
    ) {
      prevState.cleaveComponentReference.setRawValue(
        !isNil(nextProps.value)
          ? parseNumberToMoney(nextProps.value, nextProps.fractionDigit)
          : ''
      );
      return {
        ...prevState,
        fractionDigit: nextProps.fractionDigit,
        moneyValue: parseNumberToMoney(
          nextProps.value,
          nextProps.fractionDigit
        ),
      };
    }
    return null;
  }

  setDropdownButtonReference = dropdownButtonReference =>
    this.setState({ dropdownButtonReference });

  handleOpenDropdown = () => this.setState({ isDropdownOpen: true });
  handleCloseDropdown = () => this.setState({ isDropdownOpen: false });

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
      Math.round(event.target.rawValue * 10 ** this.props.fractionDigit)
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

  // close the dropdown when anything but the dropdown trigger is clicked,
  // including when the dropdown content itself is clicked.
  handleGlobalClick = event => {
    const dropdownButton = this.state.dropdownButtonReference;
    if (
      dropdownButton &&
      event.target !== dropdownButton &&
      !dropdownButton.contains(event.target)
    ) {
      this.setState({ isDropdownOpen: false });
    }
  };

  componentDidMount() {
    window.addEventListener('click', this.handleGlobalClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleGlobalClick);
  }

  render() {
    const separators = getSeparatorsForLocale(this.props.language);
    return (
      <Contraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div key={this.props.language} className={styles.fieldContainer}>
          <div
            className={classnames(
              styles['currency-dropdown-container'],
              getCurrencyStyles(this.props),
              {
                [styles['disabled-currency-dropdown-container']]: this.props
                  .isDisabled,
                [styles['currency-dropdown-open-container']]: this.state
                  .isDropdownOpen,
              }
            )}
          >
            <CurrencyDropdownHead
              onClick={
                this.state.isDropdownOpen
                  ? this.handleCloseDropdown
                  : this.handleOpenDropdown
              }
              isDisabled={
                !this.props.isCurrencySelectable || this.props.isDisabled
              }
              chevron={
                this.props.isCurrencySelectable ? (
                  <DropdownChevron
                    buttonRef={this.setDropdownButtonReference}
                    onClick={
                      this.state.isDropdownOpen
                        ? this.handleCloseDropdown
                        : this.handleOpenDropdown
                    }
                    isDisabled={this.props.isDisabled}
                    isOpen={this.state.isDropdownOpen}
                    className={classnames(
                      styles['chevron-icon'],
                      getCurrencyStyles(this.props),
                      {
                        [styles['currency-disabled']]: this.props.isDisabled,
                      }
                    )}
                  />
                ) : (
                  undefined
                )
              }
            >
              {this.props.selectedCurrency
                ? this.props.selectedCurrency.label
                : ''}
            </CurrencyDropdownHead>
            {this.state.isDropdownOpen &&
              this.props.isCurrencySelectable && (
                <Options>
                  {this.props.currencies.map(currency => (
                    <Option
                      key={currency.value}
                      name={this.props.currencyName}
                      onClick={event =>
                        this.props.onCurrencyChange({
                          ...event,
                          target: {
                            ...event.target,
                            value: currency.value,
                            label: currency.label,
                          },
                        })
                      }
                    >
                      {currency.label}
                    </Option>
                  ))}
                </Options>
              )}
          </div>
          <Cleave
            placeholder={this.props.placeholder}
            htmlRef={this.registerTextInputRef}
            options={{
              numeral: true,
              numeralThousandsGroupStyle: 'thousand',
              numeralDecimalMark: separators.decSeparator,
              delimiter: separators.thoSeparator,
              numeralDecimalScale: this.state.fractionDigit,
              // This option is provided to help Cleave slice the numerical values
              // according to a certain "scale". The default value is `10` which
              // effectively affects all numerical values (including AttributeMoney)
              // in MC where the value exceeds the length of `10`
              // We provide `0` to disable this feature.
              numeralIntegerScale: 0,
            }}
            name={this.props.amountName}
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
