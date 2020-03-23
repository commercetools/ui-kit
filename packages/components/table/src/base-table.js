import React from 'react';
import PropTypes from 'prop-types';
import { CellMeasurer, CellMeasurerCache, MultiGrid } from 'react-virtualized';
import sortBy from 'lodash/sortBy';
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import { Global, ClassNames, css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import Inset from '@commercetools-uikit/spacings-inset';
import InsetSquish from '@commercetools-uikit/spacings-inset-squish';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Cell from './cell';
import SortableHeader from './sortable-header';
import cellRangeRenderer from './cell-range-renderer';

export default class BaseTable extends React.Component {
  static displayName = 'BaseTable';
  static propTypes = {
    /* an array of objects describing the tables columns */
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        /* The unique key of the columns that is used to identify your data. */
        key: PropTypes.string.isRequired,
        /* The horizontal alignment of the table column content */
        align: PropTypes.oneOf(['left', 'center', 'right']),
        /* The label of the column that will be shown in the column header. */
        label: PropTypes.node,
        /** Escape-hatch you can use when you have a more sophisticated or custom
         * header that doesn't follow the standard table header styling—like
         * different padding or background color.
         * Should implement the following interface: (): node
         */
        getLabel: PropTypes.func,
        /**
         * Indicates whether the column should be fixed and stick to the left side
         * so that only the other columns are horizontally scrollable.
         */
        isFixed: PropTypes.bool,
        /**
         * Whether clicking on the column header will sort the column.
         * Will call the onSortChange callback and respond to sortBy and
         * sortDirection changes.
         * Only the column whose key is equal to sortBy will be shown as sorted,
         * which means that the table only supports single column sorting.
         */
        isSortable: PropTypes.bool,
        /**
         * The grow factor relative to other columns. Basically, take any
         * available extra width and distribute it proportionally according to all
         * columns' flexGrow values.
         * This is also useful, when you want some columns to stick to their
         * width (like a column with actions or checkboxes) and some other columns
         * to take up the rest of the width.
         */
        flexGrow: PropTypes.number,
        /**
         * Custom class that is added to the header's cell container.
         */
        headerClassName: PropTypes.string,
        headerStyle: PropTypes.object,
        /**
         * Custom class that is added to the cell's container.
         */
        className: PropTypes.string,
        cellClassName: PropTypes.string, // alias
        /**
         * Function to return a custom class that is added to the cell's
         * container.
         */
        classNameGetter: PropTypes.func,
        cellClassNameGetter: PropTypes.func, // alias
        /**
         * Function to return a custom class that is added to the cell's
         * container.
         */
        cellStyleGetter: PropTypes.func,
        /**
         * Function that is called when the user clicks a cell in this column.
         * Only use this if you want to have a column specific behaviour. Most
         * of the times you will probably use onRowClick instead.
         * For styling the cell on :hover or :active use the className prop.
         * Should implement the following interface:
         * ({ rowIndex: number, columnKey: number }): void
         */
        onClick: PropTypes.func,
      })
    ).isRequired,
    itemRenderer: PropTypes.func.isRequired,
    registerMeasurementCache: PropTypes.func,
    rowCount: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    ).isRequired,
    maxHeight: PropTypes.number.isRequired,
    maxWidth: PropTypes.number.isRequired,
    onSortChange: PropTypes.func,
    onRowClick: PropTypes.func,
    scrollToRow: PropTypes.number,
    onScroll: PropTypes.func,
    sortDirection: PropTypes.oneOf(['ASC', 'DESC']),
    sortBy: PropTypes.string,
    tableClassName: PropTypes.string,
    tableStyle: PropTypes.object,
    // The keyMapper is only used in the storybook to make the table update
    // measurements when the cells contents change on the fly
    keyMapper: PropTypes.func,
    // registerMultiGrid allows the parent component to access the MultiGrid.
    // Calling directly to the MultiGrid functions is only recommended for small
    // tables, as it would cause performance issues otherwise
    registerMultiGrid: PropTypes.func,
  };

  // The table might not need to take up the full height/width it has
  // avaliable. To find out how much space it actually needs to take up, we need
  // to calculate the inner height/width of the table. This is done in the
  // handleSectionRendered function. That function is called by the MultiGrid
  // component AFTER it has rendered. To then update the table with the proper
  // height and width we need to store those in the state rather than on the
  // component instance.
  state = {
    height: this.props.maxHeight,
    width: this.props.maxWidth,
  };

  cellMeasurerCache = new CellMeasurerCache({
    defaultWidth: 400,
    defaultHeight: 100,
    keyMapper: this.props.keyMapper,
  });

  // fixed columns are rendered at the beginning of the table by convention
  columns = sortBy(this.props.columns, (col) => !col.isFixed);

  componentDidMount() {
    if (this.props.registerMeasurementCache) {
      this.props.registerMeasurementCache(this.cellMeasurerCache);
    }
    if (this.props.registerMultiGrid) {
      this.props.registerMultiGrid(this.multiGrid);
    }
  }
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.columns !== this.props.columns) {
      this.columns = sortBy(nextProps.columns, (col) => !col.isFixed);
    }
    if (
      nextProps.maxWidth !== this.props.maxWidth ||
      nextProps.maxHeight !== this.props.maxHeight
    ) {
      // whenever the surroundings of the table change (mostly during rendering)
      // the available space for the table might change as well. E.g. there
      // might be a scrollbar now that wasn't there before. So we need to ensure
      // to reflect that in the table. Otherwise the table might be scrollable
      // all of a sudden.
      this.updateMeasurements({
        maxHeight: nextProps.maxHeight,
        maxWidth: nextProps.maxWidth,
      });
    }
    if (
      nextProps.sortBy !== this.props.sortBy ||
      nextProps.sortDirection !== this.props.sortDirection
    ) {
      // since the order of the rows has probably changed we need to re-
      // apply the cell sizes
      this.multiGrid.recomputeGridSize();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.columns !== this.props.columns) {
      // check if the colums definition changed on runtime
      // this is normally only necessary when playing around with the table
      // in the storybook
      // why do we wait until the udpate is complete? Because
      // handleSectionRendered relies on the cell measurements from the cache,
      // which are done during the rendering. So the measurements are only
      // updated after the table has rerendered.
      this.updateMeasurements({
        maxHeight: this.props.maxHeight,
        maxWidth: this.props.maxWidth,
      });
    }
  }
  registerMultiGrid = (node) => {
    this.multiGrid = node;
  };
  updateMeasurements = ({ maxWidth, maxHeight }) => {
    this.handleSectionRendered({
      measurementCache: this.cellMeasurerCache,
      containerWidth: maxWidth,
      containerHeight: maxHeight,
    });
    this.multiGrid.recomputeGridSize();
  };
  // since this table also considers the header a row we need to subtract it
  // from the row index before passing it to the parent
  getBodyRowIndex = (rowIndex) => rowIndex - 1;
  handleChangeSortDirection = (columnKey) => {
    if (!this.props.onSortChange) return;

    if (columnKey !== this.props.sortBy) {
      this.props.onSortChange(columnKey, 'ASC');
    } else {
      this.props.onSortChange(
        columnKey,
        this.props.sortDirection === 'ASC' ? 'DESC' : 'ASC'
      );
    }
  };
  calcTableContentHeight = ({ measurementCache, containerHeight }) => {
    let tableContentHeight = 0;
    for (let i = 0; i <= this.props.rowCount; i += 1) {
      tableContentHeight += measurementCache.rowHeight({
        index: i,
      });
      if (tableContentHeight > containerHeight) {
        break;
      }
    }
    return tableContentHeight;
  };
  calcTableContentWidth = ({ measurementCache, containerWidth }) => {
    let tableContentWidth = 0;
    for (let i = 0; i < this.props.columns.length; i += 1) {
      tableContentWidth += measurementCache.columnWidth({
        index: i,
      });
      if (tableContentWidth > containerWidth) {
        break;
      }
    }
    return tableContentWidth;
  };
  handleSectionRendered = ({
    measurementCache = this.cellMeasurerCache,
    containerWidth = this.props.maxWidth,
    containerHeight = this.props.maxHeight,
  }) => {
    // find out whether there is more vertical space than we can fill up with
    // rows
    const tableContentHeight = this.calcTableContentHeight({
      measurementCache,
      containerHeight,
    });
    // TODO use from nextProps as well
    const isVerticallyScrollable = tableContentHeight > containerHeight;

    // find out whether there is more horizontal space than we can fill up with
    // columns
    const tableContentWidth = this.calcTableContentWidth({
      measurementCache,
      containerWidth,
    });
    const isHorizontallyScrollable = tableContentWidth > containerWidth;

    if (!isVerticallyScrollable) {
      // in case the the table is not scrollable - meaning there indeed is more
      // horizontal space then rows to fill it up with - set the height to the
      // exact height of all rows so there is no white space left below the table
      const horizontalScrollBarWidth = isHorizontallyScrollable
        ? getScrollbarSize()
        : 0;
      this.setState({ height: tableContentHeight + horizontalScrollBarWidth });
    } else if (this.state.height !== containerHeight) {
      // reset the height to the max height because rows were added that now do
      // fill up the max height
      this.setState({ height: containerHeight });
    }

    const verticalScrollBarWidth = isVerticallyScrollable
      ? getScrollbarSize()
      : 0;
    const remainingWidth =
      containerWidth - tableContentWidth - verticalScrollBarWidth;
    if (remainingWidth > 0) {
      // when the content of the table is smaller than the available width
      // we can distribute the remaining space among columns that have
      // specified flexGrow.
      // if there are none, the table shouldn't take up the full width
      const shouldFillHorizontalSpace = this.props.columns.some(
        (col) => col.flexGrow
      );
      if (shouldFillHorizontalSpace) {
        this.setState({
          width: containerWidth,
          // calculate the remaining width to be able to evenly distribute
          // it among the flex grow columns
          remainingWidth,
        });
      } else {
        // TODO we should clarify if we actually need this mode or if we should
        // always fill up the remaining horizontal space

        // make the table exactly as wide as its contents
        this.setState({
          width: tableContentWidth + verticalScrollBarWidth,
          remainingWidth: undefined,
        });
      }
    } else {
      // reset the width to the full width in case columns were added that now
      // do fill up the max width
      this.setState({
        width: containerWidth,
        remainingWidth: undefined,
      });
    }
  };
  getColumnWidth = (getColumnWidthFromCache) => ({ index }) => {
    const numberOfFlexColumns = this.columns.filter((col) => col.flexGrow)
      .length;
    const shouldFillHorizontalSpace =
      this.state.remainingWidth && this.columns[index].flexGrow;
    if (shouldFillHorizontalSpace) {
      const widthPerFlexColumn =
        this.state.remainingWidth / numberOfFlexColumns;
      return getColumnWidthFromCache({ index }) + widthPerFlexColumn;
    }
    return getColumnWidthFromCache({ index });
  };
  headerRenderer = (column) =>
    column.getLabel ? (
      column.getLabel()
    ) : (
      <Cell>
        <InsetSquish scale="m">
          {column.isSortable ? (
            <div onClick={() => this.handleChangeSortDirection(column.key)}>
              <SortableHeader
                columnKey={column.key}
                sortBy={this.props.sortBy}
                sortDirection={this.props.sortDirection}
                alignRight={column.align === 'right'}
              >
                {column.label}
              </SortableHeader>
            </div>
          ) : (
            column.label
          )}
        </InsetSquish>
      </Cell>
    );

  renderItemCell = (renderParams) => {
    // `columnDefinition` is the original column-definition from where you defined the table
    // `renderParams` holds similar looking-information but is the data provided by "react-virtualized"
    const columnDefinition = this.columns[renderParams.columnIndex];
    if (renderParams.rowIndex === 0) {
      return (
        <ClassNames>
          {({ css: makeClassName, cx }) => (
            <div
              style={{
                ...(renderParams.style || {}),
                ...(columnDefinition.headerStyle || {}),
              }}
              className={cx(
                makeClassName({
                  background: vars.colorAccent,
                  color: vars.colorSurface,
                }),
                columnDefinition.headerClassName,
                makeClassName({ textAlign: columnDefinition.align || 'left' })
              )}
            >
              {this.headerRenderer(columnDefinition)}
            </div>
          )}
        </ClassNames>
      );
    }
    return (
      <ClassNames>
        {({ css: makeClassName, cx }) => (
          <div
            className={cx(
              makeClassName({
                textAlign: columnDefinition.align || 'left',
                ...(renderParams.rowIndex === this.state.hoveredRowIndex &&
                renderParams.rowIndex !== 0 &&
                this.props.onRowClick
                  ? {
                      cursor: 'pointer',
                      background: vars.colorNeutral90,
                      transition: `background-color ${vars.transitionStandard}`,
                    }
                  : {}),
              }),
              columnDefinition.className,
              columnDefinition.cellClassName,
              columnDefinition.classNameGetter
                ? columnDefinition.classNameGetter({
                    rowIndex: this.getBodyRowIndex(renderParams.rowIndex),
                    columnKey: columnDefinition.key,
                    height: renderParams.height,
                    width: renderParams.width,
                  })
                : undefined,
              columnDefinition.cellClassNameGetter
                ? columnDefinition.cellClassNameGetter({
                    rowIndex: this.getBodyRowIndex(renderParams.rowIndex),
                    columnKey: columnDefinition.key,
                    height: renderParams.height,
                    width: renderParams.width,
                  })
                : undefined
            )}
            style={{
              ...(renderParams.style || {}),
              ...(columnDefinition.cellStyleGetter
                ? columnDefinition.cellStyleGetter({
                    rowIndex: this.getBodyRowIndex(renderParams.rowIndex),
                    columnKey: columnDefinition.key,
                    height: renderParams.height,
                    width: renderParams.width,
                  })
                : {}),
            }}
            data-test={`cell-${renderParams.rowIndex}-${columnDefinition.key}`}
            onClick={(event) => {
              if (columnDefinition.onClick) {
                columnDefinition.onClick({
                  event,
                  rowIndex: this.getBodyRowIndex(renderParams.rowIndex),
                  columnKey: columnDefinition.key,
                });
              } else if (this.props.onRowClick)
                this.props.onRowClick(
                  event,
                  this.getBodyRowIndex(renderParams.rowIndex)
                );
            }}
            onMouseEnter={
              this.props.onRowClick
                ? () => {
                    this.setState({
                      hoveredRowIndex: renderParams.rowIndex,
                    });
                  }
                : null
            }
            onMouseLeave={
              this.props.onRowClick
                ? () => {
                    this.setState({
                      hoveredRowIndex: undefined,
                    });
                  }
                : null
            }
          >
            <Cell>
              {renderParams.rowIndex === 0 ? (
                this.headerRenderer(columnDefinition)
              ) : (
                <Inset scale="m">
                  {this.props.itemRenderer({
                    ...renderParams,
                    rowIndex: this.getBodyRowIndex(renderParams.rowIndex),
                    columnKey: columnDefinition.key,
                  })}
                </Inset>
              )}
            </Cell>
          </div>
        )}
      </ClassNames>
    );
  };

  itemRenderer = (renderParams) => (
    <CellMeasurer
      cache={this.cellMeasurerCache}
      columnIndex={renderParams.columnIndex}
      key={renderParams.key}
      parent={renderParams.parent}
      rowIndex={renderParams.rowIndex}
    >
      {this.renderItemCell(renderParams)}
    </CellMeasurer>
  );

  render() {
    return (
      <React.Fragment>
        <Global
          styles={css`
            .ReactVirtualized__Grid {
              background: ${vars.colorSurface};

              /* Removes :focus ring from table */
              outline-width: 0;
            }
          `}
        />
        <ClassNames>
          {({ css: makeClassName, cx }) => (
            <div
              className={cx(
                makeClassName({
                  outline: `1px solid ${vars.colorNeutral90}`,
                }),
                this.props.tableClassName
              )}
              style={{
                ...(this.props.tableStyle || {}),
                width: this.state.width,
              }}
              {...filterDataAttributes(this.props)}
            >
              <MultiGrid
                ref={this.registerMultiGrid}
                styleTopLeftGrid={{ background: vars.colorNeutral90 }}
                styleBottomLeftGrid={{
                  boxShadow: '4px -2px 4px -4px rgba(0, 0, 0, 0.3)',
                }}
                deferredMeasurementCache={this.cellMeasurerCache}
                cellRangeRenderer={cellRangeRenderer}
                fixedRowCount={1}
                cellRenderer={this.itemRenderer}
                columnWidth={this.getColumnWidth(
                  this.cellMeasurerCache.columnWidth
                )}
                columnCount={this.props.columns.length}
                height={this.state.height}
                rowHeight={this.cellMeasurerCache.rowHeight}
                rowCount={this.props.rowCount + 1}
                onScroll={this.props.onScroll}
                scrollToRow={this.props.scrollToRow}
                width={this.state.width}
                // The three props below are only passed down in order to make the component rerender
                hoveredRowIndex={this.state.hoveredRowIndex}
                items={this.props.items}
                cols={this.props.columns}
                onSectionRendered={this.handleSectionRendered}
              />
            </div>
          )}
        </ClassNames>
      </React.Fragment>
    );
  }
}
