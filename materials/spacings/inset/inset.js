import React from 'react';
import PropTypes from 'prop-types';
import styles from './inset.mod.css';

const Inset = ({ children, scale }) => (
  <div className={styles[scale]}>{children}</div>
);
Inset.displayName = 'Inset';
Inset.propTypes = {
  scale: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  children: PropTypes.node,
};

Inset.defaultProps = {
  scale: 'm',
};

export default Inset;
