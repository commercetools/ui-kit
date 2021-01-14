import React from 'react';
import { css } from '@emotion/react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import invariant from 'tiny-invariant';
import { getMaxPropTokenValue, getMaxPropEquivalent } from '../helpers';

type TMaxProp =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 'scale'
  | 'auto';

type TConstraintProp = 'xs' | 's' | 'm' | 'l' | 'xl' | 'scale';
type TProps = {
  /**
   * Determines scale of the constraint.
   */
  max: TMaxProp;
  /**
   * @deprecated: Please use the `max` prop instead. Determines scale of the constraint.
   */
  constraint: TConstraintProp;
  children: React.ReactNode;
};

function getConstraintStyles(
  maxProp: TMaxProp,
  constraintProp: TConstraintProp
) {
  const constraintToken = maxProp
    ? getMaxPropTokenValue(maxProp)
    : getMaxPropTokenValue(getMaxPropEquivalent(constraintProp));

  return css`
    ${constraintToken ? `max-width: ${constraintToken};` : ''}
    ${maxProp === 'auto' ? 'width: auto;' : ''}
  `;
}

const Horizontal = (props: TProps): JSX.Element => {
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
        getConstraintStyles(props.max, props.constraint),
      ]}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </div>
  );
};

export default Horizontal;
