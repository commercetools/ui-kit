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
