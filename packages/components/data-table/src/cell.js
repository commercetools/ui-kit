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
  calculateResize,
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

const HeaderCellWrapper = (props) => {
  const [colResizingState, setColResizingState] = React.useState({
    isResizing: false,
    initialColWidth: undefined,
    initialMousePosition: undefined,
  });
  const tableRef = props.tableRef;
  const headerRef = React.useRef(null);

  const onStartResizing = (e) => {
    setColResizingState({
      isResizing: true,
      initialColWidth: headerRef.current.clientWidth,
      initialMousePosition: e.clientX,
    });
    props.onColumnResizeStart();
  };

  const onDrag = (e) =>
    // sync resizing update rate with screen refresh rate
    requestAnimationFrame(() => {
      // calculate the new width
      const width = calculateResize(
        colResizingState.initialColWidth,
        colResizingState.initialMousePosition,
        e.clientX
      );

      const newColumnsSizes = setColumnWidth(
        props.columnSizes,
        /* the table always renders the column headers in the same order of the columns array
        and since we already had a ref to the header element, we can read its cellIndex :) */
        headerRef.current.cellIndex,
        width
      );

      tableRef.current.style.gridTemplateColumns = getGridTemplateColumnsStyle(
        newColumnsSizes
      );
    });

  const onDragEnd = () => {
    setColResizingState({
      isResizing: false,
      initialColWidth: undefined,
      initialMousePosition: undefined,
    });

    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  };

  if (colResizingState.isResizing) {
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
      {!props.disableResizing && (
        <Resizer
          onMouseDown={(e) => {
            return onStartResizing(e);
          }}
        />
      )}
    </BaseHeaderCell>
  );
};
HeaderCellWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  tableRef: PropTypes.object.isRequired,
  columnKey: PropTypes.string.isRequired,
  columnSizes: PropTypes.array.isRequired,
  disableResizing: PropTypes.bool,
  onColumnResizeStart: PropTypes.func.isRequired,
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
      tableRef={props.tableRef}
      columnKey={props.columnKey}
      columnSizes={props.columnSizes}
      disableResizing={props.disableResizing}
      onColumnResizeStart={props.onColumnResizeStart}
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
  disableHeaderStickiness: PropTypes.bool,
  // column resizing props
  disableResizing: PropTypes.bool,
  tableRef: PropTypes.object.isRequired,
  onColumnResizeStart: PropTypes.func.isRequired,
  columnSizes: PropTypes.array.isRequired,
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
    <BaseCell shouldClipContent={props.isTruncated || props.shouldClipContent}>
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
    </BaseCell>
  );
};
DataCell.displayName = 'DataCell';
DataCell.propTypes = {
  children: PropTypes.node.isRequired,
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
  isCondensed: PropTypes.bool,
  isTruncated: PropTypes.bool,
  shouldClipContent: PropTypes.bool,
  shouldIgnoreRowClick: PropTypes.bool,
  shouldRenderCollapseButton: PropTypes.bool.isRequired,
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
