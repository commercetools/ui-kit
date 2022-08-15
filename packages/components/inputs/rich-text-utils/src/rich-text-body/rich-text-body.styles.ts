import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import type { TRichTextEditorBody } from './rich-text-body';

type TRichTextBodyStylesProps = Pick<
  TRichTextEditorBody,
  'hasError' | 'isReadOnly' | 'hasWarning' | 'isDisabled'
>;

const getBorderColor = (props: TRichTextBodyStylesProps) => {
  if (props.isDisabled) {
    return css`
      border-color: ${customProperties.borderColorForInputWhenDisabled};
    `;
  }
  if (props.hasError) {
    return css`
      border-color: ${customProperties.borderColorForInputWhenError};
    `;
  }
  if (props.hasWarning) {
    return css`
      border-color: ${customProperties.borderColorForInputWhenWarning};
    `;
  }
  if (props.isReadOnly) {
    return css`
      border-color: ${customProperties.borderColorForInputWhenReadonly};
    `;
  }
  return css`
    border-color: ${customProperties.borderColorForInput};
  `;
};

const getBackgroundColor = (props: TRichTextBodyStylesProps) => {
  if (props.isDisabled) {
    return css`
      background-color: ${customProperties.backgroundColorForInputWhenDisabled};
    `;
  }
  return css`
    background-color: ${customProperties.backgroundColorForInput};
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
  font-family: ${customProperties.fontFamilyDefault};
  border-radius: ${customProperties.borderRadiusForInput};
  border-bottom: 0;
  padding: ${customProperties.spacingXs}
    calc(${customProperties.spacingS} - 1px);
  padding-left: calc(${customProperties.spacingXs} - 1px);
  align-items: flex-start;
  align-content: stretch;

  position: relative;

  &::after {
    position: absolute;
    content: '';
    width: calc(100% - ${customProperties.spacingS});
    height: 1px;
    background: ${customProperties.colorNeutral};
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
      color: ${customProperties.fontColorForInputWhenReadonly};
    `,

  props.isDisabled &&
    css`
      color: ${customProperties.fontColorForInputWhenDisabled};
    `,
];

export const EditorContainer = styled.div<TRichTextBodyStylesProps>`
  padding: 4px ${customProperties.spacingS};
  padding-top: 6px;
  border-radius: ${customProperties.borderRadiusForInput};
  font-family: ${customProperties.fontFamilyDefault};
  ${getBorderColor}
  overflow-y: scroll;
  ${reset}
`;

export const Container = styled.div<TRichTextBodyStylesProps>`
  border-radius: ${customProperties.borderRadiusForInput};
  border: 1px solid ${customProperties.borderColorForInput};
  transition: ${customProperties.transitionStandard};
  ${getBorderColor}
  ${getBackgroundColor}
  pointer-events: ${(props) =>
    props.isDisabled || props.isReadOnly ? 'none' : 'inherit'};
  position: relative;

  &:hover {
    border-color: ${customProperties.borderColorForInputWhenFocused};
  }
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px
      ${customProperties.borderColorForInputWhenFocused};
  }

  ${Toolbar} {
    border-radius: ${customProperties.borderRadiusForInput};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-color: ${customProperties.borderColorForInput};
  }

  &:focus-within {
    border-color: ${customProperties.borderColorForInputWhenFocused};
    box-shadow: inset 0 0 0 2px
      ${customProperties.borderColorForInputWhenFocused};
    ${Toolbar} {
      border-color: ${customProperties.borderColorForInputWhenFocused};
    }

    ${EditorContainer} {
      border-color: ${customProperties.borderColorForInputWhenFocused};
    }
  }
`;
