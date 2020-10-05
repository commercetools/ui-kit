/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const SearchSelectInputWrapper = styled.div`
  ${(props) =>
    !props.isDisabled && !props.isReadOnly
      ? `div[class$='control'] {
        &:hover {
          cursor: text;
        }
        div[class$='indicatorContainer' i] {
          cursor: pointer;
          svg * {
            fill: ${vars.colorSolid};
          }
        }
      }`
      : ''}
`;

export { SearchSelectInputWrapper };
