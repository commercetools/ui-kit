import React from 'react';
import { css } from '@emotion/react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { getMaxPropTokenValue } from '../helpers';

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

type TProps = {
  /**
   * Determines scale of the constraint.
   */
  max?: TMaxProp;
  children: React.ReactNode;
};

function getConstraintStyles(maxProp?: TMaxProp) {
  const constraintToken = maxProp ? getMaxPropTokenValue(maxProp) : null;
  return css`
    ${constraintToken ? `max-width: ${constraintToken};` : ''}
    ${maxProp === 'auto' ? 'width: auto;' : ''}
  `;
}

const Horizontal = (props: TProps) => (
  <div
    css={[
      css`
        width: 100%;
        position: relative;
      `,
      getConstraintStyles(props.max),
    ]}
    {...filterDataAttributes(props)}
  >
    {props.children}
  </div>
);

export default Horizontal;
