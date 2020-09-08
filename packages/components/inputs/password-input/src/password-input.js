import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import { getInputStyles } from '../../styles';

const PasswordInput = (props) => (
  <Constraints.Horizontal constraint={props.horizontalConstraint}>
    <input
      id={props.id}
      name={props.name}
      type={props.isPasswordVisible ? 'text' : 'password'}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      disabled={props.isDisabled}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      css={(theme) => getInputStyles(props, theme)}
      readOnly={props.isReadOnly}
      autoFocus={props.isAutofocussed}
      {...filterDataAttributes(props)}
      /* ARIA */
      aria-readonly={props.isReadOnly}
      contentEditable={!props.isReadOnly}
    />
  </Constraints.Horizontal>
);

PasswordInput.displayName = 'PasswordInput';

PasswordInput.propTypes = {
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id: PropTypes.string,
  /**
   * Used as HTML name of the input component. property
   */
  name: PropTypes.string,
  /**
   * Value of the input component.
   */
  value: PropTypes.string.isRequired,
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
   * Indicates that the input has an error
   */
  hasError: PropTypes.bool,
  /**
   * Indicates that the input has a warning due to e.g invalid values
   */
  hasWarning: PropTypes.bool,
  /**
   * Indicates whether we show the password or not
   */
  isPasswordVisible: PropTypes.bool,
  /**
   * Placeholder text for the input
   */
  placeholder: PropTypes.string,
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
  /**
   * Password autocomplete mode
   */
  autoComplete: PropTypes.oneOf([
    'on',
    'off',
    'current-password',
    'new-password',
  ]),
};

PasswordInput.defaultProps = {
  horizontalConstraint: 'scale',
  isDisabled: false,
  isReadOnly: false,
  isPasswordVisible: false,
};

PasswordInput.isEmpty = (value) => !value || value.trim().length === 0;

export default PasswordInput;
