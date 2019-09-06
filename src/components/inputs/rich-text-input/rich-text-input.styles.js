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
  display: flex;
  flex-wrap: wrap;
  font-family: ${vars.fontFamilyDefault};
  border: 1px solid ${vars.borderColorForInput};
  border-radius: ${vars.borderRadiusForInput};
  border-bottom: 0;
  padding: ${vars.spacingXs} calc(${vars.spacingS} - 1px);
  padding-left: 3px;

  > * {
    margin-left: 1px !important;
  }
  position: relative;

  &::after {
    position: absolute;
    content: '';
    width: calc(100% - 16px);
    height: 1px;
    background: ${vars.colorNeutral};
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }
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
  position: relative;

  &:focus {
    outline: none;
  }

  ${Toolbar} {
    border-radius: ${vars.borderRadiusForInput};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    display: none;
    border-color: ${vars.borderColorForInput};
  }

  &:focus-within {
    ${Toolbar} {
      display: flex;
      border-color: ${vars.borderColorForInputWhenFocused};
    }

    ${EditorContainer} {
      border-color: ${vars.borderColorForInputWhenFocused};
      border-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }

  ${EditorContainer} {
    border-color: ${vars.borderColorForInput};
  }
`;
