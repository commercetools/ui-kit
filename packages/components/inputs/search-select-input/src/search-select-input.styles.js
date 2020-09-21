/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const SearchSelectInputWrapper = styled.div`
  div[class$='ValueContainer'] {
    &:hover {
      cursor: text;
    }
  }
  div[class$='IndicatorsContainer'] {
    svg * {
      fill: ${vars.colorSolid};
    }
  }
`;

export { SearchSelectInputWrapper };
