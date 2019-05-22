import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import requiredIf from 'react-required-if';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import { getInputStyles } from '../styles';
import { getConstraintSyles } from '../../constraints/horizontal';
import throwDeprecationWarning from '../../../utils/warn-deprecated-prop';

const getNumberInputProps = (props = {}) => {
  const readOnly = props.readOnly || props.isReadOnly;

  return {
    type: 'number',
    readOnly,
    disabled: props.disabled || props.isDisabled,
    autoFocus: props.autoFocus || props.isAutofocussed,
    /* ARIA */
    role: 'textbox',
    'aria-readonly': readOnly,
    contentEditable: !readOnly,
    ...omit(props, [
      'hasError',
      'hasWarning',
      'horizontalConstraint',
      /* deprecated */
      'isReadOnly',
      'isDisabled',
      'isAutofocussed',
    ]),
  };
};

const NumberInput = props => (
  <input
    css={theme => [
      getInputStyles(props, theme),
      getConstraintSyles(props.horizontalConstraint),
    ]}
    {...getNumberInputProps(props)}
  />
);

NumberInput.displayName = 'NumberInput';

NumberInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  /* Deprecated Props */
  isAutofocussed(props, propName, componentName, ...rest) {
    if (!isNil(props[propName])) {
      throwDeprecationWarning(
        propName,
        componentName,
        `\n Please use "autofocus" prop instead.`
      );
    }
    return PropTypes.bool(props, propName, componentName, ...rest);
  },
  isDisabled(props, propName, componentName, ...rest) {
    if (!isNil(props[propName])) {
      throwDeprecationWarning(
        propName,
        componentName,
        `\n Please use "disabled" prop instead.`
      );
    }
    return PropTypes.bool(props, propName, componentName, ...rest);
  },
  isReadOnly(props, propName, componentName, ...rest) {
    if (!isNil(props[propName])) {
      throwDeprecationWarning(
        propName,
        componentName,
        `\n Please use "readOnly" prop instead.`
      );
    }
    return PropTypes.bool(props, propName, componentName, ...rest);
  },
};

NumberInput.toFormValue = numberOrString =>
  typeof numberOrString === 'undefined' ? '' : numberOrString;

NumberInput.isEmpty = value => {
  if (typeof value === 'string') return value.trim().length === 0;
  if (typeof value === 'number') return isNaN(value);
  return true;
};

NumberInput.hasFractionDigits = number => {
  const fraction = number % 1;
  invariant(
    !isNaN(fraction),
    'NumberInput.hasFractionDigits may only be called with valid numbers (either as string or number).'
  );
  return fraction !== 0;
};

export default NumberInput;
