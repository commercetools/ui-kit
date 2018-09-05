import React from 'react';
import PropTypes from 'prop-types';
import BaseButtonWrapper from '../base-button-wrapper';
import styles from './primary-action-button.mod.css';

const PrimaryActionButton = props => (
  <BaseButtonWrapper {...props}>
    <span className={styles.button}>{props.children}</span>
  </BaseButtonWrapper>
);

PrimaryActionButton.displayName = 'PrimaryActionButton';

PrimaryActionButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  ref: PropTypes.string,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  dataAttr: PropTypes.object,
  isDisabled: PropTypes.bool,
  isToggled: PropTypes.bool,
  icon: PropTypes.node,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  size: PropTypes.oneOf(['small', 'big']),
};

export default PrimaryActionButton;
