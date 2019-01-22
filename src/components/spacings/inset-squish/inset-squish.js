import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as vars from '../../../../materials/custom-properties';
import filterDataAttributes from '../../../utils/filter-data-attributes';

const getPadding = scale => {
  switch (scale) {
    case 's':
      return `${vars.spacing4} ${vars.spacing8}`;
    case 'm':
      return `${vars.spacing8} ${vars.spacing16}`;
    case 'l':
      return `${vars.spacing16} ${vars.spacing32}`;
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
