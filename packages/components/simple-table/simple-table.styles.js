import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getCellAlignment = props => {
  if (props.alignment === 'center') {
    return css`
      justify-content: center;
      text-align: center;
    `;
  }
  if (props.alignment === 'right') {
    return css`
      justify-content: flex-end;
      text-align: right;
    `;
  }
  return css`
    justify-content: flex-start;
    text-align: left;
  `;
};

const getCellStyles = props => css`
  display: flex;
  align-items: center;

  border-right: 1px solid ${vars.colorNeutral90};
  border-bottom: 1px solid ${vars.colorNeutral90};

  padding: ${props.isCondensed ? '2px 4px' : '8px 16px'};
`;

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

  &:hover td {
    background: ${vars.backgroundColorForInputWhenHovered};
  }
`;

const HeaderCell = styled.th`
  ${getCellStyles};
  ${getCellAlignment}
  color: ${vars.colorSurface};
  background-color: ${vars.colorAccent};
  font-weight: normal;
`;

const DataCell = styled.td`
  ${getCellStyles}
  ${getCellAlignment}
`;

export { TableGrid, Header, Body, Row, HeaderCell, DataCell };
