import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';

const LabelTextWrapper = styled.div`
  margin-left: ${customProperties.spacingS};
  font-size: 1rem;
  font-family: inherit;
  color: ${(props) =>
    props.isDisabled
      ? customProperties.fontColorForInputWhenDisabled
      : customProperties.fontColorForInput};
`;

const getSvgContainerBorderStroke = (props) => {
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
const getSvgContainerContentFill = (props) => {
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
const getContainerStyles = (props) => css`
  display: flex;
  align-items: center;

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

const getSvgLabelBorderStroke = (props) => {
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
const getLabelColor = (props) => {
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
const getLabelCursor = (props) => {
  if (props.isDisabled) {
    return 'not-allowed';
  }
  if (props.isReadOnly) {
    return 'default';
  }
  return 'pointer';
};
const getLabelStyles = (props) => css`
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

export { getContainerStyles, getLabelStyles, LabelTextWrapper };
