import React from 'react';
import PropTypes from 'prop-types';
import Icons from './icons';
import styles from './toggle.mod.css';

const ToggleSwitch = props => (
  <div className={styles.toggleSwitch}>
    {(() => {
      if (props.isChecked && props.isDisabled)
        return (
          <Icons.ButtonCheckedDisabled className={styles.toggleButtonChecked} />
        );
      else if (props.isChecked && props.isMouseOver)
        return (
          <Icons.ButtonCheckedHover
            className={styles.toggleButtonCheckedHover}
          />
        );
      else if (props.isChecked)
        return <Icons.ButtonChecked className={styles.toggleButtonChecked} />;
      else if (props.isDisabled)
        return <Icons.ButtonDisabled className={styles.toggleButton} />;
      else if (props.isMouseOver)
        return <Icons.ButtonHover className={styles.toggleButtonHover} />;

      return <Icons.ButtonDefault className={styles.toggleButton} />;
    })()}
    {(() => {
      if (props.isChecked)
        if (props.isDisabled)
          return (
            <Icons.BackgroundCheckedDisabled className={styles.toggleBar} />
          );
        else if (props.isMouseOver)
          return <Icons.BackgroundCheckedHover className={styles.toggleBar} />;
        else return <Icons.BackgroundChecked className={styles.toggleBar} />;
      else if (props.isDisabled)
        return <Icons.BackgroundDisabled className={styles.toggleBar} />;
      else if (props.isMouseOver)
        return <Icons.BackgroundHover className={styles.toggleBar} />;

      return <Icons.BackgroundDefault className={styles.toggleBar} />;
    })()}
  </div>
);

ToggleSwitch.displayName = 'ToggleSwitch';
ToggleSwitch.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isMouseOver: PropTypes.bool.isRequired,
};

export default ToggleSwitch;
