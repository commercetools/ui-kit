import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

const Divider = styled.span`
  width: 1px;
  height: ${designTokens.spacing40};
  background: ${designTokens.colorNeutral};
  margin: 0 ${designTokens.spacing10};
`;

export default Divider;
