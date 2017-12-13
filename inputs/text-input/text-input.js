import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './text-input.mod.css';

const TextInput = props => (
  <input
    name={props.name}
    type="text"
    value={props.value}
    onChange={props.onChange}
    onBlur={props.onBlur}
    disabled={props.isDisabled}
    placeholder={props.placeholder}
    className={classnames(styles.input, {
      [styles.invalid]: props.hasError,
      [styles.disabled]: props.isDisabled,
    })}
  />
);

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
  hasError: PropTypes.bool,
};

export default TextInput;
