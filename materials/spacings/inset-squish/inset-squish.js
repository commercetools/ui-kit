import React from 'react';
import PropTypes from 'prop-types';
import styles from './inset-squish.mod.css';

const InsetSquish = ({ children, scale }) => (
  <div className={styles[scale]}>{children}</div>
);
InsetSquish.displayName = 'InsetSquish';
InsetSquish.propTypes = {
  scale: PropTypes.oneOf(['s', 'm', 'l']),
  children: PropTypes.node,
};

InsetSquish.defaultProps = {
  scale: 'm',
};

export default InsetSquish;
