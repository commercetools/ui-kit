import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { customProperties as vars } from '@commercetools-uikit/design-system';

function getConstraintSyles({ max, constraint }) {
  let constraintToken;

  if (max === 1 || constraint === 'xs') constraintToken = vars.constraint1;
  if (max === 2) constraintToken = vars.constraint2;
  if (max === 3 || constraint === 's') constraintToken = vars.constraint3;
  if (max === 4) constraintToken = vars.constraint4;
  if (max === 5) constraintToken = vars.constraint5;
  if (max === 6) constraintToken = vars.constraint6;
  if (max === 7 || constraint === 'm') constraintToken = vars.constraint7;
  if (max === 8) constraintToken = vars.constraint8;
  if (max === 9) constraintToken = vars.constraint9;
  if (max === 10 || constraint === 'l') constraintToken = vars.constraint10;
  if (max === 12) constraintToken = vars.constraint12;
  if (max === 13) constraintToken = vars.constraint13;
  if (max === 14) constraintToken = vars.constraint14;
  if (max === 15) constraintToken = vars.constraint15;
  if (max === 16 || constraint === 'xl') constraintToken = vars.constraint16;

  return css`
    ${constraintToken ? `max-width: ${constraintToken};` : ''}
    ${max === 'auto' ? 'width: auto;' : ''}
  `;
}

const Horizontal = (props) => {
  // TODO: uncomment this when we effectively deprecate the constraint prop
  // if (props.constraint != null) {
  //   warnDeprecatedProp(
  //     'constraint',
  //     'Constraints.Horizontal',
  //     `\n Please use "max" prop instead.`
  //   );

  return (
    <div
      css={[
        css`
          width: 100%;
          position: relative;
        `,
        getConstraintSyles(props),
      ]}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </div>
  );
};

Horizontal.displayName = 'Horizontal';
Horizontal.propTypes = {
  /**
   * Determines scale of the constraint.
   */
  max: PropTypes.oneOf([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    'scale',
    'auto',
  ]),
  /**
   * DEPRECATING SOON: Please use the `max` prop instead. Determines scale of the constraint.
   */
  constraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  children: PropTypes.node.isRequired,
};

Horizontal.defaultProps = {
  max: 'scale',
};

export default Horizontal;
