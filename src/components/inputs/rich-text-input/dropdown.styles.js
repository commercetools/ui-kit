import { css } from '@emotion/core';
import styled from '@emotion/styled';
import vars from '../../../../materials/custom-properties';

const DropdownItem = styled.div`
  padding: ${vars.spacingXs} ${vars.spacingS};
  font-family: ${vars.fontFamilyDefault};

  background-color: ${props =>
    props.isSelected ? vars.colorAccent95 : vars.colorSurface};

  &:hover {
    background-color: ${vars.colorNeutral90};
  }
`;

const Button = styled.button`
  border: 0;
  font-family: ${vars.fontFamilyDefault};
  border-radius: ${vars.borderRadius4};
  cursor: pointer;
  font-size: 0.87rem;
  padding: ${vars.spacingXs};
  color: ${vars.colorSolid};

  &:hover {
    background-color: ${vars.colorNeutral90};
  }

  &:focus {
    outline: none;
  }

  &:active,
  &:focus {
    background-color: ${vars.colorAccent30};
    color: ${vars.colorSurface};

    * {
      fill: ${vars.colorSurface};
    }
  }
`;

export const getButtonStyles = (props = { isStyleButton: true }) => [
  css`
    border: 0;
    font-family: ${vars.fontFamilyDefault};
    border-radius: ${vars.borderRadius4};
    cursor: pointer;
    font-size: ${vars.fontSizeForInput};
    color: ${vars.colorSolid};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props.isStyleButton
      ? `calc(${vars.spacingXs} - 1px) ${vars.spacingS}`
      : vars.spacingXs};

    &:hover {
      background-color: ${vars.colorNeutral90};
    }

    &:focus {
      outline: none;
    }

    &:hover:active,
    &:focus {
      background-color: ${vars.colorAccent30};
      color: ${vars.colorSurface};

      * {
        fill: ${vars.colorSurface};
      }
    }
  `,
  props.isIndeterminate &&
    css`
      background-color: ${vars.colorAccent95};
    `,
];

const DropdownContainer = styled.div`
  position: absolute;
  cursor: pointer;
  font-size: ${vars.fontSizeForInput};
  top: ${vars.spacingXs};
  margin-top: ${vars.spacingXs};
  left: 0;
  white-space: nowrap;
  background: ${vars.colorSurface};
  overflow: hidden;
  z-index: 9999;
  border: 1px solid ${vars.colorPrimary};
  border-radius: ${vars.borderRadius6};
`;

export { Button, DropdownContainer, DropdownItem };
