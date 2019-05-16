import { css } from '@emotion/core';
import styled from '@emotion/styled';
import vars from '../../../../materials/custom-properties';
import designTokens from '../../../../materials/design-tokens';

import { getInputStyles } from '../styles';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getClearSectionStyles = props => {
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
    transition: ${overwrittenVars.transitionStandard};
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
        color: ${overwrittenVars[designTokens.fontColorForInputWhenError]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenError
        ]};
      `,
    ];
  }
  return baseIconStyles;
};

const getClockIconContainerStyles = props => {
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
    transition: ${overwrittenVars.transitionStandard};
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
        color: ${overwrittenVars[designTokens.fontColorFolorInputWhenError]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenError
        ]};
      `,
    ];
  }
  return baseIconStyles;
};

const getInputContainerStyles = props => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };

  return css`
    width: 100%;
    align-items: center;
    display: flex;
    font-size: ${overwrittenVars[designTokens.fontSizeForInput]};
    font-family: ${overwrittenVars[designTokens.fontSizeForInput]};
  `;
};

const mapProps = props => {
  return {
    isDisabled: props.disabled,
    isReadOnly: props.readOnly,
    ...props,
  };
};

const getTimeInputStyles = props => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };
  console.log('here', mapProps(props));
  return [
    getInputStyles(mapProps(props), props.theme),
    css`
      border-radius: ${overwrittenVars[designTokens.borderRadiusForInput]} 0 0
        ${overwrittenVars[designTokens.borderRadiusForInput]};
      border-right: none;

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

/*

const getIconTheme = (isDisabled, isMouseOver) => {
  if (isDisabled) return 'grey';
  if (isMouseOver) return 'orange';
  return 'black';
};
*/

const getBorderColorWhenFocused = props => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };

  return css`
    transition: ${overwrittenVars.transitionStandard};
    border-color: ${overwrittenVars[
      designTokens.borderColorForInputWhenFocused
    ]};
  `;
};

const getClearSectionHoverStyles = props => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };

  if (props.isDisabled || props.isReadOnly) return css``;

  return css`
    &:hover svg * {
      fill: ${overwrittenVars.colorWarning};
    }
  `;
};

const StyledClearSection = styled.div`
  ${getClearSectionStyles}
`;

const StyledClockIconContainer = styled.label`
  ${getClockIconContainerStyles}
`;

const StyledInput = styled.input`
  ${getTimeInputStyles}

  &:focus + ${StyledClearSection}, &:focus + ${StyledClearSection} + ${StyledClockIconContainer} {
     ${props => !props.disabled && getBorderColorWhenFocused}
  }
`;

const StyledInputContainer = styled.div`
  ${getInputContainerStyles}

  &:hover ${StyledInput}, &:hover ${StyledClearSection}, &:hover ${StyledClockIconContainer} {
    ${props => !props.isDisabled && getBorderColorWhenFocused}
  }
`;

export {
  StyledClearSection,
  StyledInput,
  StyledInputContainer,
  StyledClockIconContainer,
};

/*  :not(:disabled)&:focus + ${StyledClearSection}, :not(:disabled):&:hover + ${StyledClearSection} {
    ${getBorderColorWhenFocused};
  }

  &:focus
    + ${StyledClearSection}
    + ${StyledClockIconContainer},
    &:hover
    + ${StyledClearSection}
    + ${StyledClockIconContainer} {
    ${getBorderColorWhenFocused};
  }
*/
