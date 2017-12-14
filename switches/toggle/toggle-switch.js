import React from 'react';
import PropTypes from 'prop-types';
import Icons from './icons';
import styles from './toggle.mod.css';

const ToggleButton = props => {
  if (props.isChecked) {
    if (props.isDisabled) {
      return <Icons.ButtonCheckedDisabled {...props} />;
    } else if (props.isMouseOver) {
      return <Icons.ButtonCheckedHover {...props} />;
    }
    return <Icons.ButtonChecked {...props} />;
  }

  if (props.isDisabled) {
    return <Icons.ButtonDisabled {...props} />;
  } else if (props.isMouseOver) {
    return <Icons.ButtonHover {...props} />;
  }
  return <Icons.ButtonDefault {...props} />;
};

ToggleButton.displayName = 'ToggleButton';
ToggleButton.propTypes = {
  size: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isMouseOver: PropTypes.bool.isRequired,
};

const ToggleBar = props => {
  if (props.isChecked) {
    if (props.isDisabled) {
      return (
        <Icons.BackgroundCheckedDisabled
          className={styles[`bar-${props.size}`]}
        />
      );
    } else if (props.isMouseOver) {
      return (
        <Icons.BackgroundCheckedHover className={styles[`bar-${props.size}`]} />
      );
    }
    return <Icons.BackgroundChecked className={styles[`bar-${props.size}`]} />;
  }
  if (props.isDisabled) {
    return <Icons.BackgroundDisabled className={styles[`bar-${props.size}`]} />;
  } else if (props.isMouseOver) {
    return <Icons.BackgroundHover className={styles[`bar-${props.size}`]} />;
  }
  return <Icons.BackgroundDefault className={styles[`bar-${props.size}`]} />;
};

ToggleBar.displayName = 'ToggleBar';
ToggleBar.propTypes = {
  size: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isMouseOver: PropTypes.bool.isRequired,
};

const ToggleSwitch = props => (
  <div className={styles[`container-${props.size}`]}>
    <ToggleButton {...props} />
    <ToggleBar {...props} />
  </div>
);

ToggleSwitch.displayName = 'ToggleSwitch';
ToggleSwitch.propTypes = {
  size: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isMouseOver: PropTypes.bool.isRequired,
};

export default ToggleSwitch;
