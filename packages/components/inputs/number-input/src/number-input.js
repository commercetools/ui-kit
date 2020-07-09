import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import requiredIf from 'react-required-if';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import { getInputStyles } from '../../styles';

const NumberInput = (props) => (
  <Constraints.Horizontal constraint={props.horizontalConstraint}>
    <input
      id={props.id}
      name={props.name}
      type="number"
      autoComplete={props.autoComplete}
      value={props.value}
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      disabled={props.isDisabled}
      placeholder={props.placeholder}
      css={(theme) => getInputStyles(props, theme)}
      readOnly={props.isReadOnly}
      autoFocus={props.isAutofocussed}
      {...filterDataAttributes(props)}
      /* ARIA */
      aria-readonly={props.isReadOnly}
      role="textbox"
      contentEditable={!props.isReadOnly}
    />
  </Constraints.Horizontal>
);

NumberInput.displayName = 'NumberInput';

NumberInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
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

NumberInput.toFormValue = (numberOrString) => {
  if (
    typeof numberOrString === 'number' ||
    typeof numberOrString === 'string'
  ) {
    return numberOrString;
  }
  return '';
};

NumberInput.isEmpty = (value) => {
  if (typeof value === 'string') return value.trim().length === 0;
  if (typeof value === 'number') return isNaN(value);
  return true;
};

NumberInput.hasFractionDigits = (number) => {
  const fraction = number % 1;
  invariant(
    !isNaN(fraction),
    'NumberInput.hasFractionDigits may only be called with valid numbers (either as string or number).'
  );
  return fraction !== 0;
};

export default NumberInput;
