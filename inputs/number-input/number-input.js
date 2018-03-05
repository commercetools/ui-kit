import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import styles from './number-input.mod.css';

const getStyles = props => {
  if (props.isReadOnly) return styles.readonly;
  if (props.isDisabled) return styles.disabled;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;

  return styles.pristine;
};

const NumberInput = props => (
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
      /* ARIA */
      aria-readonly={props.isReadOnly}
      role="textbox"
      contentEditable={!props.isReadOnly}
    />
  </div>
);

NumberInput.displayName = 'NumberInput';

NumberInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
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
};

export default NumberInput;
