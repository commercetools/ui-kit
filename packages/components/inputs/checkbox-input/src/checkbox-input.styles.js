import { css } from '@emotion/react';
import {
  customProperties,
  designTokens,
} from '@commercetools-uikit/design-system';

const getSvgBorderStroke = (vars, props) => {
  if (props.isDisabled) {
    return vars[designTokens.borderColorForInputWhenDisabled];
  }
  if (props.hasError) {
    return vars[designTokens.borderColorForInputWhenError];
  }
  if (props.isReadOnly) {
    return vars[designTokens.borderColorForInputWhenReadonly];
  }
  if (
    props.isHovered &&
    !props.isReadOnly &&
    !props.isDisabled &&
    !props.hasError
  ) {
    return vars[designTokens.borderColorForInputWhenFocused];
  }
  return vars[designTokens.borderColorForInput];
};
const getSvgContentFill = (vars, props) => {
  if (props.isDisabled) {
    return vars[designTokens.fontColorForInputWhenDisabled];
  }
  if (props.hasError) {
    return vars[designTokens.fontColorForInputWhenError];
  }
  if (props.isReadOnly) {
    return vars[designTokens.fontColorForInputWhenReadonly];
  }
  return vars[designTokens.borderColorForInputWhenFocused];
};
const getCheckboxWrapperStyles = (props, theme) => {
  const overwrittenVars = {
    ...customProperties,
    ...theme,
  };
  /* resets from createStyledIcon styles */
  return css`
    * {
      fill: none;
    }

    display: flex;
    align-items: center;
    svg [id$='borderAndContent'] > [id$='border'] {
      stroke: ${getSvgBorderStroke(overwrittenVars, props)};
      fill: ${overwrittenVars[designTokens.backgroundColorForInput]};
    }
    svg [id$='borderAndContent'] > [id$='content'] {
      fill: ${getSvgContentFill(overwrittenVars, props)};
    }
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { getCheckboxWrapperStyles };
