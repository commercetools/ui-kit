import React from 'react';
import PropTypes from 'prop-types';
import withMouseOverState from '../../hocs/with-mouse-over-state';
import AccessibleButton from '../accessible-button';
import styles from './secondary-icon-button.mod.css';

export const SecondaryIconButton = props => {
  let iconTheme = 'black';
  if (props.isDisabled) iconTheme = 'grey';
  else if (props.isMouseOver) iconTheme = 'green';
  return (
    <div
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
      className={styles.button}
    >
      <AccessibleButton
        label={props.label}
        onClick={props.onClick}
        isDisabled={props.isDisabled}
      >
        <div className={styles['icon-container']}>
          {React.cloneElement(props.icon, { theme: iconTheme })}
        </div>
      </AccessibleButton>
    </div>
  );
};

SecondaryIconButton.displayName = 'SecondaryIconButton';
SecondaryIconButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,

  // HoC
  isMouseOver: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
};
SecondaryIconButton.defaultProps = {
  isDisabled: false,
};

export default withMouseOverState(SecondaryIconButton);
