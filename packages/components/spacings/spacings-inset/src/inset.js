import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

const getPadding = (scale) => {
  switch (scale) {
    case 'xs':
      return vars.spacingXs;
    case 's':
      return vars.spacingS;
    case 'm':
      return vars.spacingM;
    case 'l':
      return vars.spacingL;
    case 'xl':
      return vars.spacingXl;
    default:
      return 0;
  }
};

const Inset = (props) => (
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
