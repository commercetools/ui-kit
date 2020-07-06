import styled from '@emotion/styled';

const DragginSmall = styled.small`
  &:hover {
    cursor: grab;
  }
`;

const DraggingContainer = styled.div`
  ${DragginSmall};
`;

export default DraggingContainer;
