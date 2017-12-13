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
      [styles.disabled]: props.isDisabled,
      [styles.inactive]: props.isInactive,
      [styles[props.tone]]: props.tone,
    })}
  />
);

TextInput.displayName = 'TextInput';

TextInput.defaultProps = {
  tone: 'default',
};

TextInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  isInactive: PropTypes.bool,
  placeholder: PropTypes.string,
  tone: PropTypes.oneOf(['default', 'warning', 'error', 'info']),
};

export default TextInput;
