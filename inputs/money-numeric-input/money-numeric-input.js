import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash.isnil';
import isUndefined from 'lodash.isundefined';
import isFinite from 'lodash.isfinite';
import Cleave from 'cleave.js/react';
import {
  getSeparatorsForLocale,
  isNumberish,
} from '@commercetools-local/utils/numbers';
import Contraints from '../../materials/constraints';
import styles from './money-numeric-input.mod.css';

const getStyles = props => {
  if (props.isDisabled) return styles.disabled;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;

  return styles.input;
};

// only allow values of type Number or values that are nil (null or undefined)
// use isFinite to exclude Infitinty, -Inifinity and NaN
const isValidValue = value => isFinite(value) || isNil(value);

const formatNumber = number => (isNil(number) ? number : number.toFixed(2));

// Since the Cleave component might call the onChange handler with a string
// we need to cast the string back to a number.
// This function ensures that the value is always either
// - null
// - undefined
// - JavaScript number
const parseNumber = number => {
  if (number === '' || !isNumberish(number)) return undefined;

  return Math.trunc(Math.round(number * 100));
};

export class MoneyNumericInput extends React.PureComponent {
  static displayName = 'MoneyNumericInput';

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    language: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    isDisabled: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  };

  static defaultProps = {
    numeralDecimalScale: 20,
    isDisabled: false,
  };

  parsedNumber = this.props.value;

  componentWillReceiveProps(nextProps) {
    if (
      this.props.value !== nextProps.value &&
      nextProps.value !== this.parsedValue
    ) {
      this.setValue(nextProps.value);
    }
  }

  setValue = value => {
    if (!isValidValue(value)) return;
    const newValue = !isUndefined(value) ? formatNumber(value) : undefined;
    this.owner.setRawValue(newValue);
  };

  handleInit = owner => {
    this.owner = owner;
    this.setValue(this.props.value);
  };

  handleChange = event => {
    const parsedNumber = parseNumber(event.target.rawValue);

    if (this.parsedValue === parsedNumber) return;

    this.parsedValue = parsedNumber;
    this.props.onChange(parsedNumber);
  };

  handleBlur = () => {
    this.setValue(this.props.value);
    if (this.props.onBlur) this.props.onBlur(this.props.value);
  };

  registerInputRef = ref => {
    this.textInput = ref;
  };

  render() {
    const separators = getSeparatorsForLocale(this.props.language);
    return (
      <Contraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Cleave
          placeholder={this.props.placeholder}
          htmlRef={this.registerInputRef}
          options={{
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            numeralDecimalMark: separators.decSeparator,
            delimiter: separators.thoSeparator,
            numeralDecimalScale: 2,
            // This option is provided to help Cleave slice the numerical values
            // according to a certain "scale". The default value is `10` which
            // effectively affects all numerical values (including AttributeMoney)
            // in MC where the value exceeds the length of `10`
            // We provide `0` to disable this feature.
            numeralIntegerScale: 0,
          }}
          name={this.props.name}
          className={getStyles(this.props)}
          onChange={this.handleChange}
          onInit={this.handleInit}
          onBlur={this.handleBlur}
          disabled={this.props.isDisabled}
        />
      </Contraints.Horizontal>
    );
  }
}

export default MoneyNumericInput;
