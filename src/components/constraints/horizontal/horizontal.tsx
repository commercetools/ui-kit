import React from 'react';
import classnames from 'classnames';
import styles from './horizontal.mod.css';

type HorizontalConstraint = 'xs' | 's' | 'm' | 'l' | 'xl' | 'scale';
interface HorizontalProps {
  constraint: HorizontalConstraint;
}

const getConstraintSyle = (constraint: HorizontalConstraint): string => {
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
      throw new Error(`Unsupported constraint ${constraint}`);
  }
};

const Horizontal: React.FC<HorizontalProps> = props => (
  <div
    className={classnames(
      styles.container,
      getConstraintSyle(props.constraint)
    )}
  >
    {props.children}
  </div>
);
Horizontal.displayName = 'Horizontal';
Horizontal.defaultProps = {
  constraint: 'scale',
};

export default Horizontal;
