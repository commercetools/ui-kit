import { css } from '@emotion/react';
import {
  customProperties,
  designTokens,
} from '@commercetools-uikit/design-system';
import type { TCheckboxProps } from './checkbox-input';

const getSvgBorderStroke = (props: TCheckboxProps) => {
  if (props.isDisabled) {
    return customProperties[designTokens.borderColorForInputWhenDisabled];
  }
  if (props.hasError) {
    return customProperties[designTokens.borderColorForInputWhenError];
  }
  if (props.isReadOnly) {
    return customProperties[designTokens.borderColorForInputWhenReadonly];
  }
  if (
    props.isHovered &&
    !props.isReadOnly &&
    !props.isDisabled &&
    !props.hasError
  ) {
    return customProperties[designTokens.borderColorForInputWhenFocused];
  }
  return customProperties[designTokens.borderColorForInput];
};

const getSvgContentFill = (props: TCheckboxProps) => {
  if (props.isDisabled) {
    return customProperties[designTokens.fontColorForInputWhenDisabled];
  }
  if (props.hasError) {
    return customProperties[designTokens.fontColorForInputWhenError];
  }
  if (props.isReadOnly) {
    return customProperties[designTokens.fontColorForInputWhenReadonly];
  }
  return customProperties[designTokens.borderColorForInputWhenFocused];
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
      fill: ${customProperties[designTokens.backgroundColorForInput]};
    }
    svg *[data-style='checkbox__content'] {
      fill: ${getSvgContentFill(props)};
    }
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { getCheckboxWrapperStyles };
