import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './inline.mod.css';

const Inline = ({ children, scale, alignItems }) => (
  <div className={classnames(styles[scale], styles[alignItems])}>
    {children}
  </div>
);
Inline.displayName = 'Inline';
Inline.propTypes = {
  scale: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  alignItems: PropTypes.oneOf([
    'stretch',
    'flexStart',
    'flexEnd',
    'center',
    'baseline',
  ]),
  children: PropTypes.node.isRequired,
};

Inline.defaultProps = {
  scale: 's',
  alignItems: 'flexStart',
};

export default Inline;
