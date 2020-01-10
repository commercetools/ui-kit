import React from 'react';
import PropTypes from 'prop-types';
import {
  TableGrid,
  Header,
  Body,
  Row,
  HeaderCell,
  DataCell,
} from './simple-table.styles';

const SimpleTable = props => {
  return (
    <TableGrid
      columns={props.columns}
      maxHeight={props.tableMaxHeight}
      maxWidth={props.tableMaxWidth}
    >
      <Header isSticky={props.isHeaderSticky}>
        <Row>
          {props.columns.map(column => (
            <HeaderCell
              key={column.key}
              role="column-header"
              isCondensed={props.isCondensed}
            >
              {column.label}
            </HeaderCell>
          ))}
        </Row>
      </Header>
      <Body>
        {props.items.map(item => (
          <Row key={item.key}>
            {props.columns.map(column => (
              <DataCell
                isCondensed={props.isCondensed}
                alignment={column.align ? column.align : props.cellAlignment}
                key={`${item.key}/${column.key}`}
              >
                {props.renderItem({ item, column })}
              </DataCell>
            ))}
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
    })
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
  isCondensed: PropTypes.bool,
  cellAlignment: PropTypes.string,
  tableMaxWidth: PropTypes.number,
  tableMaxHeight: PropTypes.number,
  isHeaderSticky: PropTypes.bool,
};
SimpleTable.defaultProps = {
  isHeaderSticky: true,
};
SimpleTable.displayName = 'SimpleTable';

export default SimpleTable;
