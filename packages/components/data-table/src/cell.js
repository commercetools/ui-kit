import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  AngleUpIcon,
  AngleDownIcon,
  AngleUpDownIcon,
  RightTriangleFilledIcon,
  RightTriangleLinearIcon,
} from '@commercetools-uikit/icons';
import {
  setColumnWidth,
  getGridTemplateColumnsStyle,
} from './column-size-utils';
import {
  BaseCell,
  BaseFooterCell,
  BaseHeaderCell,
  CellInner,
  HeaderCellInner,
  SortableHeaderInner,
  RowExpandCollapseButton,
  HeaderCellInnerWrapper,
} from './cell.styles';
import Resizer from './column-resizer';

import ColumnResizingContext from './column-resizing-context';

const HeaderCellWrapper = (props) => {
  const columnResizingReducer = React.useContext(ColumnResizingContext);
  const headerRef = React.useRef(null);

  const onStartResizing = (event) => {
    columnResizingReducer.startResizing(headerRef, event);
  };

  const onDrag = (event) =>
    // throttle and sync resizing update rate with screen refresh rate
    requestAnimationFrame(() => {
      // calculate the new width
      const width = columnResizingReducer.getCurrentWidth(event.clientX);

      const newColumnsSizes = setColumnWidth(
        columnResizingReducer.sizes,
        /* the table always renders the column headers in the same order of the columns array
        and since we already had a ref to the header element, we can read its cellIndex :) */
        headerRef.current.cellIndex,
        width
      );

      columnResizingReducer.tableRef.current.style.gridTemplateColumns = getGridTemplateColumnsStyle(
        newColumnsSizes
      );
    });

  const onDragEnd = () => {
    columnResizingReducer.finishResizing();

    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  };

  if (
    columnResizingReducer.isResizing &&
    columnResizingReducer.columnBeingResized === headerRef.current.cellIndex
  ) {
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);
  }

  return (
    <BaseHeaderCell
      ref={headerRef}
      data-testid={`header-${props.columnKey}`}
      disableHeaderStickiness={props.disableHeaderStickiness}
    >
      {props.children}
      {!props.disableResizing && <Resizer onMouseDown={onStartResizing} />}
    </BaseHeaderCell>
  );
};
HeaderCellWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  columnKey: PropTypes.string.isRequired,
  disableResizing: PropTypes.bool,
  disableHeaderStickiness: PropTypes.bool,
};
HeaderCellWrapper.displayName = 'HeaderCellWrapper';

const HeaderCell = (props) => {
  // inner cell component for non-sortable columns
  let HeaderCellInnerComponent = (
    <HeaderCellInner
      shouldWrap={props.shouldWrap}
      isCondensed={props.isCondensed}
      alignment={props.alignment}
    >
      {props.children}
    </HeaderCellInner>
  );

  if (props.isSortable) {
    const isActive = props.sortedBy === props.columnKey;
    const nextSortDirection =
      !isActive || props.sortDirection === 'desc' ? 'asc' : 'desc';
    const Icon = props.sortDirection === 'desc' ? AngleDownIcon : AngleUpIcon;

    // inner cell component for sortable columns
    HeaderCellInnerComponent = (
      <SortableHeaderInner
        label={props.sortDirection}
        onClick={() => props.onClick(props.columnKey, nextSortDirection)}
        isActive={isActive}
        shouldWrap={props.shouldWrap}
        isCondensed={props.isCondensed}
        alignment={props.alignment}
      >
        <HeaderCellInnerWrapper>{props.children}</HeaderCellInnerWrapper>
        {/** conditional rendering of one of the icons at a time is handled by CSS. Checkout cell.styles */}
        <AngleUpDownIcon
          size="medium"
          color="surface"
          id="nonActiveSortingIcon"
        />
        <Icon size="medium" color="surface" id="activeSortingIcon" />
      </SortableHeaderInner>
    );
  }
  return (
    <HeaderCellWrapper
      columnKey={props.columnKey}
      disableResizing={props.disableResizing}
      disableHeaderStickiness={props.disableHeaderStickiness}
    >
      {HeaderCellInnerComponent}
    </HeaderCellWrapper>
  );
};
HeaderCell.displayName = 'HeaderCell';
HeaderCell.propTypes = {
  onClick: requiredIf(PropTypes.func, (props) => props.isSortable),
  sortedBy: PropTypes.string,
  alignment: PropTypes.string,
  children: PropTypes.node.isRequired,
  columnKey: PropTypes.string.isRequired,
  shouldWrap: PropTypes.bool,
  isSortable: PropTypes.bool,
  isCondensed: PropTypes.bool,
  sortDirection: PropTypes.oneOf(['desc', 'asc']),
  disableResizing: PropTypes.bool,
  disableHeaderStickiness: PropTypes.bool,
};
HeaderCell.defaultProps = {
  sortDirection: 'desc',
};

const DataCell = (props) => {
  const { shouldIgnoreRowClick } = props;
  const onClickHandler = React.useCallback(
    (event) => {
      if (shouldIgnoreRowClick) event.stopPropagation();
      return null;
    },
    [shouldIgnoreRowClick]
  );

  const Icon = props.isRowCollapsed
    ? RightTriangleFilledIcon
    : RightTriangleLinearIcon;
  return (
    <BaseCell>
      <CellInner
        {...props}
        onClick={props.shouldIgnoreRowClick ? onClickHandler : undefined}
      />
      {props.shouldRenderCollapseButton && (
        <RowExpandCollapseButton
          icon={<Icon size="small" />}
          isRowCollapsed={props.isRowCollapsed}
          label="Expand/Collapse Row"
          onClick={(event) => {
            props.handleRowCollapseClick();
            event.stopPropagation();
          }}
        />
      )}
      {props.shouldRenderResizingIndicator && <Resizer isOnDataCell />}
    </BaseCell>
  );
};
DataCell.displayName = 'DataCell';
DataCell.propTypes = {
  children: PropTypes.node.isRequired,
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
  isCondensed: PropTypes.bool,
  isTruncated: PropTypes.bool,
  shouldIgnoreRowClick: PropTypes.bool,
  shouldRenderCollapseButton: PropTypes.bool.isRequired,
  shouldRenderResizingIndicator: PropTypes.bool.isRequired,
  handleRowCollapseClick: requiredIf(
    PropTypes.func,
    (props) => props.shouldRenderCollapseButton
  ),
  isRowCollapsed: requiredIf(
    PropTypes.bool,
    (props) => props.shouldRenderCollapseButton
  ),
};
DataCell.defaultProps = {
  isTruncated: false,
  shouldIgnoreRowClick: false,
};

const FooterCell = (props) => (
  <BaseFooterCell numberOfColumns={props.numberOfColumns}>
    <CellInner alignment={props.alignment} isCondensed={props.isCondensed}>
      {props.children}
    </CellInner>
  </BaseFooterCell>
);
FooterCell.displayName = 'FooterCell';
FooterCell.propTypes = {
  children: PropTypes.node.isRequired,
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
  isCondensed: PropTypes.bool,
  numberOfColumns: PropTypes.number.isRequired,
};

export { HeaderCell, DataCell, FooterCell };
