import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import filterDataAttributes from '../../utils/filter-data-attributes';
import Constraints from '../../materials/constraints';
import styles from './number-input.mod.css';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getStyles = props => {
  if (props.isDisabled) return styles.disabled;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;
  if (props.isReadOnly) return styles.readonly;

  return styles.pristine;
};

const NumberInput = props => (
  <Constraints.Horizontal constraint={props.horizontalConstraint}>
    <div className={styles.container}>
      <input
        name={props.name}
        type="number"
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        disabled={props.isDisabled}
        placeholder={props.placeholder}
        className={getStyles(props)}
        readOnly={props.isReadOnly}
        autoFocus={props.isAutofocussed}
        {...filterDataAttributes(props)}
        /* ARIA */
        aria-readonly={props.isReadOnly}
        role="textbox"
        contentEditable={!props.isReadOnly}
      />
    </div>
  </Constraints.Horizontal>
);

NumberInput.displayName = 'NumberInput';

NumberInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isAutofocussed: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  placeholder: PropTypes.string,
  horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
};

NumberInput.defaultProps = {
  horizontalConstraint: 'scale',
};

NumberInput.toFormValue = numberOrString =>
  typeof numberOrString === 'undefined' ? '' : numberOrString;

NumberInput.isEmpty = value => {
  if (typeof value === 'string') return value.trim().length === 0;
  if (typeof value === 'number') return isNaN(value);
  return true;
};

// NumberInput.toFormValue = number =>
//   typeof number === 'number' && !isNaN(number) ? String(number) : '';
// NumberInput.parseFormValueAsFloat = string => parseFloat(string);
// NumberInput.parseFormValueAsInt = string => parseInt(string, 10);

export default NumberInput;
