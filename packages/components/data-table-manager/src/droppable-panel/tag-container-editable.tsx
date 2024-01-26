import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

const TagContainerEditable = styled.div`
  background-color: ${designTokens.colorSurface};
  border: 1px solid ${designTokens.colorNeutral};
  border-radius: ${designTokens.borderRadius4};
  padding: ${designTokens.spacing30};
  height: ${designTokens.constraint7};
  overflow: auto;
`;

export default TagContainerEditable;
