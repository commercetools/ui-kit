import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TCheckboxProps } from './checkbox-input';

const getSvgBorderStroke = (props: TCheckboxProps) => {
  if (props.isDisabled || props.isReadOnly) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return designTokens.borderColorForInputWhenReadonly;
  }
  if (
    props.isHovered &&
    !props.isReadOnly &&
    !props.isDisabled &&
    !props.hasError
  ) {
    return designTokens.borderColorForInputWhenFocused;
  }
  return designTokens.borderColorForInput;
};

const getSvgContentFill = (props: TCheckboxProps) => {
  if (props.isDisabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.fontColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return designTokens.fontColorForInputWhenReadonly;
  }
  return designTokens.borderColorForInputWhenFocused;
};

const getCheckboxWrapperStyles = (props: TCheckboxProps) => {
  /* resets from createStyledIcon styles */
  return css`
    * {
      fill: none;
    }

    display: flex;
    align-items: center;
    svg *[data-style='checkbox__border'] {
      stroke: ${getSvgBorderStroke(props)};
      fill: ${designTokens.backgroundColorForInput};
    }
    svg *[data-style='checkbox__content'] {
      fill: ${getSvgContentFill(props)};
    }
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { getCheckboxWrapperStyles };
