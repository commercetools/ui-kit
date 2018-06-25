import React from 'react';
import PropTypes from 'prop-types';
import AccessibleButton from '../../buttons/accessible-button';
import styles from './money-input.mod.css';

const Option = props => (
  <AccessibleButton
    label={props.children}
    onClick={props.onClick}
    className={styles['option-wrapper']}
  >
    {props.children}
  </AccessibleButton>
);
Option.displayName = 'Option';
Option.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Option;
