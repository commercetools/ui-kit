import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import { getInputStyles } from '../../../../../src/components/inputs/styles';

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
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
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

PasswordInput.isEmpty = (value) => !value || value.trim().length === 0;

export default PasswordInput;
