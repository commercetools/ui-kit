import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const TagContainerEditable = styled.div`
  background-color: ${vars.backgroundColorForInput};
  border: ${vars.borderRadius1} solid #999;
  border-radius: ${vars.borderRadius6};
  padding: ${vars.spacingS};
  height: 360px;
  overflow: auto;
`;

export default TagContainerEditable;
