import { css } from '@emotion/react';
import { type Props as ReactSelectProps } from 'react-select';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import { designTokens } from '@commercetools-uikit/design-system';
import { createSelectStyles } from '@commercetools-uikit/select-utils';
import { TMaxProp } from '@commercetools-uikit/constraints';

type TInputProps = {
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  horizontalConstraint?: string | number;
};

const getInputContainerBorderColor = (
  props: TInputProps,
  defaultColor: string = designTokens.borderColorForInput
) => {
  if (props.isDisabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.borderColorForInputWhenReadonly;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.borderColorForInputWhenWarning;
  }
  return defaultColor;
};

const getInputFontColor = (props: TInputProps) => {
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
    box-shadow: none;
    background: none;
    &,
    &:focus,
    &:focus:not(:read-only) {
      box-shadow: none;
    }
    &:focus,
    &:hover {
      background-color: transparent !important;
    }
    width: 100%;
    color: ${getInputFontColor(props)};
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
    cursor: ${props.isReadOnly ? 'default' : 'pointer'};
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
    width: ${props.horizontalConstraint === 'auto' ? 'auto' : '100%'};
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

    &:focus {
      border-color: ${designTokens.borderColorForInputWhenFocused};
    }
  `,
  !props.isDisabled &&
    !props.isReadOnly &&
    css`
      &:focus-within {
        border-color: ${designTokens.borderColorForInputWhenFocused};
        box-shadow: ${designTokens.boxShadowForDatetimeInputWhenHovered}
          ${designTokens.borderColorForInputWhenFocused};
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
  dropdownHasFocus?: boolean;
  horizontalConstraint?: TMaxProp;
};

const createSelectableSelectStyles = ({
  hasWarning,
  hasError,
  isDisabled,
  isReadOnly,
  menuPortalZIndex,
  dropdownHasFocus,
  horizontalConstraint,
}: TCreateSelectableSelectStyles) => {
  const selectStyles = createSelectStyles({
    hasWarning,
    hasError,
    menuPortalZIndex,
    isDisabled,
    isReadOnly,
    horizontalConstraint,
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
        if (isReadOnly)
          return `${designTokens.borderColorForInputWhenReadonly} !important`;
        if (hasError) return designTokens.borderColorForInputWhenError;
        if (hasWarning) return designTokens.borderColorForInputWhenWarning;
        if (dropdownHasFocus) {
          return designTokens.borderColorForInputWhenFocused;
        }
        return designTokens.borderColorForInput;
      })(),
      cursor: (() => {
        if (isDisabled) return 'not-allowed';
        if (isReadOnly) return `default`;
        return 'pointer';
      })(),
      backgroundColor: getBackgroundColor(
        {
          isDisabled,
          isReadOnly,
        },
        base.backgroundColor || ''
      ),
      '&:hover': {
        backgroundColor: getBackgroundColor(
          {
            isDisabled,
            isReadOnly,
          },
          designTokens.backgroundColorForInputWhenHovered
        ),
      },
    }),
    singleValue: (base: TBase) => ({
      ...base,
      marginLeft: 0,
      maxWidth: 'initial',
      color: getInputFontColor({
        hasWarning,
        hasError,
        isDisabled,
        isReadOnly,
      }),
    }),
    dropdownIndicator: () => ({
      fill: isReadOnly
        ? designTokens.fontColorForInputWhenDisabled
        : designTokens.fontColorForSelectInputIcon,
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
