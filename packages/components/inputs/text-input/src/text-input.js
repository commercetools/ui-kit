import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import { getInputStyles } from '../../styles';

const TextInput = (props) => {
  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <input
        id={props.id}
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.onChange}
        className={props.className}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        disabled={props.isDisabled}
        placeholder={props.placeholder}
        readOnly={props.isReadOnly}
        autoFocus={props.isAutofocussed}
        autoComplete={props.autoComplete}
        css={(theme) => getInputStyles(props, theme)}
        {...filterDataAttributes(props)}
        /* ARIA */
        aria-readonly={props.isReadOnly}
        role="textbox"
        contentEditable={!props.isReadOnly}
      />
    </Constraints.Horizontal>
  );
};

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
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
  placeholder: PropTypes.string,
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
};

TextInput.defaultProps = {
  horizontalConstraint: 'scale',
};

TextInput.isEmpty = (value) => !value || value.trim().length === 0;

export default TextInput;
