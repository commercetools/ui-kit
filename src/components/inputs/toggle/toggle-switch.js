import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icons from './icons';
import styles from './toggle.mod.css';

const getStateClassNames = (baseClass, size, isDisabled, isChecked) =>
  classnames(styles[`${baseClass}-${size}`], {
    [styles.active]: isChecked,
    [styles.disabled]: isDisabled,
  });

export const ToggleButton = props => (
  <Icons.ButtonDefault
    className={getStateClassNames(
      'toggle-button',
      props.size,
      props.isDisabled,
      props.isChecked
    )}
  />
);

export const ToggleBar = props => (
  <Icons.BarDefault
    className={getStateClassNames(
      'toggle-bar',
      props.size,
      props.isDisabled,
      props.isChecked
    )}
  />
);

ToggleButton.displayName = 'ToggleButton';
ToggleButton.propTypes = {
  size: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

ToggleBar.displayName = 'ToggleBar';
ToggleBar.propTypes = {
  size: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const ToggleSwitch = props => (
  <div className={styles[`toggle-container-${props.size}`]}>
    <ToggleButton {...props} />
    <ToggleBar {...props} />
  </div>
);

ToggleSwitch.displayName = 'ToggleSwitch';
ToggleSwitch.propTypes = {
  size: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default ToggleSwitch;
