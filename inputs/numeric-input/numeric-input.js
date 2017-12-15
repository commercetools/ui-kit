import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './numeric-input.mod.css';

function calculateValue(props) {
  if (props.maxValue || props.minValue) {
    if (parseInt(props.value, 10) > props.maxValue) {
      return props.maxValue;
    }
    if (parseInt(props.value, 10) < props.minValue) {
      return props.minValue;
    }
  }
  return props.value;
}

const NumericInput = props => (
  <input
    name={props.name}
    type="number"
    value={calculateValue(props)}
    min={props.minValue}
    max={props.maxValue}
    step={props.stepValue}
    onChange={props.onChange}
    onBlur={props.onBlur}
    disabled={props.isDisabled}
    placeholder={props.placeholder}
    className={classnames(styles.input, {
      [styles.disabled]: props.isDisabled,
      [styles.inactive]: props.isInactive,
      [styles.readonly]: props.isReadOnly,
      [styles[props.tone]]: props.tone,
    })}
    readOnly={props.isReadOnly}
    /* ARIA */
    aria-readonly={props.isReadOnly}
    role="textbox"
    contentEditable={!props.isReadOnly}
  />
);

NumericInput.displayName = 'NumericInput';

NumericInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  minValue: PropTypes.string,
  maxValue: PropTypes.string,
  stepValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  isInactive: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  tone: PropTypes.oneOf(['plain', 'warning', 'error', 'info']),
};

NumericInput.defaultProps = {
  tone: 'plain',
};

export default NumericInput;
