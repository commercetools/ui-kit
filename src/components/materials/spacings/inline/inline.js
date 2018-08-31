import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import filterDataAttributes from '../../../../utils/filter-data-attributes';
import styles from './inline.mod.css';

const Inline = props => (
  <div
    className={classnames(styles[props.scale], styles[props.alignItems])}
    {...filterDataAttributes(props)}
  >
    {props.children}
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
  children: PropTypes.node,
};

Inline.defaultProps = {
  scale: 's',
  alignItems: 'flexStart',
};

export default Inline;
