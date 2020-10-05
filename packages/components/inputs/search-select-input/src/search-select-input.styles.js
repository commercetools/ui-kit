/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getWrapperStyles = (props) => {
  if (props.isDisabled || props.isReadOnly) {
    return '';
  }
  return css`
    div[class$='control'] {
      &:hover {
        cursor: text;
      }
      div[class$='indicatorContainer' i] {
        cursor: pointer;
        svg * {
          fill: ${vars.colorSolid};
        }
      }
    }
  `;
};
const SearchSelectInputWrapper = styled.div`
  ${getWrapperStyles}
`;

export { SearchSelectInputWrapper };
