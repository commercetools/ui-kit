import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TStylesProps } from './radio-option';

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

const RadioOptionWrapper = styled.div<TStylesProps>`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
    'radio label'
    '. content';
`;

const getBorderColor = (props: TStylesProps) => {
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

const getKnobColor = (props: TStylesProps) => {
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

const getContainerStyles = (props: TStylesProps) => css`
  display: flex;
  align-items: center;
  grid-area: radio;
  [class*='RadioOptionBorder'] {
    background-color: ${props.isDisabled
      ? designTokens.backgroundColorForInputWhenDisabled
      : designTokens.backgroundColorForInput};
  }
`;

const getLabelBorderColor = (props: TStylesProps) => {
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
  &:hover [class*='RadioOptionBorder'] {
    border-color: ${getLabelBorderColor(props)};
  }
  :focus-within ${LabelTextWrapper} {
    outline: auto 2px ${designTokens.borderColorForInputWhenFocused};
    outline-offset: 3px;
  }
`;

const RadioOptionKnob = styled.div<TStylesProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => getKnobColor(props)};
`;

const RadioOptionBorder = styled.div<TStylesProps>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${designTokens.backgroundColorForInput};
  border: 1px solid ${(props) => getBorderColor(props)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  &:focus + div > [class*='RadioOptionBorder'] {
    border-color: ${designTokens.borderColorForInputWhenFocused};
  }
`;

export {
  getContainerStyles,
  getLabelStyles,
  LabelTextWrapper,
  RadioOptionWrapper,
  AdditionalTextWrapper,
  RadioOptionKnob,
  RadioOptionBorder,
  Input,
};
