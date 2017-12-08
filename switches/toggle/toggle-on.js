import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './toggle.mod.css';

const ToggleOn = props =>
  props.isChecked ? (
    <span
      className={classnames(styles.toggleLabel, {
        [styles.textWrapperDisabled]: props.isDisabled,
      })}
    >
      {props.children}
    </span>
  ) : null;

ToggleOn.displayName = 'ToggleOn';
ToggleOn.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default ToggleOn;
