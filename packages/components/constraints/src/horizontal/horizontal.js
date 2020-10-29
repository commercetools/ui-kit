import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import invariant from 'tiny-invariant';
import { getMaxPropTokenValue, getMaxPropEquivalent } from '../helpers';

function getConstraintSyles({ maxProp, constraintProp }) {
  const constraintToken = maxProp
    ? getMaxPropTokenValue(maxProp)
    : getMaxPropTokenValue(getMaxPropEquivalent(constraintProp));

  return css`
    ${constraintToken ? `max-width: ${constraintToken};` : ''}
    ${maxProp === 'auto' ? 'width: auto;' : ''}
  `;
}

const Horizontal = (props) => {
  invariant(
    !(props.constraint && props.max),
    '`ui-kit/constraints/horizontal: props `constraint` and `max` should not be used in conjunction. Please prefer `max` prop.'
  );

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

export default Horizontal;
