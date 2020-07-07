import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  customProperties as vars,
  designTokens,
} from '@commercetools-uikit/design-system';
import { getInputStyles } from '../../../../../src/components/inputs/styles';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getClearSectionStyles = (props) => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };

  const baseIconStyles = css`
    align-items: center;
    box-sizing: border-box;
    background-color: ${overwrittenVars[designTokens.backgroundColorForInput]};
    border-bottom: 1px solid
      ${overwrittenVars[designTokens.borderColorForInput]};
    border-right: 1px solid ${overwrittenVars[designTokens.borderColorForInput]};
    border-top: 1px solid ${overwrittenVars[designTokens.borderColorForInput]};
    border-left: none;
    height: ${overwrittenVars.sizeHeightInput};
    display: flex;
    padding: ${overwrittenVars.spacingXs};
    transition: border-color ${overwrittenVars.transitionStandard},
      background-color ${overwrittenVars.transitionStandard},
      color ${overwrittenVars.transitionStandard};
    cursor: pointer;
  `;
  if (props.isDisabled) {
    return [
      baseIconStyles,
      css`
        cursor: not-allowed;
        background-color: ${overwrittenVars[
          designTokens.backgroundColorForInputWhenDisabled
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInputWhenDisabled]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenDisabled
        ]};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseIconStyles,
      css`
        cursor: default;
        color: ${overwrittenVars[designTokens.fontColorForInputWhenReadonly]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenReadonly
        ]};

        svg path {
          fill: ${overwrittenVars[designTokens.fontColorForInputWhenReadonly]};
        }
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseIconStyles,
      css`
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenError
        ]};
      `,
    ];
  }
  return baseIconStyles;
};

const getClockIconContainerStyles = (props) => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };

  const baseIconStyles = css`
    align-items: center;
    box-sizing: border-box;
    background-color: ${overwrittenVars[designTokens.backgroundColorForInput]};
    border-bottom: 1px solid
      ${overwrittenVars[designTokens.borderColorForInput]};
    border-right: 1px solid ${overwrittenVars[designTokens.borderColorForInput]};
    border-top: 1px solid ${overwrittenVars[designTokens.borderColorForInput]};
    border-left: none;
    height: ${overwrittenVars.sizeHeightInput};
    display: flex;
    padding: ${overwrittenVars.spacingXs};
    border-top-right-radius: ${overwrittenVars[
      designTokens.borderRadiusForInput
    ]};
    border-bottom-right-radius: ${overwrittenVars[
      designTokens.borderRadiusForInput
    ]};
    transition: border-color ${overwrittenVars.transitionStandard};
  `;
  if (props.isDisabled) {
    return [
      baseIconStyles,
      css`
        cursor: not-allowed;
        background-color: ${overwrittenVars[
          designTokens.backgroundColorForInputWhenDisabled
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInputWhenDisabled]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenDisabled
        ]};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseIconStyles,
      css`
        cursor: default;
        color: ${overwrittenVars[designTokens.fontColorForInputWhenReadonly]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenReadonly
        ]};

        svg path {
          fill: ${overwrittenVars[designTokens.fontColorForInputWhenReadonly]};
        }
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseIconStyles,
      css`
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenError
        ]};
      `,
    ];
  }
  return baseIconStyles;
};

const getInputContainerStyles = (props) => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };

  return css`
    width: 100%;
    align-items: center;
    display: flex;
    font-size: ${overwrittenVars[designTokens.fontSizeForInput]};
    font-family: inherit;
  `;
};

const mapProps = (props) => {
  return {
    isDisabled: props.disabled,
    isReadOnly: props.readOnly,
    ...props,
  };
};

const getTimeInputStyles = (props) => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };

  return [
    getInputStyles(mapProps(props), props.theme),
    css`
      border-radius: ${overwrittenVars[designTokens.borderRadiusForInput]} 0 0
        ${overwrittenVars[designTokens.borderRadiusForInput]};
      border-right: none;
      transition: border-color ${overwrittenVars.transitionStandard},
        color ${overwrittenVars.transitionStandard};

      &:focus,
      &:active,
      &:focus + *,
      &:active + * {
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenFocused
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInput]};
      }

      &:disabled {
        cursor: not-allowed;
      }

      &:disabled {
        background-color: ${overwrittenVars[
          designTokens.backgroundColorForInputWhenDisabled
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInputWhenDisabled]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenDisabled
        ]};
        opacity: 1; /* fix for mobile safari */
      }
    `,
  ];
};

const getBorderColorWhenFocused = (props) => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };

  return css`
    transition: border-color ${overwrittenVars.transitionStandard};
    border-color: ${overwrittenVars[
      designTokens.borderColorForInputWhenFocused
    ]};
  `;
};

const getClearSectionHoverStyles = (props) => {
  if (!props.isDisabled && !props.isReadOnly) {
    const overwrittenVars = {
      ...vars,
      ...props.theme,
    };

    return css`
      &:hover svg * {
        fill: ${overwrittenVars.colorWarning};
      }
    `;
  }

  return css``;
};

const StyledClearSection = styled.div`
  ${getClearSectionStyles}
  ${getClearSectionHoverStyles}
`;

const StyledClockIconContainer = styled.label`
  ${getClockIconContainerStyles}
`;

const StyledInput = styled.input`
  ${getTimeInputStyles}

  &:focus + ${StyledClearSection}, &:focus + ${StyledClearSection} + ${StyledClockIconContainer} {
     ${(props) => !props.disabled && getBorderColorWhenFocused}
  }
`;

const StyledInputContainer = styled.div`
  ${getInputContainerStyles}

  &:hover ${StyledInput}, &:hover ${StyledClearSection}, &:hover ${StyledClockIconContainer} {
    ${(props) => !props.isDisabled && getBorderColorWhenFocused}
  }
`;

export {
  StyledClearSection,
  StyledInput,
  StyledInputContainer,
  StyledClockIconContainer,
};
