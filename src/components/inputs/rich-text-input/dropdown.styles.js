import { css } from '@emotion/core';
import styled from '@emotion/styled';
import vars from '../../../../materials/custom-properties';

const getItemStyles = props => {
  let backgroundColor = vars.colorSurface;
  if (props.isHovered) {
    backgroundColor = vars.colorNeutral90;
  }
  if (props.isSelected) {
    backgroundColor = vars.colorAccent95;
  }

  return css`
    background-color: ${backgroundColor};
  `;
};

const DropdownItem = styled.div`
  padding: 4px 8px;
  font-size: 1rem;
  ${getItemStyles}
  font-family: ${vars.fontFamilyDefault};
`;

const Button = styled.button`
  border: 0;
  font-family: ${vars.fontFamilyDefault};
  border-radius: ${vars.borderRadius4};
  cursor: pointer;
  font-size: 1rem;
  padding: 4px;
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

export const getButtonStyles = (props = {}) => [
  css`
    border: 0;
    font-family: ${vars.fontFamilyDefault};
    border-radius: ${vars.borderRadius4};
    cursor: pointer;
    font-size: 1rem;
    padding: 4px;
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
  `,
  props.isIndeterminate &&
    css`
      background-color: ${vars.colorAccent95};
    `,
];

const DropdownContainer = styled.div`
  position: absolute;
  cursor: pointer;
  font-size: 1rem;
  top: 4px;
  margin-top: 4px;
  left: 0;
  white-space: nowrap;
  background: white;
  overflow: hidden;
  z-index: 9999;
  border: 1px solid ${vars.colorPrimary};
  border-radius: ${vars.borderRadius6};
`;

export { Button, DropdownContainer, DropdownItem };
