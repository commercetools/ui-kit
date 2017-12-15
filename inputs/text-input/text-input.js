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
      [styles.readonly]: props.isReadOnly,
      [styles[props.tone]]: props.tone,
    })}
    readOnly={props.isReadOnly}
    /* ARIA */
    aria-readonly={props.isReadOnly}
    role="textbox"
    contentEditable={!props.isReadOnly}
  />
);

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  isInactive: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  tone: PropTypes.oneOf(['plain', 'warning', 'error', 'info']),
};

TextInput.defaultProps = {
  tone: 'plain',
};

export default TextInput;
