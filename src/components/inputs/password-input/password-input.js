import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Constraints from '../../constraints';
import styles from './password-input.mod.css';

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

const PasswordInput = props => (
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
      className={getStyles(props)}
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
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isAutofocussed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  isPasswordVisible: PropTypes.bool,
  placeholder: PropTypes.string,
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
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

PasswordInput.isEmpty = value => !value || value.trim().length === 0;

export default PasswordInput;
