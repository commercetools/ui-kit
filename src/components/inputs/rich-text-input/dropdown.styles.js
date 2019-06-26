import { css } from '@emotion/core';
import styled from '@emotion/styled';
import vars from '../../../../materials/custom-properties';

const Button = styled.button`
  border: 0;
  border-radius: ${vars.borderRadius4};
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
  top: ${vars.spacingXs};
  left: 0;
  background: white;
  /* background: teal; */
  z-index: 9999;
  width: 300px;
  padding: 4px;

  border: 1px solid ${vars.colorPrimary};
  border-radius: ${vars.borderRadius6};
`;

export { Button, DropdownContainer };
