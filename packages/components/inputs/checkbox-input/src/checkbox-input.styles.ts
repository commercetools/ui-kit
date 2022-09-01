import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import type { TCheckboxProps } from './checkbox-input';

const getSvgBorderStroke = (props: TCheckboxProps) => {
  if (props.isDisabled) {
    return customProperties.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.borderColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return customProperties.borderColorForInputWhenReadonly;
  }
  if (
    props.isHovered &&
    !props.isReadOnly &&
    !props.isDisabled &&
    !props.hasError
  ) {
    return customProperties.borderColorForInputWhenFocused;
  }
  return customProperties.borderColorForInput;
};

const getSvgContentFill = (props: TCheckboxProps) => {
  if (props.isDisabled) {
    return customProperties.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.fontColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return customProperties.fontColorForInputWhenReadonly;
  }
  return customProperties.borderColorForInputWhenFocused;
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
      fill: ${customProperties.backgroundColorForInput};
    }
    svg *[data-style='checkbox__content'] {
      fill: ${getSvgContentFill(props)};
    }
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { getCheckboxWrapperStyles };
