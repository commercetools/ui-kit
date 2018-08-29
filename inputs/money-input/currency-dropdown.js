import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import Spacings from '../../materials/spacings';
import styles from './money-input.mod.css';
import Currency from './currency';
import Option from './option';
import DropdownChevron from './dropdown-chevron';

const getCurrencyDropdownSelectStyles = ({
  isDisabled,
  hasCurrencyError,
  hasCurrencyWarning,
  isOpen,
}) => {
  if (isDisabled) return styles['currency-disabled'];
  if (hasCurrencyError) return styles['currency-error'];
  if (hasCurrencyWarning) return styles['currency-warning'];
  if (isOpen) return styles['currency-active'];

  return styles['currency-default'];
};

const getCurrencyDropdownOptionsStyles = props => {
  if (props.hasCurrencyError) return styles['options-wrapper-error'];
  if (props.hasCurrencyWarning) return styles['options-wrapper-warning'];

  return styles['options-wrapper-active'];
};

const CurrencyDropdown = props => (
  <Downshift>
    {({ isOpen, toggleMenu }) => (
      <div
        className={getCurrencyDropdownSelectStyles({
          isDisabled: props.isDisabled,
          hasCurrencyError: props.hasCurrencyError,
          hasCurrencyWarning: props.hasCurrencyWarning,
          isOpen,
        })}
      >
        <div className={styles.languagesDropdown}>
          <Spacings.Inline scale="xs" alignItems="center">
            <Currency
              id={props.id}
              isDropdown={true}
              isDisabled={props.isDisabled}
              hasError={props.hasCurrencyError}
              hasWarning={props.hasCurrencyWarning}
              onClick={toggleMenu}
              currency={props.currencyCode}
            />
            {props.currencies.length > 0 && (
              <DropdownChevron
                onClick={toggleMenu}
                isDisabled={props.isDisabled}
                isOpen={isOpen}
              />
            )}
          </Spacings.Inline>
        </div>
        {isOpen &&
          props.currencies.length > 0 && (
            <div
              className={getCurrencyDropdownOptionsStyles({
                hasCurrencyError: props.hasCurrencyError,
                hasCurrencyWarning: props.hasCurrencyWarning,
              })}
            >
              {props.currencies.map(currencyCode => (
                <Option
                  key={currencyCode}
                  onClick={() => {
                    const event = {
                      persist: () => {},
                      target: { name: props.name, value: currencyCode },
                    };
                    if (props.onChange) props.onChange(event, toggleMenu);
                    if (props.onBlur) props.onBlur(event);
                  }}
                >
                  {currencyCode}
                </Option>
              ))}
            </div>
          )}
      </div>
    )}
  </Downshift>
);

CurrencyDropdown.displayName = 'CurrencyDropdown';
CurrencyDropdown.propTypes = {
  id: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencyCode: PropTypes.string,
  isDisabled: PropTypes.bool,
  hasCurrencyError: PropTypes.bool,
  hasCurrencyWarning: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
};

export default CurrencyDropdown;
