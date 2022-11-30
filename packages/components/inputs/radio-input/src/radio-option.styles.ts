import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { TOptionProps } from './radio-option';

type TStylesProps = Pick<
  TOptionProps,
  'isDisabled' | 'hasError' | 'hasWarning' | 'isHovered' | 'isReadOnly'
>;

const LabelTextWrapper = styled.div<TStylesProps>`
  grid-area: label;
  margin-left: ${designTokens.spacing20};
  font-size: 1rem;
  font-family: inherit;
  color: ${(props) =>
    props.isDisabled
      ? designTokens.fontColorForInputWhenDisabled
      : designTokens.fontColorForInput};
`;

const AdditionalTextWrapper = styled.div<TStylesProps>`
  grid-area: content;
  margin-left: ${designTokens.spacing10};
  font-size: 1rem;
  font-family: inherit;
  color: ${(props) =>
    props.isDisabled
      ? designTokens.fontColorForInputWhenDisabled
      : designTokens.fontColorForInput};
`;

const RadioOptionsWrapper = styled.div<TStylesProps>`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
    'radio label'
    '. content';
`;

const getSvgContainerBorderStroke = (props: TStylesProps) => {
  if (props.isDisabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.borderColorForInputWhenWarning;
  }
  if (props.isHovered && !props.isDisabled) {
    return designTokens.borderColorForInputWhenFocused;
  }
  if (props.isReadOnly) {
    return designTokens.borderColorForInputWhenReadonly;
  }
  return designTokens.borderColorForInput;
};

const getSvgContainerContentFill = (props: TStylesProps) => {
  if (props.isDisabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return designTokens.fontColorForInputWhenReadonly;
  }
  return designTokens.borderColorForInputWhenFocused;
};

const getContainerStyles = (props: TOptionProps) => css`
  display: flex;
  align-items: center;
  grid-area: radio;
  svg {
    fill: ${props.isDisabled
      ? designTokens.backgroundColorForInputWhenDisabled
      : designTokens.backgroundColorForInput};
  }

  svg *[data-style='radio-option__border'] {
    stroke: ${getSvgContainerBorderStroke(props)};
  }
  svg *[data-style='radio-option__content'] {
    fill: ${getSvgContainerContentFill(props)};
  }
`;

const getSvgLabelBorderStroke = (props: TStylesProps) => {
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
  return designTokens.borderColorForInputWhenFocused;
};

const getLabelColor = (props: TStylesProps) => {
  if (props.isDisabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return designTokens.fontColorForInputWhenReadonly;
  }
  return designTokens.fontColorForInput;
};
const getLabelCursor = (props: TStylesProps) => {
  if (props.isDisabled) {
    return 'not-allowed';
  }
  if (props.isReadOnly) {
    return 'default';
  }
  return 'pointer';
};

const getLabelStyles = (props: TStylesProps) => css`
  align-items: center;
  color: ${getLabelColor(props)};
  cursor: ${getLabelCursor(props)};
  display: flex;
  position: relative;
  &:hover svg *[data-style='radio-option__border'] {
    stroke: ${getSvgLabelBorderStroke(props)};
  }
  :focus-within ${LabelTextWrapper} {
    outline: auto 2px ${designTokens.borderColorForInputWhenFocused};
    outline-offset: 3px;
  }
`;

export {
  getContainerStyles,
  getLabelStyles,
  LabelTextWrapper,
  RadioOptionsWrapper,
  AdditionalTextWrapper,
};
