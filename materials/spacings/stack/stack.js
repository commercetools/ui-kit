import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { filterDataAttributes } from '@commercetools-local/utils/dataset';
import styles from './stack.mod.css';

const Stack = props => (
  <div
    className={classnames(styles[props.scale], styles[props.alignItems])}
    {...filterDataAttributes(props)}
  >
    {props.children}
  </div>
);

Stack.displayName = 'Stack';
Stack.propTypes = {
  scale: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  children: PropTypes.node,
  alignItems: PropTypes.oneOf(['stretch', 'flexStart', 'flexEnd', 'center']),
};

Stack.defaultProps = {
  scale: 's',
  alignItems: 'stretch',
};

export default Stack;
