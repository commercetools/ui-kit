import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  AngleUpIcon,
  AngleDownIcon,
  AngleUpDownIcon,
} from '@commercetools-uikit/icons';

import {
  BaseCell,
  BaseFooterCell,
  BaseHeaderCell,
  CellInner,
  HeaderCellInner,
  SortableHeaderInner,
} from './cell.styles';

const HeaderCell = (props) => {
  if (props.isSortable) {
    const isActive = props.sortedBy === props.columnKey;
    const nextSortDirection =
      !isActive || props.sortDirection === 'desc' ? 'asc' : 'desc';
    const Icon = props.sortDirection === 'desc' ? AngleDownIcon : AngleUpIcon;

    return (
      <BaseHeaderCell disableHeaderStickiness={props.disableHeaderStickiness}>
        <SortableHeaderInner
          label={props.sortDirection}
          onClick={() => props.onClick(props.columnKey, nextSortDirection)}
          isActive={isActive}
          shouldWrap={props.shouldWrap}
          isCondensed={props.isCondensed}
        >
          {props.children}
          {/** conditional rendering of one of the icons at a time is handled by CSS. Checkout cell.styles */}
          <AngleUpDownIcon size="medium" color="surface" />
          <Icon size="medium" color="surface" />
        </SortableHeaderInner>
      </BaseHeaderCell>
    );
  }
  return (
    <BaseHeaderCell disableHeaderStickiness={props.disableHeaderStickiness}>
      <HeaderCellInner
        shouldWrap={props.shouldWrap}
        isCondensed={props.isCondensed}
      >
        {props.children}
      </HeaderCellInner>
    </BaseHeaderCell>
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

  return (
    <BaseCell isTruncated={props.isTruncated}>
      <CellInner
        {...props}
        onClick={props.shouldIgnoreRowClick ? onClickHandler : undefined}
      />
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
