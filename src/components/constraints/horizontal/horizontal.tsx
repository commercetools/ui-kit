import React from 'react';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

type HorizontalConstraint = 'xs' | 's' | 'm' | 'l' | 'xl' | 'scale';
interface HorizontalProps {
  constraint: HorizontalConstraint;
}

const getConstraintStyles = (constraint: HorizontalConstraint) => {
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

const Horizontal: React.FC<HorizontalProps> = props => (
  <div
    css={[
      css`
        width: 100%;
        position: relative;
      `,
      getConstraintStyles(props.constraint),
    ]}
  >
    {props.children}
  </div>
);
Horizontal.displayName = 'Horizontal';
Horizontal.defaultProps = {
  constraint: 'scale',
};

export default Horizontal;
