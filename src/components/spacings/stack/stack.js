import React from 'react';
import PropTypes from 'prop-types';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import { getStackStyles } from './stack.styles';

const Stack = props => (
  <div css={getStackStyles(props)} {...filterDataAttributes(props)}>
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
