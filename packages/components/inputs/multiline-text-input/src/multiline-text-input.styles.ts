import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { type TMultilineTextInputProps } from './multiline-text-input';

const getMultilineTextInputActionIconStyles = (
  props: TMultilineTextInputProps
) => css`
  position: absolute;
  right: ${designTokens.spacing30};
  top: 0;
  height: ${props.isCondensed
    ? `${designTokens.heightForInputAsSmall}`
    : `${designTokens.heightForInput}`};
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MultilineInputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export { getMultilineTextInputActionIconStyles, MultilineInputWrapper };
