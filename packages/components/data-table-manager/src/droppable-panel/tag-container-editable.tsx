import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

const TagContainerEditable = styled.div`
  background-color: ${designTokens.backgroundColorForInput};
  border: ${designTokens.borderRadius1} solid ${designTokens.colorNeutral60};
  border-radius: ${designTokens.borderRadius6};
  padding: ${designTokens.spacingS};
  height: ${designTokens.constraint7};
  overflow: auto;
`;

export default TagContainerEditable;
