import React from 'react';
import PropTypes from 'prop-types';
import styles from './cell.mod.css';

const Cell = props => <div className={styles.container}>{props.children}</div>;

Cell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Cell;
