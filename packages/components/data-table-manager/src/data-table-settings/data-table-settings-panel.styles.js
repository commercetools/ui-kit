import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const Container = styled.div`
  background-color: ${vars.colorNeutral95};
  border-radius: ${vars.borderRadius6};
  padding: ${vars.spacingM};
  min-width: ${vars.constraintL};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const DroppableContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: ${vars.constraintL};
  cursor: ${(props) => (props.isDragging ? 'grabbing' : 'auto')};
`;

const SelectContainer = styled.div`
  width: 200px;
`;

export { Container, HeaderContainer, DroppableContainer, SelectContainer };
