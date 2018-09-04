import React from 'react';
import PropTypes from 'prop-types';
import BaseButtonWrapper from '../base-button-wrapper';
import styles from './primary-action-button.mod.css';

const PrimaryActionButton = props => (
  <BaseButtonWrapper>
    <span className={styles.button}>{props.children}</span>
  </BaseButtonWrapper>
);

PrimaryActionButton.displayName = 'PrimaryActionButton';

PrimaryActionButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrimaryActionButton;
