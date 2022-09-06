import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

const Divider = styled.span`
  width: 1px;
  height: ${designTokens.spacingL};
  background: ${designTokens.colorNeutral};
  margin: 0 ${designTokens.spacingXs};
`;

export default Divider;
