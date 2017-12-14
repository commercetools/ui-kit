import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './toggle.mod.css';

const ToggleOff = props =>
  props.isChecked ? null : (
    <span
      className={classnames(styles.label, {
        [styles.textWrapperDisabled]: props.isDisabled,
      })}
    >
      {props.children}
    </span>
  );

ToggleOff.displayName = 'ToggleOff';
ToggleOff.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default ToggleOff;
