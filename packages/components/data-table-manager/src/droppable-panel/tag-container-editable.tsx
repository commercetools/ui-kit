import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

const TagContainerEditable = styled.div`
  background-color: ${designTokens.backgroundColorForInput};
  border: 1px solid ${designTokens.borderColorForTableManagerDroppableList};
  border-radius: ${designTokens.borderRadiusForTableManagerDroppableList};
  padding: ${designTokens.spacing30};
  height: ${designTokens.constraint7};
  overflow: auto;
`;

export default TagContainerEditable;
