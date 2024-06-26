import { css } from '@emotion/react';
import { type Props as ReactSelectProps } from 'react-select';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import { designTokens } from '@commercetools-uikit/design-system';
import { createSelectStyles } from '@commercetools-uikit/select-utils';

type TInputProps = {
  isCondensed?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  horizontalConstraint?:
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
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
    order: 2;
    margin-left: ${designTokens.spacing10};
    padding-left: 0;
    padding-right: 0;
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
`;

const getIconColor = (props: TInputProps, defaultColor: string) => {
  if (props.isDisabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.colorNeutral60;
  }
  return defaultColor;
};

const getClearIconButtonStyles = (props: TInputProps) => [
  getButtonStyles(),
  css`
    fill: ${getIconColor(props, designTokens.colorNeutral40)};
    &:hover {
      fill: ${getIconColor(props, designTokens.colorError)};
    }
    order: 3;
    margin-left: ${designTokens.spacing10};
  `,
];

const getSearchIconButtonStyles = (props: TInputProps) => [
  getButtonStyles(),
  css`
    fill: ${getIconColor(props, designTokens.colorNeutral60)};
    cursor: ${props.isReadOnly ? 'default' : 'pointer'};
    &:hover {
      fill: ${getIconColor(props, designTokens.colorPrimary)};
    }

    border-radius: 0;
    order: 1;
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
    height: ${props.isCondensed
      ? `${designTokens.heightForInputAsSmall}`
      : `${designTokens.heightForInput}`};
    box-sizing: border-box;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    width: ${props.horizontalConstraint === 'auto' ? 'auto' : '100%'};
    transition: border-color ${designTokens.transitionStandard},
      background-color ${designTokens.transitionStandard};
    padding-left: ${designTokens.spacing30};
    padding-right: ${designTokens.spacing30};

    &::placeholder {
      color: ${designTokens.colorNeutral60};
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
        box-shadow: inset 0 0 0 1px
          ${designTokens.borderColorForInputWhenFocused};
      }
    `,
];

type TBase = {
  backgroundColor?: string;
  color?: string;
};

type TCreateSelectableSelectStyles = {
  isCondensed?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  menuPortalZIndex?: number;
  dropdownHasFocus?: boolean;
  horizontalConstraint?:
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
};

const createSelectableSelectStyles = ({
  hasWarning,
  hasError,
  isCondensed,
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
    isCondensed,
    horizontalConstraint,
  });

  return {
    ...selectStyles,
    control: (base: TBase, state: ReactSelectProps) => ({
      ...selectStyles.control(base, state),
      padding: `0 ${designTokens.spacing25}`,
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      borderRight: '0',
      height: '100%',
      fontSize: isCondensed ? designTokens.fontSize20 : designTokens.fontSize30,
      minHeight: isCondensed
        ? designTokens.heightForInputAsSmall
        : designTokens.heightForInput,
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
        : designTokens.colorNeutral60,
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
