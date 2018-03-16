import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { filterDataAttributes } from '@commercetools-local/utils/dataset';
import styles from './text-input.mod.css';

const getStyles = props => {
  if (props.isReadOnly) return styles.readonly;
  if (props.isDisabled) return styles.disabled;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;

  return styles.pristine;
};

const TextInput = props => (
  <div className={styles.container}>
    <input
      name={props.name}
      type="text"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      disabled={props.isDisabled}
      placeholder={props.placeholder}
      className={getStyles(props)}
      readOnly={props.isReadOnly}
      autoFocus={props.isAutofocussed}
      {...filterDataAttributes(props)}
      /* ARIA */
      aria-readonly={props.isReadOnly}
      role="textbox"
      contentEditable={!props.isReadOnly}
    />
  </div>
);

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
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
};

export default TextInput;
