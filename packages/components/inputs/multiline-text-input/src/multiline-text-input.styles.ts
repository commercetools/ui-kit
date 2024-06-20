import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

const getMultilineTextInputActionIconStyles = () => css`
  position: absolute;
  right: calc(${designTokens.spacing40} + 4px);
  top: ${designTokens.spacing20};
  padding: '0';
`;

const MultilineInputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export { getMultilineTextInputActionIconStyles, MultilineInputWrapper };
