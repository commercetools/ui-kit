import React from 'react';
import PropTypes from 'prop-types';
import filterDataAttributes from '../../../../utils/filter-data-attributes';
import styles from './inset.mod.css';

const Inset = props => (
  <div className={styles[props.scale]} {...filterDataAttributes(props)}>
    {props.children}
  </div>
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
