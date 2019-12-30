import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Header } from './simple-table.styles';

const SimpleTable = props => {
  return (
    <Grid
      columns={props.columns}
      maxHeight={props.tableMaxHeight}
      maxWidth={props.tableMaxWidth}
    >
      {props.columns.map(column => (
        <Header
          isSticky={props.isHeaderSticky}
          key={column.key}
          role="column-header"
        >
          <Cell isCondensed={props.isCondensed}>{column.label}</Cell>
        </Header>
      ))}
      {props.items.map(item => (
        <React.Fragment key={item.key}>
          {props.columns.map(column => (
            <Cell
              isCondensed={props.isCondensed}
              alignment={column.align ? column.align : props.cellAlignment}
              key={`${item.key}/${column.key}`}
            >
              {props.renderItem({ item, column })}
            </Cell>
          ))}
        </React.Fragment>
      ))}
    </Grid>
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
