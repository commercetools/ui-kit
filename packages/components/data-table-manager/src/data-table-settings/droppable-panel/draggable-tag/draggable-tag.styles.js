import styled from '@emotion/styled';

const DraggingSmall = styled.small`
  &:hover {
    cursor: grab;
  }
`;

const DraggingContainer = styled.div`
  ${DraggingSmall};
`;

export default DraggingContainer;
