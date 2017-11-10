import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './stack.mod.css';

const Stack = ({ children, scale, alignItems }) => (
  <div className={classnames(styles[scale], styles[alignItems])}>
    {children}
  </div>
);
Stack.displayName = 'Stack';
Stack.propTypes = {
  scale: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  children: PropTypes.node.isRequired,
  alignItems: PropTypes.oneOf(['stretch', 'flexStart', 'flexEnd', 'center']),
};

Stack.defaultProps = {
  scale: 's',
  alignItems: 'stretch',
};

export default Stack;
