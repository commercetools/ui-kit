import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TRichTextEditorBody } from './rich-text-body';

type TRichTextBodyStylesProps = Pick<
  TRichTextEditorBody,
  'hasError' | 'isReadOnly' | 'hasWarning' | 'isDisabled'
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
  if (props.hasError) {
    return css`
      color: ${designTokens.fontColorForInputWhenError};
    `;
  }
  if (props.hasWarning) {
    return css`
      color: ${designTokens.fontColorForInputWhenWarning};
    `;
  }
  if (props.isDisabled || props.isReadOnly) {
    return css`
      color: ${designTokens.fontColorForInputWhenDisabled};
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
  font-family: ${designTokens.fontFamily};
  border-radius: ${designTokens.borderRadiusForInput};
  border-bottom: 0;
  padding: none;
  padding-left: none;
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
    /*
 * Rich text content is rendered as bare semantic HTML elements (see
 * rich-text-utils slate-helpers), so it historically relied on the
 * browser's user-agent stylesheet for typography and default formatting.
 * A host CSS reset (e.g. Nimbus / Chakra "preflight") can normalize or
 * remove those defaults—flattening heading hierarchy, removing list
 * markers and indentation, dropping italic and bold emphasis, clearing
 * underline/strikethrough decorations, normalizing subscript/superscript
 * alignment, removing blockquote indentation and borders, or overriding
 * monospace fonts for preformatted text. Declare these styles explicitly
 * so rich text rendering remains consistent regardless of host styles. 
 * See SUPPORT-41503 / FEC-1126.
  */
    h1 {
      font-size: ${designTokens.fontSize60};
      font-weight: ${designTokens.fontWeight600};
      line-height: ${designTokens.lineHeight60};
    }
    h2 {
      font-size: ${designTokens.fontSize50};
      font-weight: ${designTokens.fontWeight500};
      line-height: ${designTokens.lineHeight50};
    }
    h3 {
      font-size: ${designTokens.fontSize40};
      font-weight: ${designTokens.fontWeight500};
      line-height: ${designTokens.lineHeight30};
    }
    h4,
    h5 {
      font-size: ${designTokens.fontSize30};
      font-weight: ${designTokens.fontWeight500};
      line-height: ${designTokens.lineHeight20};
    }
    h6 {
      font-size: ${designTokens.fontSize20};
      font-weight: ${designTokens.fontWeight500};
      line-height: ${designTokens.lineHeight20};
    }
    strong,
    b {
      font-weight: ${designTokens.fontWeight600};
    }
    u {
      text-decoration: underline;
    }
    s,
    del {
      text-decoration: line-through;
    }
    sub {
      vertical-align: sub;
    }
    sup {
      vertical-align: super;
    }

    blockquote {
      margin: 0;
      padding-left: ${designTokens.spacing20};
      border-left: 2px solid ${designTokens.colorNeutral};
    }
    pre {
      font-family: monospace;
    }
    ul,
    ol {
      margin: ${designTokens.spacing30} 0;
      padding-left: ${designTokens.spacing40};
    }
    ul {
      list-style: disc outside;
    }
    ol {
      list-style: decimal outside;
    }
    li {
      line-height: 22px;
    }
    em,
    i {
      font-style: italic;
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
  padding: ${designTokens.spacing20} 0 0;
  border-radius: ${designTokens.borderRadiusForInput};
  font-family: ${designTokens.fontFamily};
  border-color: ${(props) => getBorderColor(props)};
  overflow-y: scroll;
  ${reset}
  ${getTextColor}
`;

export const Container = styled.div<TRichTextBodyStylesProps>`
  border-radius: ${designTokens.borderRadiusForInput};
  border: 1px solid ${designTokens.borderColorForInput};
  transition: ${designTokens.transitionStandard};
  padding: ${designTokens.spacing20} ${designTokens.spacing30};
  background-color: ${(props) => getContainerBackgroundColor(props)};
  ${(props) => getInputBoxShadow(props)}
  border-color: ${(props) => getBorderColor(props)};
  pointer-events: ${(props) =>
    props.isDisabled || props.isReadOnly ? 'none' : 'inherit'};
  position: relative;

  &:hover {
    ${(props) =>
      getBorderColor(props, designTokens.borderColorForInputWhenHovered)};
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
