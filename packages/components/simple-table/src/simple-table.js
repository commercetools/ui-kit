import React from 'react';
import PropTypes from 'prop-types';
import { TableGrid, Header, Body, Row } from './simple-table.styles';
import { HeaderCell, DataCell } from './cell';

const SimpleTable = props => {
  return (
    <TableGrid
      columns={props.columns}
      maxHeight={props.maxHeight}
      maxWidth={props.maxWidth}
    >
      <Header isSticky={props.isHeaderSticky}>
        <Row>
          {props.columns.map((column, columnIndex) => (
            <HeaderCell
              key={`${columnIndex}-${column.key}`}
              role="column-header"
              isCondensed={props.isCondensed}
            >
              {column.label}
            </HeaderCell>
          ))}
        </Row>
      </Header>
      <Body>
        {props.items.map((row, rowIndex) => (
          <Row
            key={row.key}
            onClick={
              props.onRowClick
                ? () => props.onRowClick(row, rowIndex)
                : undefined
            }
          >
            {props.columns.map(column => {
              return (
                <DataCell
                  key={`${rowIndex}-{row.key}/${column.key}`}
                  onClick={
                    column.onClick
                      ? () => column.onClick(row, column)
                      : undefined
                  }
                  alignment={column.align ? column.align : props.cellAlignment}
                  isTruncated={column.isTruncated}
                  isCondensed={props.isCondensed}
                >
                  {props.renderItem(row, column)}
                </DataCell>
              );
            })}
          </Row>
        ))}
      </Body>
    </TableGrid>
  );
};
SimpleTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
      isTruncated: PropTypes.bool,
    })
  ).isRequired,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  isCondensed: PropTypes.bool,
  cellAlignment: PropTypes.string,
  isHeaderSticky: PropTypes.bool,
};
SimpleTable.defaultProps = {
  isHeaderSticky: true,
};
SimpleTable.displayName = 'SimpleTable';

export default SimpleTable;
