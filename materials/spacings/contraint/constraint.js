import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './constraint.mod.css';

const getConstraintSyle = horizontalConstraint => {
  switch (horizontalConstraint) {
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

const Constraint = ({ children, horizontalConstraint }) => (
  <div
    className={classnames(
      styles.container,
      getConstraintSyle(horizontalConstraint)
    )}
  >
    {children}
  </div>
);
Constraint.displayName = 'Constraint';
Constraint.propTypes = {
  horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  children: PropTypes.node.isRequired,
};

Constraint.defaultProps = {
  horizontalConstraint: 'scale',
};

export default Constraint;
