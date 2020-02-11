import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getConstraintSyles = constraint => {
  switch (constraint) {
    case 'xs':
      return css`
        max-width: ${vars.constraintXs};
      `;
    case 's':
      return css`
        max-width: ${vars.constraintS};
      `;
    case 'm':
      return css`
        max-width: ${vars.constraintM};
      `;
    case 'l':
      return css`
        max-width: ${vars.constraintL};
      `;
    case 'xl':
      return css`
        max-width: ${vars.constraintXl};
      `;
    case 'scale':
      return css`
        width: ${vars.constraintScale};
      `;
    default:
      return css``;
  }
};

const Horizontal = props => (
  <div
    css={[
      css`
        width: 100%;
        position: relative;
      `,
      getConstraintSyles(props.constraint),
    ]}
    {...filterDataAttributes(props)}
  >
    {props.children}
  </div>
);

Horizontal.displayName = 'Horizontal';
Horizontal.propTypes = {
  constraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  children: PropTypes.node.isRequired,
};

Horizontal.defaultProps = {
  constraint: 'scale',
};

export default Horizontal;
