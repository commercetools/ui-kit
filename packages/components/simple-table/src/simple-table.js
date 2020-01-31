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
        {props.rows.map((row, rowIndex) => (
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
                    column.onClick ? () => column.onClick(row) : undefined
                  }
                  alignment={column.align ? column.align : props.cellAlignment}
                  isTruncated={column.isTruncated}
                  isCondensed={props.isCondensed}
                  shouldIgnoreRowClick={column.shouldIgnoreRowClick}
                >
                  {column.renderItem
                    ? column.renderItem(row)
                    : props.itemRenderer(row, column)}
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
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      /* defaults to `auto` */
      width: PropTypes.string,
      label: PropTypes.node.isRequired,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      onClick: PropTypes.func,
      /* custom item renderer, specific for items of this column */
      renderItem: PropTypes.func,
      isTruncated: PropTypes.bool,
      shouldIgnoreRowClick: PropTypes.bool,
    })
  ).isRequired,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  isCondensed: PropTypes.bool,
  /* the default item (cell) renderer.
  an existing per-column `renderItem` func takes precedence over this */
  itemRenderer: PropTypes.func.isRequired,
  /* the default cell alignment
  an existing per-column `align` property takes precedence over this */
  cellAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  isHeaderSticky: PropTypes.bool,
};
SimpleTable.defaultProps = {
  isHeaderSticky: true,
  itemRenderer: (item, column) => item[column.key],
};
SimpleTable.displayName = 'SimpleTable';

export default SimpleTable;
