import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';
import { TOptionProps } from './radio-option';

type TStylesProps = Pick<
  TOptionProps,
  'isDisabled' | 'hasError' | 'hasWarning' | 'isHovered' | 'isReadOnly'
>;

const LabelTextWrapper = styled.div<TStylesProps>`
  grid-area: label;
  margin-left: ${customProperties.spacingS};
  font-size: 1rem;
  font-family: inherit;
  color: ${(props) =>
    props.isDisabled
      ? customProperties.fontColorForInputWhenDisabled
      : customProperties.fontColorForInput};
`;

const AdditionalTextWrapper = styled.div<TStylesProps>`
  grid-area: content;
  margin-left: ${customProperties.spacingXs};
  font-size: 1rem;
  font-family: inherit;
  color: ${(props) =>
    props.isDisabled
      ? customProperties.fontColorForInputWhenDisabled
      : customProperties.fontColorForInput};
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
    return customProperties.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return customProperties.borderColorForInputWhenWarning;
  }
  if (props.isHovered && !props.isDisabled) {
    return customProperties.borderColorForInputWhenFocused;
  }
  if (props.isReadOnly) {
    return customProperties.borderColorForInputWhenReadonly;
  }
  return customProperties.borderColorForInput;
};

const getSvgContainerContentFill = (props: TStylesProps) => {
  if (props.isDisabled) {
    return customProperties.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return customProperties.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return customProperties.fontColorForInputWhenReadonly;
  }
  return customProperties.borderColorForInputWhenFocused;
};

const getContainerStyles = (props: TOptionProps) => css`
  display: flex;
  align-items: center;
  grid-area: radio;
  svg {
    fill: ${props.isDisabled
      ? customProperties.backgroundColorForInputWhenDisabled
      : customProperties.backgroundColorForInput};
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
    return customProperties.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return customProperties.borderColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return customProperties.borderColorForInputWhenReadonly;
  }
  return customProperties.borderColorForInputWhenFocused;
};

const getLabelColor = (props: TStylesProps) => {
  if (props.isDisabled) {
    return customProperties.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return customProperties.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return customProperties.fontColorForInputWhenReadonly;
  }
  return customProperties.fontColorForInput;
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
    outline: auto 2px ${customProperties.borderColorForInputWhenFocused};
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
