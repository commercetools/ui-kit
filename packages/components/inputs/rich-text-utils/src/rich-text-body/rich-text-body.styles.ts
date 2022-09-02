import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TRichTextEditorBody } from './rich-text-body';

type TRichTextBodyStylesProps = Pick<
  TRichTextEditorBody,
  'hasError' | 'isReadOnly' | 'hasWarning' | 'isDisabled'
>;

const getBorderColor = (props: TRichTextBodyStylesProps) => {
  if (props.isDisabled) {
    return css`
      border-color: ${designTokens.borderColorForInputWhenDisabled};
    `;
  }
  if (props.hasError) {
    return css`
      border-color: ${designTokens.borderColorForInputWhenError};
    `;
  }
  if (props.hasWarning) {
    return css`
      border-color: ${designTokens.borderColorForInputWhenWarning};
    `;
  }
  if (props.isReadOnly) {
    return css`
      border-color: ${designTokens.borderColorForInputWhenReadonly};
    `;
  }
  return css`
    border-color: ${designTokens.borderColorForInput};
  `;
};

const getBackgroundColor = (props: TRichTextBodyStylesProps) => {
  if (props.isDisabled) {
    return css`
      background-color: ${designTokens.backgroundColorForInputWhenDisabled};
    `;
  }
  return css`
    background-color: ${designTokens.backgroundColorForInput};
  `;
};

export const ToolbarMainControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: flex-start;

  > * {
    margin-left: 1px;
  }
`;

export const ToolbarRightControls = styled.div``;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: ${designTokens.fontFamilyDefault};
  border-radius: ${designTokens.borderRadiusForInput};
  border-bottom: 0;
  padding: ${designTokens.spacingXs} calc(${designTokens.spacingS} - 1px);
  padding-left: calc(${designTokens.spacingXs} - 1px);
  align-items: flex-start;
  align-content: stretch;

  position: relative;

  &::after {
    position: absolute;
    content: '';
    width: calc(100% - ${designTokens.spacingS});
    height: 1px;
    background: ${designTokens.colorNeutral};
    left: 50%;
    transform: translateX(-50%);
    bottom: -1px;
  }

  &:focus {
    outline: none;
  }
`;

const reset = (props: TRichTextBodyStylesProps) => [
  css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
    }
    p {
      margin: 0;
      line-height: 22px;
    }
  `,
  props.isReadOnly &&
    css`
      color: ${designTokens.fontColorForInputWhenReadonly};
    `,

  props.isDisabled &&
    css`
      color: ${designTokens.fontColorForInputWhenDisabled};
    `,
];

export const EditorContainer = styled.div<TRichTextBodyStylesProps>`
  padding: 4px ${designTokens.spacingS};
  padding-top: 6px;
  border-radius: ${designTokens.borderRadiusForInput};
  font-family: ${designTokens.fontFamilyDefault};
  ${getBorderColor}
  overflow-y: scroll;
  ${reset}
`;

export const Container = styled.div<TRichTextBodyStylesProps>`
  border-radius: ${designTokens.borderRadiusForInput};
  border: 1px solid ${designTokens.borderColorForInput};
  transition: ${designTokens.transitionStandard};
  ${getBorderColor}
  ${getBackgroundColor}
  pointer-events: ${(props) =>
    props.isDisabled || props.isReadOnly ? 'none' : 'inherit'};
  position: relative;

  &:hover {
    border-color: ${designTokens.borderColorForInputWhenFocused};
  }
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${designTokens.borderColorForInputWhenFocused};
  }

  ${Toolbar} {
    border-radius: ${designTokens.borderRadiusForInput};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-color: ${designTokens.borderColorForInput};
  }

  &:focus-within {
    border-color: ${designTokens.borderColorForInputWhenFocused};
    box-shadow: inset 0 0 0 2px ${designTokens.borderColorForInputWhenFocused};
    ${Toolbar} {
      border-color: ${designTokens.borderColorForInputWhenFocused};
    }

    ${EditorContainer} {
      border-color: ${designTokens.borderColorForInputWhenFocused};
    }
  }
`;
