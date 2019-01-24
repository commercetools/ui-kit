import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Constraints from '../../constraints';
import { getInputStyles } from './text-input.styles';

const TextInput = props => (
  <Constraints.Horizontal constraint={props.horizontalConstraint}>
    <input
      id={props.id}
      name={props.name}
      type="text"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      disabled={props.isDisabled}
      placeholder={props.placeholder}
      css={getInputStyles(props)}
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

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
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
  placeholder: PropTypes.string,
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
};

TextInput.defaultProps = {
  horizontalConstraint: 'scale',
};

TextInput.isEmpty = value => !value || value.trim().length === 0;

export default TextInput;
