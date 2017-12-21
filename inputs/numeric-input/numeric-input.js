import React from 'react';
import PropTypes from 'prop-types';
import Spacings from '../../materials/spacings';
import LoadingSpinner from '../../loading-spinner';
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

const getStyles = props => {
  if (props.isReadOnly) return styles.readonly;
  if (props.isDisabled) return styles.disabled;
  if (props.isLoading) return styles.loading;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;

  return styles.pristine;
};

const NumericInput = props => (
  <div className={styles.container}>
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
      className={getStyles(props)}
      readOnly={props.isReadOnly}
      /* ARIA */
      aria-readonly={props.isReadOnly}
      role="textbox"
      contentEditable={!props.isReadOnly}
    />
    {props.isLoading && (
      <div className={styles.spinner}>
        <Spacings.InsetSquish>
          <LoadingSpinner scale="s" />
        </Spacings.InsetSquish>
      </div>
    )}
  </div>
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
  onFocus: PropTypes.func,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default NumericInput;
