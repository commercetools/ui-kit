import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { getInputStyles } from '../styles';
import { getConstraintSyles } from '../../constraints/horizontal';

const TextInput = props => {
  const { horizontalConstraint, ...inputProps } = props;

  return (
    <input
      type="text"
      css={theme => [
        getInputStyles(props, theme),
        getConstraintSyles(props.horizontalConstraint),
      ]}
      /* ARIA */
      role="textbox"
      aria-readonly={props.readOnly}
      contentEditable={!props.readOnly}
      {...inputProps}
    />
  );
};

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
};

TextInput.isEmpty = value => !value || value.trim().length === 0;

export default TextInput;
