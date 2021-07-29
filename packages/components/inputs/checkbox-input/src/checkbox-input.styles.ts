import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import {
  customProperties,
  designTokens,
} from '@commercetools-uikit/design-system';
import type { TCheckboxProps } from './checkbox-input';

type TExtendedTheme = Theme & {
  [key: string]: string;
};

const getSvgBorderStroke = (vars: TExtendedTheme, props: TCheckboxProps) => {
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

const getSvgContentFill = (vars: TExtendedTheme, props: TCheckboxProps) => {
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

const getCheckboxWrapperStyles = (props: TCheckboxProps, theme: Theme) => {
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
    svg *[data-style='checkbox__border'] {
      stroke: ${getSvgBorderStroke(overwrittenVars, props)};
      fill: ${overwrittenVars[designTokens.backgroundColorForInput]};
    }
    svg *[data-style='checkbox__content'] {
      fill: ${getSvgContentFill(overwrittenVars, props)};
    }
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { getCheckboxWrapperStyles };
