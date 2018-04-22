import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './horizontal.mod.css';

const getConstraintSyle = constraint => {
  switch (constraint) {
    case 'xs':
      return styles.constraintXs;
    case 's':
      return styles.constraintS;
    case 'm':
      return styles.constraintM;
    case 'l':
      return styles.constraintL;
    case 'xl':
      return styles.constraintXl;
    case 'scale':
      return styles.constraintScale;
    default:
      return undefined;
  }
};

const Horizontal = ({ children, constraint }) => (
  <div className={classnames(styles.container, getConstraintSyle(constraint))}>
    {children}
  </div>
);
Horizontal.displayName = 'Horizontal';
Horizontal.propTypes = {
  constraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  children: PropTypes.node.isRequired,
};

Horizontal.defaultProps = {
  constraint: 'scale',
};

export default Horizontal;
