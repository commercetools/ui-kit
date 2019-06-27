import { css } from '@emotion/core';
import styled from '@emotion/styled';
import vars from '../../../../materials/custom-properties';

const getItemStyles = props => {
  let backgroundColor = vars.colorSurface;
  if (props.isHovered) {
    backgroundColor = vars.colorNeutral90;
  }
  if (props.isSelectedItem) {
    backgroundColor = vars.colorAccent95;
  }

  return css`
    background-color: ${backgroundColor};
  `;
};

const DropdownItem = styled.div`
  padding: 4px;
  font-size: 1.2rem;
  ${getItemStyles}
  font-family: ${vars.fontFamilyDefault};
`;

const Button = styled.button`
  border: 0;
  font-family: ${vars.fontFamilyDefault};
  border-radius: ${vars.borderRadius4};
  cursor: pointer;
  padding: 4px 8px;
  color: ${vars.colorSolid};

  &:hover {
    background-color: ${vars.colorNeutral90};
  }

  &:focus {
    outline: none;
  }

  &:active,
  &:focus {
    background-color: ${vars.colorNavy30};
    color: ${vars.colorSurface};

    * {
      fill: ${vars.colorSurface};
    }
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  cursor: pointer;
  font-size: 1.2rem;
  top: ${vars.spacingXs};
  left: 0;
  background: white;

  /* background: teal; */
  z-index: 9999;
  padding: 4px;

  border: 1px solid ${vars.colorPrimary};
  border-radius: ${vars.borderRadius6};
`;

export { Button, DropdownContainer, DropdownItem };
