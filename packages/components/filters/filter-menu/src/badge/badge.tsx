import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

const { fontSize12, colorInfo } = designTokens;

const Badge = styled.span({
  fontSize: fontSize12,
  backgroundColor: colorInfo,
  color: 'white',
  height: '1.375rem',
  lineHeight: '1.375rem',
  borderRadius: '1.25rem',
  paddingLeft: '.375rem',
  paddingRight: '.375rem',
  userSelect: 'none',
});

export default Badge;
