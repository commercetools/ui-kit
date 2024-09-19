import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

import { keyframes } from '@emotion/react';
const bounce = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

const Chip = styled.span({
  fontSize: designTokens.fontSize20,
  backgroundColor: designTokens.colorPrimary95,
  height: '1.5rem',
  lineHeight: '1.5rem',
  borderRadius: '1rem',
  paddingLeft: '.5rem',
  paddingRight: '.5rem',
  userSelect: 'none',
  animation: `${bounce} .25s ease forwards`,
});

export default Chip;
