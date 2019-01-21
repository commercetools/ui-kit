import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import filterDataAttributes from '../../../utils/filter-data-attributes';

const getPadding = props => {
  switch (props.scale) {
    case 's':
      return `${vars['--spacing-4']} ${vars['--spacing-8']}`;
    case 'm':
      return `${vars['--spacing-8']} ${vars['--spacing-16']}`;
    case 'l':
      return `${vars['--spacing-16']} ${vars['--spacing-32']}`;
    default:
      return 0;
  }
};

const InsetSquish = props => (
  <div
    css={css`
      padding: ${getPadding(props.scale)};
    `}
    {...filterDataAttributes(props)}
  >
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
