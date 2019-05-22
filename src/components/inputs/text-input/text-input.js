import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import { getInputStyles } from '../styles';
import { getConstraintSyles } from '../../constraints/horizontal';
import throwDeprecationWarning from '../../../utils/warn-deprecated-prop';

const getInputProps = (props = {}) => {
  const readOnly = props.readOnly || props.isReadOnly;

  return {
    type: 'text',
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

const TextInput = props => (
  <input
    css={theme => [
      getInputStyles(props, theme),
      getConstraintSyles(props.horizontalConstraint),
    ]}
    {...getInputProps(props)}
  />
);

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: requiredIf(
    PropTypes.func,
    props => !props.isReadOnly && !props.readOnly
  ),
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
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

TextInput.isEmpty = value => !value || value.trim().length === 0;

export default TextInput;
