import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';

type Props = {
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
};

const getBorderColor = (props: Props) => {
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

const getBackgroundColor = (props: Props) => {
  if (props.isDisabled) {
    return css`
      background-color: ${vars.backgroundColorForInputWhenDisabled};
    `;
  }
  //Question: imported vars has no property with `backgroundColorForInputWhenReadonly` as key. Should this be defined?
  // if (props.isReadOnly) {
  //   return css`
  //     background-color: ${vars.backgroundColorForInputWhenReadonly};
  //   `;
  // }
  return css`
    background-color: ${vars.backgroundColorForInput};
  `;
};

export const ToolbarMainControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: flex-start;

  > * {
    margin-left: 1px;
  }
`;

export const ToolbarRightControls = styled.div``;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: ${vars.fontFamilyDefault};
  border-radius: ${vars.borderRadiusForInput};
  border-bottom: 0;
  padding: ${vars.spacingXs} calc(${vars.spacingS} - 1px);
  padding-left: calc(${vars.spacingXs} - 1px);
  align-items: flex-start;
  align-content: stretch;

  position: relative;

  &::after {
    position: absolute;
    content: '';
    width: calc(100% - ${vars.spacingS});
    height: 1px;
    background: ${vars.colorNeutral};
    left: 50%;
    transform: translateX(-50%);
    bottom: -1px;
  }

  &:focus {
    outline: none;
  }
`;

const reset = (props: Props) => [
  css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
    }
    p {
      margin: 0;
      line-height: 22px;
    }
  `,
  props.isReadOnly &&
    css`
      color: ${vars.fontColorForInputWhenReadonly};
    `,

  props.isDisabled &&
    css`
      color: ${vars.fontColorForInputWhenDisabled};
    `,
];

export const EditorContainer = styled.div`
  padding: 4px ${vars.spacingS};
  padding-top: 6px;
  border-radius: ${vars.borderRadiusForInput};
  font-family: ${vars.fontFamilyDefault};
  ${getBorderColor}
  overflow-y: scroll;
  ${reset}
`;

export const Container = styled.div`
  border-radius: ${vars.borderRadiusForInput};
  border: 1px solid ${vars.borderColorForInput};
  transition: ${vars.transitionStandard};
  ${getBorderColor}
  ${getBackgroundColor}
  pointer-events: ${(props) =>
    props.isDisabled || props.isReadOnly ? 'none' : 'inherit'};
  position: relative;

  &:hover {
    border-color: ${vars.borderColorForInputWhenFocused};
  }
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${vars.borderColorForInputWhenFocused};
  }

  ${Toolbar} {
    border-radius: ${vars.borderRadiusForInput};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-color: ${vars.borderColorForInput};
  }

  &:focus-within {
    border-color: ${vars.borderColorForInputWhenFocused};
    box-shadow: inset 0 0 0 2px ${vars.borderColorForInputWhenFocused};
    ${Toolbar} {
      border-color: ${vars.borderColorForInputWhenFocused};
    }

    ${EditorContainer} {
      border-color: ${vars.borderColorForInputWhenFocused};
    }
  }
`;
