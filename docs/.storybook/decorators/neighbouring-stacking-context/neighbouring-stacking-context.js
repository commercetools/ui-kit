import Card from '@commercetools-uikit/card';
import styled from '@emotion/styled';

const StackingContext = styled.div`
  width: 300px;
  height: 50px;
  position: relative;
  z-index: 2;
`;

const NeighbouringStackingContext = () => (
  <StackingContext>
    <Card theme="dark">
      Stacking context with <code>z-index: 2</code>
    </Card>
  </StackingContext>
);

export default NeighbouringStackingContext;
