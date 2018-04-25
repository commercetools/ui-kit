import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash.isnil';
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

  return styles.pristine;
};

// Since the Cleave component might call the onChange handler with a string
// we need to cast the string back to a number.
// This function ensures that the value is always either
// - null
// - undefined
// - JavaScript number
const parseMoney = number => {
  if (number === '' || !isNumberish(number)) return undefined;

  return parseFloat(number * 0.01).toFixed(2);
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

  state = {
    moneyValue: parseMoney(this.props.value),
    centAmountValue: this.props.value,
    cleaveComponentReference: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.cleaveComponentReference &&
      prevState.centAmountValue !== nextProps.value
    ) {
      prevState.cleaveComponentReference.setRawValue(
        !isNil(nextProps.value) ? parseMoney(nextProps.value) : ''
      );
      return {
        ...prevState,
        moneyValue: parseMoney(nextProps.value),
      };
    }
    return null;
  }

  handleInit = cleaveComponentReference => {
    this.setState({ cleaveComponentReference });
    if (!isNil(this.state.moneyValue)) {
      cleaveComponentReference.setRawValue(this.state.moneyValue);
    } else {
      cleaveComponentReference.setRawValue('');
    }
  };

  handleChange = event => {
    const nextValue = event.target.rawValue;
    if (this.state.moneyValue === nextValue) return;
    const centAmountValue = Math.trunc(Math.round(event.target.rawValue * 100));
    this.setState({ moneyValue: nextValue, centAmountValue });
    this.props.onChange({
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

  render() {
    const separators = getSeparatorsForLocale(this.props.language);
    return (
      <Contraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Cleave
          placeholder={this.props.placeholder}
          htmlRef={this.registerTextInputRef}
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
          onBlur={this.props.onBlur}
          disabled={this.props.isDisabled}
        />
      </Contraints.Horizontal>
    );
  }
}

export default MoneyNumericInput;
