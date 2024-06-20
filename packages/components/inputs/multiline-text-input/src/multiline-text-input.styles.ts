import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { type TMultilineTextInputProps } from './multiline-text-input';

const getMultilineTextInputActionIconStyles = (
  props: TMultilineTextInputProps
) => css`
  position: absolute;
  right: ${designTokens.spacing30};
  top: ${props.isCondensed ? '7px' : designTokens.spacing20};
  padding: 0;
`;

const MultilineInputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export { getMultilineTextInputActionIconStyles, MultilineInputWrapper };
