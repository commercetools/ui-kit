import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const BaseFooterCell = styled.td`
  position: ${(props) =>
    props.disableFooterStickiness ? 'relative' : 'sticky'};
  left: 0;
  bottom: 0;
  grid-column: 1 / ${(props) => props.numberOfColumns};
  background-color: ${vars.colorSurface};
  border-bottom: 1px solid ${vars.colorNeutral90};
  border-top: 1px solid ${vars.colorNeutral90};

  /* makes the footer top border overlap the border of the last data row: */
  margin-top: -1px;
`;

export default BaseFooterCell;
