import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

const getPadding = (scale) => {
  switch (scale) {
    case 's':
      return `${vars.spacingXs} ${vars.spacingS}`;
    case 'm':
      return `${vars.spacingS} ${vars.spacingM}`;
    case 'l':
      return `${vars.spacingM} ${vars.spacingXl}`;
    default:
      return 0;
  }
};

const InsetSquish = (props) => (
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

export { InsetSquish };
