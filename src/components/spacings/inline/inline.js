import React from 'react';
import PropTypes from 'prop-types';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import getStyles from './inline.styles';

const Inline = props => (
  <div css={getStyles(props)} {...filterDataAttributes(props)}>
    {props.children}
  </div>
);

Inline.displayName = 'Inline';
Inline.propTypes = {
  scale: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  alignItems: PropTypes.oneOf([
    'stretch',
    'flex-start',
    'flex-end',
    'center',
    'baseline',
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
  children: PropTypes.node,
};

Inline.defaultProps = {
  scale: 's',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

export default Inline;
