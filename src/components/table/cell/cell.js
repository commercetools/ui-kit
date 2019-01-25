import styled from '@emotion/styled';
import vars from '../../../../materials/custom-properties';

const Cell = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  white-space: pre;
  border-bottom: 1px solid ${vars.colorGray90};
  border-right: 1px solid ${vars.colorGray90};

  & > * {
    flex: 1 0 100%;
    min-width: 0;
  }
`;

export default Cell;
