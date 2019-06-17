import styled from '@emotion/styled';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const getBorderColor = props => {
  if (props.isDisabled) {
    return css`
      border-color: ${vars.borderColorForInputWhenDisabled};
    `;
  }
  if (props.hasError) {
    return css`
      border-color: ${vars.borderColorForInputWhenError};
    `;
  }
  if (props.hasWarning) {
    return css`
      border-color: ${vars.borderColorForInputWhenWarning};
    `;
  }
  if (props.isReadOnly) {
    return css`
      border-color: ${vars.borderColorForInputWhenReadonly};
    `;
  }
  return css`
    border-color: ${vars.borderColorForInput};
  `;
};

export const Toolbar = styled.div`
  /* display: none; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-family: ${vars.fontFamilyDefault};
  border: 1px solid ${vars.borderColorForInput};
  border-radius: ${vars.borderRadiusForInput};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 0;
  padding: ${vars.spacingXs} ${vars.spacingS};
`;

export const EditorContainer = styled.div`
  padding: ${vars.spacingXs} ${vars.spacingS};
  border: 1px solid ${vars.borderColorForInput};
  border-radius: ${vars.borderRadiusForInput};
  font-family: ${vars.fontFamilyDefault};
  ${getBorderColor}
  overflow-y: scroll;
`;

export const Container = styled.div`
  border-radius: ${vars.borderRadiusForInput};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  transition: ${vars.transitionStandard};
  ${getBorderColor}

  &:focus {
    outline: none;
  }

  &:focus-within {
    ${Toolbar} {
      border-radius: ${vars.borderRadiusForInput};
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      display: flex;
      border-color: ${vars.borderColorForInputWhenFocused};
    }
    ${EditorContainer} {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-color: ${vars.borderColorForInputWhenFocused};
    }
  }
`;
