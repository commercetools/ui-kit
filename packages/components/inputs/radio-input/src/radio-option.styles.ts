import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TStylesProps } from './radio-option';

const LabelTextWrapper = styled.div<TStylesProps>`
  grid-area: label;
  margin-left: ${designTokens.marginLeftForRadioInputLabel};
  font-size: 1rem;
  font-family: inherit;
  display: flex;
  align-items: center;
`;

const AdditionalTextWrapper = styled.div<TStylesProps>`
  grid-area: content;
  margin-left: ${designTokens.spacing10};
  font-size: 1rem;
  font-family: inherit;
`;

const RadioInputWrapper = styled.div<TStylesProps>`
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
  if (props.isReadOnly) {
    return designTokens.borderColorForRadioInputWhenReadonly;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.borderColorForInputWhenWarning;
  }
  if (props.isHovered && !props.isDisabled) {
    if (props.isChecked) {
      return designTokens.borderColorForInputWhenFocused;
    }
    return designTokens.borderColorForRadioInputWhenFocused;
  }
  if (props.isChecked) {
    return designTokens.borderColorForRadioInputWhenChecked;
  }
  return designTokens.borderColorForRadioInput;
};

const getKnobColor = (props: TStylesProps) => {
  if (props.isDisabled) {
    return designTokens.borderColorForRadioInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return designTokens.colorNeutral60;
  }
  return designTokens.borderColorForInputWhenFocused;
};

const getLabelColor = (props: TStylesProps) => {
  if (props.isDisabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.fontColorForInputWhenReadonly;
  }
  if (props.hasError) {
    return designTokens.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.fontColorForInputWhenWarning;
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

const RadioOptionKnob = styled.div<TStylesProps>`
  width: ${designTokens.heightForRadioInputOptionWhenChecked};
  height: ${designTokens.heightForRadioInputOptionWhenChecked};
  border-radius: 50%;
  background-color: ${(props) => getKnobColor(props)};
`;

const RadioOptionBorder = styled.div<TStylesProps>`
  width: ${designTokens.heightForRadioInputOption};
  height: ${designTokens.heightForRadioInputOption};
  border-radius: 50%;
  background-color: ${designTokens.backgroundColorForInput};
  border-width: ${designTokens.borderForRadioInputOption};
  border-style: solid;
  border-color: ${(props) => getBorderColor(props)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioOptionContainer = styled.div<TStylesProps>`
  display: flex;
  align-items: center;
  grid-area: radio;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 4px solid transparent;
  ${RadioOptionBorder} {
    background-color: ${(props) =>
      props.isDisabled
        ? designTokens.backgroundColorForInputWhenDisabled
        : designTokens.backgroundColorForInput};
  }
`;

const getHoverStyles = (props: TStylesProps) => {
  const hoverStyles = css`
    ${RadioOptionContainer} {
      border-color: ${designTokens.colorNeutral90};
    }
  `;

  return [
    !props.isDisabled &&
      !props.isReadOnly &&
      /* prettier-ignore */
      css`
        &:hover ${hoverStyles};
      `,
    props.isHovered && hoverStyles,
  ];
};

const RadioOptionLabel = styled.label<TStylesProps>`
  align-items: center;
  color: ${(props) => getLabelColor(props)};
  cursor: ${(props) => getLabelCursor(props)};
  display: flex;

  ${(props) =>
    !props.isReadOnly
      ? `:focus-within ${LabelTextWrapper} {
      outline: auto 2px ${designTokens.borderColorForInputWhenFocused};
      outline-offset: 2px;
    }`
      : ''}

  ${(props) => getHoverStyles(props)}
`;

export {
  LabelTextWrapper,
  RadioInputWrapper,
  AdditionalTextWrapper,
  RadioOptionKnob,
  RadioOptionBorder,
  RadioOptionLabel,
  RadioOptionContainer,
};
