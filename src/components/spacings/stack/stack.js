import React from 'react';
import PropTypes from 'prop-types';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import getStyles from './stack.styles';

const Stack = props => (
  <div css={getStyles(props)} {...filterDataAttributes(props)}>
    {props.children}
  </div>
);

Stack.displayName = 'Stack';
Stack.propTypes = {
  scale: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  children: PropTypes.node,
  alignItems: PropTypes.oneOf([
    'stretch',
    'flex-start',
    'flex-end',
    'center',
    // Deprecated
    'flexStart',
    'flexEnd',
  ]),
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
};

Stack.defaultProps = {
  scale: 's',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
};

export default Stack;
