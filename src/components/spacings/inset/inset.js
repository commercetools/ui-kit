import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import vars from '../../../../materials/custom-properties';

const getPadding = scale => {
  switch (scale) {
    case 'xs':
      return vars['--spacing-4'];
    case 's':
      return vars['--spacing-8'];
    case 'm':
      return vars['--spacing-16'];
    case 'l':
      return vars['--spacing-24'];
    case 'xl':
      return vars['--spacing-32'];

    default:
      return 0;
  }
};

const Inset = props => (
  <div
    css={css`
      padding: ${getPadding(props.scale)};
    `}
    {...filterDataAttributes(props)}
  >
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
