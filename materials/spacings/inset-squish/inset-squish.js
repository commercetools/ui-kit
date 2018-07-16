import React from 'react';
import PropTypes from 'prop-types';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import styles from './inset-squish.mod.css';

const InsetSquish = props => (
  <div className={styles[props.scale]} {...filterDataAttributes(props)}>
    {props.children}
  </div>
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
