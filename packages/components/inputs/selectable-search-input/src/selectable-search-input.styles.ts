import { css } from '@emotion/react';
import { type Props as ReactSelectProps } from 'react-select';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import { designTokens } from '@commercetools-uikit/design-system';
import { createSelectStyles } from '@commercetools-uikit/select-utils';

type TInputProps = {
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
};

const getInputContainerBorderColor = (
  props: TInputProps,
  defaultColor: string = designTokens.borderColorForInput
) => {
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
  return defaultColor;
};

const getInputBoxShadow = (props: TInputProps) => {
  if (props.hasError) {
    return designTokens.shadowForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.shadowForInputWhenWarning;
  }
  return designTokens.shadowForInput;
};

const getSelectableSearchInputStyles = (props: TInputProps) => [
  getInputStyles(props),
  css`
    border: none;
    background: none;
    &,
    &:focus {
      box-shadow: none;
    }
    &:focus,
    &:hover {
      background-color: transparent !important;
    }
    width: 100%;
  `,
];

const getButtonStyles = () => css`
  border: none;
  background: none;
  height: 100%;
  border-top-right-radius: ${designTokens.borderRadiusForInput};
  border-bottom-right-radius: ${designTokens.borderRadiusForInput};
  border-left: none;
  align-items: center;
  transition: border-color ${designTokens.transitionStandard},
    background-color ${designTokens.transitionStandard};
  transition: border-color ${designTokens.transitionStandard},
    box-shadow ${designTokens.transitionStandard};
  margin-right: ${designTokens.marginRightForClearInputIcon};
`;

const getIconColor = (props: TInputProps, defaultColor: string) => {
  if (props.isDisabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.fontColorForSearchInputIconWhenReadonly;
  }
  return defaultColor;
};

const getClearIconButtonStyles = (props: TInputProps) => [
  getButtonStyles(),
  css`
    fill: ${getIconColor(props, designTokens.fontColorForClearInputIcon)};
    &:hover {
      fill: ${getIconColor(
        props,
        designTokens.fontColorForClearInputIconWhenHovered
      )};
    }
  `,
];

const getSearchIconButtonStyles = (props: TInputProps) => [
  getButtonStyles(),
  css`
    margin-right: ${designTokens.marginRightForSearchInputIcon};
    fill: ${getIconColor(props, designTokens.fontColorForSearchInputIcon)};
    &:hover {
      fill: ${getIconColor(
        props,
        designTokens.fontColorForSearchInputIconWhenHovered
      )};
    }
  `,
];

const getBackgroundColor = (props: TInputProps, defaultColor: string) => {
  if (props.isDisabled) {
    return designTokens.backgroundColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.backgroundColorForInputWhenReadonly;
  }
  return defaultColor;
};

const getSelectableSearchInputContainerStyles = (props: TInputProps) => [
  css`
    display: flex;
    align-items: center;
    background-color: ${getBackgroundColor(
      props,
      designTokens.backgroundColorForInput
    )};
    border: 1px solid ${getInputContainerBorderColor(props)};
    border-radius: ${designTokens.borderRadiusForInput};
    box-shadow: ${getInputBoxShadow(props)};
    height: ${designTokens.heightForInput};
    box-sizing: border-box;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: 0;
    width: 100%;
    transition: border-color ${designTokens.transitionStandard},
      background-color ${designTokens.transitionStandard};

    &::placeholder {
      color: ${designTokens.placeholderFontColorForInput};
    }

    &:hover {
      border-color: ${getInputContainerBorderColor(
        props,
        designTokens.borderColorForInputWhenHovered
      )};
      background-color: ${getBackgroundColor(
        props,
        designTokens.backgroundColorForInputWhenHovered
      )};
    }

    &:focus-within {
      border-color: ${designTokens.borderColorForInputWhenFocused};
      box-shadow: ${designTokens.boxShadowForDatetimeInputWhenHovered}
        ${designTokens.borderColorForInputWhenFocused};
      &:hover {
        background-color: ${designTokens.colorSurface};
      }
    }

    &:focus {
      border-color: ${designTokens.borderColorForInputWhenFocused};
    }
  `,
];

type TBase = {
  backgroundColor?: string;
  color?: string;
};

type TCreateSelectableSelectStyles = {
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  menuPortalZIndex?: number;
  isNewTheme: boolean;
  dropdownHasFocus?: boolean;
  textInputHasFocus?: boolean;
};

const createSelectableSelectStyles = ({
  hasWarning,
  hasError,
  isDisabled,
  isReadOnly,
  menuPortalZIndex,
  isNewTheme,
  dropdownHasFocus,
  textInputHasFocus,
}: TCreateSelectableSelectStyles) => {
  const selectStyles = createSelectStyles({
    hasWarning,
    hasError,
    menuPortalZIndex,
    isNewTheme,
  });

  return {
    ...selectStyles,
    control: (base: TBase, state: ReactSelectProps) => ({
      ...selectStyles.control(base, state),
      padding: designTokens.paddingForSelectableSearchInputDropdown,
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      borderRight: '0',
      height: '100%',
      borderColor: (() => {
        if (isDisabled)
          return `${designTokens.borderColorForInputWhenDisabled} !important`;
        if (hasError) return designTokens.borderColorForInputWhenError;
        if (hasWarning) return designTokens.borderColorForInputWhenWarning;
        if (textInputHasFocus && !isNewTheme) {
          return designTokens.borderColorForInputWhenFocused;
        }
        if (dropdownHasFocus) {
          return designTokens.borderColorForInputWhenFocused;
        }
        if (isReadOnly)
          return `${designTokens.borderColorForInputWhenReadonly} !important`;
        return designTokens.borderColorForInput;
      })(),
      cursor: (() => {
        if (isDisabled) return 'not-allowed';
        if (isReadOnly) return `default`;
        return 'pointer';
      })(),
      backgroundColor: (() => {
        if (isReadOnly) return designTokens.backgroundColorForInputWhenReadonly;
        return base.backgroundColor;
      })(),
      '&:hover': {
        backgroundColor: (() => {
          if (isReadOnly)
            return designTokens.backgroundColorForInputWhenReadonly;
          return designTokens.backgroundColorForInputWhenHovered;
        })(),
      },
    }),
    dropdownIndicator: () => ({
      fill: isReadOnly
        ? designTokens.fontColorForInputWhenReadonly
        : designTokens.fontColorForMoneyInputCurrencyDropdownIndicator,
    }),
  };
};

export {
  getSelectableSearchInputStyles,
  getSelectableSearchInputContainerStyles,
  getClearIconButtonStyles,
  getSearchIconButtonStyles,
  getBackgroundColor,
  createSelectableSelectStyles,
};
