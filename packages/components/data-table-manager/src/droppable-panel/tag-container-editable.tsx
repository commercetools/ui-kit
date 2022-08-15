import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';

const TagContainerEditable = styled.div`
  background-color: ${customProperties.backgroundColorForInput};
  border: ${customProperties.borderRadius1} solid
    ${customProperties.colorNeutral60};
  border-radius: ${customProperties.borderRadius6};
  padding: ${customProperties.spacingS};
  height: ${customProperties.constraint7};
  overflow: auto;
`;

export default TagContainerEditable;
