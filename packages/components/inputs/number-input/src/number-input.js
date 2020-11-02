import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import requiredIf from 'react-required-if';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import { getInputStyles } from '../../styles';

const NumberInput = (props) => (
  <Constraints.Horizontal
    max={Constraints.parseHorizontalConstraintProp(props.horizontalConstraint)}
  >
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
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id: PropTypes.string,
  /**
   * Used as HTML name of the input component. property
   */
  name: PropTypes.string,
  /**
   * Used as HTML `autocomplete` of the input component. property
   */
  autoComplete: PropTypes.string,
  /**
   * Value of the input component.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * Value is used as `min` property on input field
   */
  min: PropTypes.number,
  /**
   * Value is used as `max` property on input field
   */
  max: PropTypes.number,
  /**
   * Value is used as `step` property on input field
   * <br />
   * Use the value `any` for inputs which accept an unpredictable amount of decimals.
   */
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['any'])]),
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   * <br />
   * Signature: `(event) => void`
   */
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  /**
   * Called when input is blurred
   * <br />
   * Signature: `(event) => void`
   */
  onBlur: PropTypes.func,
  /**
   * Called when input is focused
   * <br />
   * Signature: `(event) => void`
   */
  onFocus: PropTypes.func,
  /**
   * Focus the input on initial render
   */
  isAutofocussed: PropTypes.bool,
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled: PropTypes.bool,
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly: PropTypes.bool,
  /**
   * Placeholder text for the input
   */
  placeholder: PropTypes.string,
  /**
   * Indicates that input has errors
   */
  hasError: PropTypes.bool,
  /**
   * Control to indicate on the input if there are selected values that are potentially invalid
   */
  hasWarning: PropTypes.bool,
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf([
    'xs',
    's',
    'm',
    'l',
    'xl',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    'scale',
    'auto',
  ]),
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
