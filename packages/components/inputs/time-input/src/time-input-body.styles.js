import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import AccessibleButton from '@commercetools-uikit/accessible-button';

import { getInputStyles } from '../../styles';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getClearSectionStyles = (props) => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };

  return css`
    align-items: center;
    box-sizing: border-box;
    height: ${overwrittenVars.sizeHeightInput};
    display: flex;
    padding: ${overwrittenVars.spacingXs};
    cursor: pointer;
    transition: color ${overwrittenVars.transitionStandard},
      border-color ${overwrittenVars.transitionStandard};

    &:focus {
      outline: auto 2px ${overwrittenVars.borderColorForInputWhenFocused};
      svg * {
        fill: ${overwrittenVars.colorWarning};
      }
    }
    &:hover svg * {
      fill: ${overwrittenVars.colorWarning};
    }
  `;
};

const getClockIconContainerStyles = (props) => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
  };

  const baseIconStyles = css`
    align-items: center;
    box-sizing: border-box;
    background: none;
    border: 0;
    border-left: 1px solid ${overwrittenVars.borderColorForInput};
    border-top-right-radius: ${overwrittenVars.borderRadiusForInput};
    border-bottom-right-radius: ${overwrittenVars.borderRadiusForInput};
    height: 100%;
    display: flex;
    padding: ${overwrittenVars.spacingXs};
    outline: 0;
    transition: color ${overwrittenVars.transitionStandard},
      border-color ${overwrittenVars.transitionStandard};
    &:hover:not(:disabled):not(:read-only),
    &:focus {
      border-color: ${overwrittenVars.borderColorForInputWhenFocused};
    }
  `;
  if (props.isDisabled) {
    return [
      baseIconStyles,
      css`
        cursor: not-allowed;
        background-color: ${overwrittenVars.backgroundColorForInputWhenDisabled};
        color: ${overwrittenVars.fontColorForInputWhenDisabled};
        border-color: ${overwrittenVars.borderColorForInputWhenDisabled};
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseIconStyles,
      css`
        color: ${overwrittenVars.fontColorForInputWhenError};
        border-color: ${overwrittenVars.borderColorForInputWhenError};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseIconStyles,
      css`
        color: ${overwrittenVars.fontColorForInputWhenReadonly};
        border-color: ${overwrittenVars.borderColorForInputWhenReadonly};
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

  const baseStyles = css`
    appearance: none;
    background-color: ${overwrittenVars.backgroundColorForInput};
    border: 1px solid ${overwrittenVars.borderColorForInput};
    border-radius: ${overwrittenVars.borderRadiusForInput};
    box-sizing: border-box;
    color: ${overwrittenVars.fontColorForInput};
    width: 100%;
    height: ${vars.sizeHeightInput};
    align-items: center;
    display: flex;
    font-size: ${overwrittenVars.fontSizeDefault};
    font-family: inherit;
    transition: border-color ${overwrittenVars.transitionStandard},
      box-shadow ${overwrittenVars.transitionStandard};

    &:focus-within {
      border-color: ${overwrittenVars.borderColorForInputWhenFocused};
      box-shadow: inset 0 0 0 2px
        ${overwrittenVars.borderColorForInputWhenFocused};
    }

    :hover:not(:disabled):not(:read-only),
    :focus {
      border-color: ${overwrittenVars.borderColorForInputWhenFocused};
    }
  `;

  if (props.isDisabled) {
    return [
      baseStyles,
      css`
        background-color: ${overwrittenVars.backgroundColorForInputWhenDisabled};
        color: ${overwrittenVars.fontColorForInputWhenDisabled};
        border-color: ${overwrittenVars.borderColorForInputWhenDisabled};
        cursor: not-allowed;
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseStyles,
      css`
        color: ${overwrittenVars.fontColorForInputWhenError};
        border-color: ${overwrittenVars.borderColorForInputWhenError};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseStyles,
      css`
        color: ${overwrittenVars.fontColorForInputWhenReadonly};
        border-color: ${overwrittenVars.borderColorForInputWhenReadonly};

        svg {
          fill: ${overwrittenVars.fontColorForInputWhenReadonly};
        }
      `,
    ];
  }

  return baseStyles;
};
const getTimeInputStyles = (props) => {
  const baseStyles = [
    getInputStyles(props),
    css`
      border: none;
      background: none;
      &:focus {
        box-shadow: none;
      }
    `,
  ];
  return baseStyles;
};

const StyledClearSection = styled(AccessibleButton)`
  ${getClearSectionStyles}
`;

const StyledClockIconContainer = styled.label`
  ${getClockIconContainerStyles}
`;

const StyledInput = styled.input`
  ${getTimeInputStyles}
`;

const StyledInputContainer = styled.div`
  ${getInputContainerStyles}

  &:hover ${StyledClockIconContainer}, &:focus-within ${StyledClockIconContainer} {
    border-color: ${vars.borderColorForInputWhenFocused};
  }
`;

export {
  StyledClearSection,
  StyledInput,
  StyledInputContainer,
  StyledClockIconContainer,
};
