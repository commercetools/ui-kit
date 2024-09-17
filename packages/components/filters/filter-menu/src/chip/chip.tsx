import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

const Chip = styled.span({
  fontSize: designTokens.fontSize20,
  backgroundColor: designTokens.colorPrimary95,
  height: '1.5rem',
  lineHeight: '1.5rem',
  borderRadius: '1rem',
  paddingLeft: '.5rem',
  paddingRight: '.5rem',
  userSelect: 'none',
});

export default Chip;
