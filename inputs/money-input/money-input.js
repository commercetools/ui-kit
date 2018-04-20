import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import NumericFormatInput from '@commercetools-local/core/components/fields/numeric-format-input';
import styles from './money-input.mod.css';

const getStyles = props => {
  if (props.isDisabled) return styles.disabled;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;

  return styles.input;
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

const MoneyInput = props => (
  <div
    className={classnames(
      styles.container,
      getConstraintSyle(props.horizontalConstraint)
    )}
  >
    <NumericFormatInput
      name={props.name}
      className={getStyles(props)}
      numberFormat={props.language}
      numberFormatType="money"
      value={props.value}
      onChangeValue={props.onChange}
      onBlurValue={props.onBlur}
      disabled={props.isDisabled}
    />
  </div>
);

MoneyInput.displayName = 'MoneyInput';

MoneyInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
};

export default MoneyInput;
