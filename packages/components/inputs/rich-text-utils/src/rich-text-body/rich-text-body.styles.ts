import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TRichTextEditorBody } from './rich-text-body';

type TRichTextBodyStylesProps = Pick<
  TRichTextEditorBody,
  'hasError' | 'isReadOnly' | 'hasWarning' | 'isDisabled' | 'isNewTheme'
>;

const getBorderColor = (
  props: TRichTextBodyStylesProps,
  defaultBorderColor: string = designTokens.borderColorForInput
) => {
  if (props.isDisabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.borderColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return designTokens.borderColorForInputWhenReadonly;
  }
  return defaultBorderColor;
};

const getInputBoxShadow = (
  props: TRichTextBodyStylesProps,
  defaultBoxShadow: string = designTokens.shadowForInput
) => {
  if (props.hasError) {
    return css`
      box-shadow: ${designTokens.shadowForInputWhenError};
    `;
  }
  if (props.hasWarning) {
    return css`
      box-shadow: ${designTokens.shadowForInputWhenWarning};
    `;
  }
  return css`
    box-shadow: ${defaultBoxShadow};
  `;
};

const getTextColor = (props: TRichTextBodyStylesProps) => {
  if (props.hasError && props.isNewTheme) {
    return css`
      color: ${designTokens.fontColorForInputWhenError};
    `;
  }
  if (props.hasWarning && props.isNewTheme) {
    return css`
      color: ${designTokens.fontColorForInputWhenWarning};
    `;
  }
  return css`
    color: ${designTokens.fontColorForInput};
  `;
};

const getContainerBackgroundColor = (props: TRichTextBodyStylesProps) => {
  if (props.isDisabled) {
    return designTokens.backgroundColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.backgroundColorForInputWhenReadonly;
  }
  return designTokens.backgroundColorForInput;
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
  padding: ${designTokens.spacing10} calc(${designTokens.spacing20} - 1px);
  padding-left: calc(${designTokens.spacing10} - 1px);
  align-items: flex-start;
  align-content: stretch;

  position: relative;

  &::after {
    position: absolute;
    content: '';
    width: calc(100% - ${designTokens.spacing20});
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
  padding: ${designTokens.spacing20} ${designTokens.spacing30} 0
    ${designTokens.spacing30};
  border-radius: ${designTokens.borderRadiusForInput};
  font-family: ${designTokens.fontFamilyDefault};
  border-color: ${(props) => getBorderColor(props)};
  overflow-y: scroll;
  ${reset}
  ${getTextColor}
`;

export const Container = styled.div<TRichTextBodyStylesProps>`
  border-radius: ${designTokens.borderRadiusForInput};
  border: 1px solid ${designTokens.borderColorForInput};
  transition: ${designTokens.transitionStandard};
  padding: ${designTokens.paddingForRichTextInput};
  background-color: ${(props) => getContainerBackgroundColor(props)};
  ${(props) => getInputBoxShadow(props)}
  border-color: ${(props) => getBorderColor(props)};
  pointer-events: ${(props) =>
    props.isDisabled || props.isReadOnly ? 'none' : 'inherit'};
  position: relative;

  &:hover {
    ${(props) =>
      getBorderColor(props, designTokens.borderColorForInputWhenHovered)}
    background-color: ${designTokens.backgroundColorForInputWhenHovered};
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
    box-shadow: ${designTokens.shadowForInputWhenFocused};
    ${Toolbar} {
      border-color: ${designTokens.borderColorForInputWhenFocused};
    }

    ${EditorContainer} {
      border-color: ${designTokens.borderColorForInputWhenFocused};
    }
  }
`;
