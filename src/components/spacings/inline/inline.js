import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import vars from '../../../../materials/custom-properties';

const getMargin = scale => {
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
      return vars['--spacing-4'];
  }
};

const getAlignItems = alignItems => {
  switch (alignItems) {
    case 'center':
      return 'center';

    case 'flexStart':
      return 'flex-start';

    case 'flexEnd':
      return 'flex-end';

    case 'baseline':
      return 'baseline';
    case 'stretch':
      return 'stretch';
    default:
      return '';
  }
};

const Inline = props => (
  <div
    css={css`
      display: flex;
      align-items: ${getAlignItems(props.alignItems)};
      > * + * {
        margin: 0 0 0 ${getMargin(props.scale)};
      }
    `}
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
