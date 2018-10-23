import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import Spacings from '../../spacings';
import styles from './money-input.mod.css';
import Currency from './currency';
import Option from './option';
import DropdownChevron from './dropdown-chevron';
import filterDataAttributes from '../../../utils/filter-data-attributes';

const getCurrencyDropdownSelectStyles = ({
  isDisabled,
  hasError,
  hasWarning,
  isOpen,
}) => {
  if (isDisabled) return styles['currency-disabled'];
  if (hasError) return styles['currency-error'];
  if (hasWarning) return styles['currency-warning'];
  if (isOpen) return styles['currency-active'];

  return styles['currency-default'];
};

const getCurrencyDropdownOptionsStyles = props => {
  if (props.hasError) return styles['options-wrapper-error'];
  if (props.hasWarning) return styles['options-wrapper-warning'];

  return styles['options-wrapper-active'];
};

const CurrencyDropdown = props => (
  <Downshift>
    {({ isOpen, toggleMenu }) => (
      <div
        className={getCurrencyDropdownSelectStyles({
          isDisabled: props.isDisabled,
          hasError: props.hasError,
          hasWarning: props.hasWarning,
          isOpen,
        })}
        {...filterDataAttributes(props)}
      >
        <div className={styles.languagesDropdown} onClick={toggleMenu}>
          <Spacings.Inline scale="xs" alignItems="center">
            <Currency
              id={props.id}
              isDropdown={true}
              isDisabled={props.isDisabled}
              hasError={props.hasError}
              hasWarning={props.hasWarning}
              currency={props.currencyCode}
            />
            {props.currencies.length > 0 && (
              <DropdownChevron isDisabled={props.isDisabled} isOpen={isOpen} />
            )}
          </Spacings.Inline>
        </div>
        {isOpen &&
          props.currencies.length > 0 && (
            <div
              className={getCurrencyDropdownOptionsStyles({
                hasError: props.hasError,
                hasWarning: props.hasWarning,
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
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
};

export default CurrencyDropdown;
