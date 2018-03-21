import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { filterDataAttributes } from '@commercetools-local/utils/dataset';
import styles from './number-input.mod.css';

const getStyles = props => {
  if (props.isReadOnly) return styles.readonly;
  if (props.isDisabled) return styles.disabled;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;

  return styles.pristine;
};

const getConstraintSyle = horizontalConstraint => {
  switch (horizontalConstraint) {
    case 'xs':
      return styles.constraintXs;
    case 's':
      return styles.constraintS;
    case 'm':
      return styles.constraintM;
    case 'l':
      return styles.constraintL;
    case 'xl':
      return styles.constraintXl;
    case 'scale':
      return styles.constraintScale;
    default:
      return undefined;
  }
};

const NumberInput = props => (
  <div
    className={classnames(
      styles.container,
      getConstraintSyle(props.horizontalConstraint)
    )}
  >
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
  horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
};

NumberInput.defaultProps = {
  horizontalConstraint: 'scale',
};

export default NumberInput;
