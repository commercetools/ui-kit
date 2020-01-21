import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const TableGrid = styled.table`
  display: grid;
  /* stylelint-disable function-whitespace-after */
  grid-template-columns: ${props =>
    props.columns.map(column => column.width || 'auto').join(' ')};
  /* stylelint-enable function-whitespace-after */
  border-top: 1px solid ${vars.colorNeutral90};
  border-left: 1px solid ${vars.colorNeutral90};

  ${props => (props.maxHeight ? `max-height: ${props.maxHeight}px;` : '')}
  ${props =>
    props.maxWidth ? `max-width: ${props.maxWidth}px;` : ''}

  overflow: auto;
`;

const Header = styled.thead`
  display: contents;
  position: ${props => (props.isSticky ? 'sticky' : 'static')};
  top: 0;
`;

const Body = styled.tbody`
  display: contents;
`;

const Row = styled.tr`
  display: contents;
  ${props => (props.onClick ? `cursor: pointer;` : '')}

  &:hover td {
    background: ${vars.backgroundColorForInputWhenHovered};
  }
`;

export { TableGrid, Header, Body, Row };
