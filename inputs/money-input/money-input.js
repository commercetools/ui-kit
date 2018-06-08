import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Downshift from 'downshift';
import { injectIntl, intlShape } from 'react-intl';
import {
  getSeparatorsForLocale,
  isNumberish,
} from '@commercetools-local/utils/numbers';
import { CaretDownIcon, CaretUpIcon } from '../../icons';
import AccessibleButton from '../../buttons/accessible-button';
import Contraints from '../../materials/constraints';
import messages from './messages';
import styles from './money-input.mod.css';

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

const significantDigitsRegex = new RegExp(
  '.{1,3}(?=(.{3})+(?!.))|.{1,3}$',
  'g'
);

const formatNumber = (separators, stringValue) => {
  if (!stringValue.includes(separators.decSeparator))
    return {
      formattedNumber: stringValue,
      fractionDigits: 0,
    };

  const separatorIndex = stringValue.indexOf(separators.decSeparator);
  const significantDigits = stringValue.substring(0, separatorIndex);
  const decimalDigits = stringValue.substring(separatorIndex + 1);

  const formattedSignificantDigits = significantDigits
    .match(significantDigitsRegex)
    .join(separators.thoSeparator);

  return {
    centAmount: `${formattedSignificantDigits}${
      separators.decSeparator
    }${decimalDigits}`,
    fractionDigits: decimalDigits.length,
  };
};

export class MoneyInput extends React.PureComponent {
  static displayName = 'MoneyInput';

  static propTypes = {
    value: PropTypes.shape({
      currencyCode: PropTypes.string.isRequired,
      centAmount: PropTypes.string,
    }).isRequired,

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

    // Intl
    intl: intlShape,
  };

  static defaultProps = {
    isDisabled: false,
    currencies: [],
    horizontalConstraint: 'scale',
  };

  state = {
    dropdownButtonReference: null,
    separators: getSeparatorsForLocale(this.props.language),
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
    const centAmount = event.target.value.trim();

    /* if the user enters an invalid character we discard it */
    if (!isNumberish(centAmount)) return;

    this.props.onChange({
      currencyCode: this.props.value.currencyCode,
      centAmount,
    });
  };

  handleBlur = () => {
    if (this.props.value.centAmount && this.props.value.centAmount.length > 0) {
      const centAmountWithoutFormat = this.props.value.centAmount.replace(
        this.state.separators.thoSeparator,
        ''
      );

      const centAmountAsNumber = parseFloat(centAmountWithoutFormat);

      const { centAmount, fractionDigits } = formatNumber(
        this.state.separators,
        centAmountWithoutFormat
      );

      this.props.onChange({
        currencyCode: this.props.value.currencyCode,
        centAmount,
      });

      if (this.props.onBlur)
        this.props.onBlur({
          centAmountAsNumber,
          fractionDigits,
        });
    }
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
          <input
            value={this.props.value.centAmount}
            className={getAmountStyles({
              isDisabled: this.props.isDisabled,
              hasAmountError: this.props.hasAmountError,
              hasAmountWarning: this.props.hasAmountWarning,
            })}
            placeholder={this.props.placeholder}
            onChange={this.handleAmountChange}
            onBlur={this.handleBlur}
            disabled={this.props.isDisabled}
          />
        </div>
      </Contraints.Horizontal>
    );
  }
}

export default injectIntl(MoneyInput);
