import { ReactNode } from 'react';
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

export type THorizontalProps = {
  /**
   * The value of the constraint. See equivalent pixel values [here](https://uikit.commercetools.com/?path=/story/basics-tokens--all-tokens).
   */
  max?: TMaxProp;
  children: ReactNode;
};

function getConstraintStyles(maxProp?: TMaxProp) {
  const constraintToken = maxProp ? getMaxPropTokenValue(maxProp) : null;
  return css`
    ${constraintToken ? `max-width: ${constraintToken};` : ''}
    ${maxProp === 'auto' ? 'width: auto;' : ''}
  `;
}

const Horizontal = (props: THorizontalProps) => (
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
