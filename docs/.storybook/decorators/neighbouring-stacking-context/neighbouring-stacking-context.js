import Card from '@commercetools-uikit/card';
import styled from '@emotion/styled';
import { boolean } from '@storybook/addon-knobs/react';

const StackingContext = styled.div`
  width: 300px;
  height: 50px;
  position: relative;
  z-index: 2;
`;

const NeighbouringStackingContext = () => {
  const isActive = boolean(
    'menuPortalZIndex-show-neighbouring-stacking-context',
    false
  );
  return (
    isActive && (
      <StackingContext>
        <Card theme="dark">
          Stacking context with <code>z-index: 2</code>
        </Card>
      </StackingContext>
    )
  );
};

export default NeighbouringStackingContext;
