import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  AngleUpIcon,
  AngleDownIcon,
  AngleUpDownIcon,
} from '@commercetools-uikit/icons';
import {
  BaseHeaderCell,
  HeaderCellInner,
  HeaderIconWrapper,
  HeaderLabelWrapper,
} from './header-cell.styles';
import Resizer from './column-resizer';
import ColumnResizingContext from './column-resizing-context';

const HeaderCellWrapper = (props) => {
  const columnResizingReducer = React.useContext(ColumnResizingContext);
  const headerRef = React.useRef(null);

  const onStartResizing = (event) => {
    columnResizingReducer.startResizing(headerRef, event);
  };

  const onDrag = (event) =>
    columnResizingReducer.onDragResizing(event, headerRef.current.cellIndex);

  const onDragEnd = () => {
    const finalSizes = columnResizingReducer.finishResizing();

    if (props.onColumnResized) {
      props.onColumnResized(finalSizes);
    }

    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  };

  if (
    columnResizingReducer.getIsColumnBeingResized(headerRef.current?.cellIndex)
  ) {
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);
  }

  return (
    <BaseHeaderCell
      ref={headerRef}
      data-testid={`header-${props.columnKey}`}
      shouldClipContent={columnResizingReducer.getHasTableBeenResized()}
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
  onColumnResized: PropTypes.func,
  disableHeaderStickiness: PropTypes.bool,
};
HeaderCellWrapper.displayName = 'HeaderCellWrapper';

const HeaderCell = (props) => {
  let sortableHeaderProps = {};
  let SortingIcon;

  if (props.isSortable) {
    const isActive = props.sortedBy === props.columnKey;
    const nextSortDirection =
      !isActive || props.sortDirection === 'desc' ? 'asc' : 'desc';
    SortingIcon = props.sortDirection === 'desc' ? AngleDownIcon : AngleUpIcon;

    sortableHeaderProps = {
      as: 'button',
      label: props.sortDirection,
      onClick: () => props.onClick(props.columnKey, nextSortDirection),
      isActive,
      isSortable: true,
    };
  }

  return (
    <HeaderCellWrapper
      columnKey={props.columnKey}
      onColumnResized={props.onColumnResized}
      disableResizing={props.disableResizing}
      disableHeaderStickiness={props.disableHeaderStickiness}
    >
      <HeaderCellInner
        shouldWrap={props.shouldWrap}
        isCondensed={props.isCondensed}
        horizontalCellAlignment={props.horizontalCellAlignment}
        {...sortableHeaderProps}
      >
        {props.iconComponent && (
          <HeaderIconWrapper>{props.iconComponent}</HeaderIconWrapper>
        )}
        <HeaderLabelWrapper>{props.children}</HeaderLabelWrapper>
        {props.isSortable && (
          <>
            {/** conditional rendering of one of the icons at a time is handled by CSS. Checkout cell.styles */}
            <AngleUpDownIcon
              size="medium"
              color="surface"
              id="nonActiveSortingIcon"
            />
            <SortingIcon size="medium" color="surface" id="activeSortingIcon" />
          </>
        )}
      </HeaderCellInner>
    </HeaderCellWrapper>
  );
};
HeaderCell.displayName = 'HeaderCell';
HeaderCell.propTypes = {
  onClick: requiredIf(PropTypes.func, (props) => props.isSortable),
  sortedBy: PropTypes.string,
  children: PropTypes.node.isRequired,
  columnKey: PropTypes.string.isRequired,
  shouldWrap: PropTypes.bool,
  isSortable: PropTypes.bool,
  isCondensed: PropTypes.bool,
  sortDirection: PropTypes.oneOf(['desc', 'asc']),
  disableResizing: PropTypes.bool,
  onColumnResized: PropTypes.func,
  disableHeaderStickiness: PropTypes.bool.isRequired,
  horizontalCellAlignment: PropTypes.string.isRequired,
  iconComponent: PropTypes.node,
};
HeaderCell.defaultProps = {
  sortDirection: 'desc',
  disableHeaderStickiness: false,
  horizontalCellAlignment: 'left',
};

export default HeaderCell;
