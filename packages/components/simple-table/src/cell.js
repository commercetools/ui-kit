import React from 'react';
import PropTypes from 'prop-types';
import { AngleDownIcon, AngleUpIcon } from '@commercetools-uikit/icons';
import omit from 'lodash/omit';
import {
  BaseCell,
  BaseHeaderCell,
  CellInner,
  ButtonCellInner,
  SortableHeaderInner,
} from './cell.styles';

const HeaderCell = props => {
  if (props.isSortable) {
    const isActive = props.sortedBy === props.columnKey;

    const Icon =
      isActive && props.sortDirection === 'desc' ? AngleDownIcon : AngleUpIcon;
    return (
      <BaseHeaderCell>
        <SortableHeaderInner
          {...omit(props, 'onSortChange')}
          onClick={() => props.onSortChange(props.columnKey)}
          isActive={isActive}
          label={props.sortDirection}
        >
          {props.children}
          <Icon size="medium" color="surface" />
        </SortableHeaderInner>
      </BaseHeaderCell>
    );
  }
  return (
    <BaseHeaderCell>
      <CellInner {...omit(props, 'onSortChange')} />
    </BaseHeaderCell>
  );
};
HeaderCell.displayName = 'HeaderCell';
HeaderCell.propTypes = {
  sortedBy: PropTypes.string,
  children: PropTypes.node.isRequired,
  columnKey: PropTypes.string.isRequired,
  isSortable: PropTypes.bool,
  isCondensed: PropTypes.bool,
  onSortChange: PropTypes.func.isRequired,
  sortDirection: PropTypes.oneOf(['desc', 'asc']),
};
HeaderCell.defaultProps = {
  sortDirection: 'desc',
};

const DataCell = props => {
  const onClick = event => {
    if (props.shouldIgnoreRowClick) event.stopPropagation();
    return props.onClick && props.onClick(event);
  };

  if (props.onClick) {
    return (
      <BaseCell>
        <ButtonCellInner {...props} onClick={onClick} />
      </BaseCell>
    );
  }

  return (
    <BaseCell>
      <CellInner {...props} onClick={onClick} />
    </BaseCell>
  );
};
DataCell.displayName = 'DataCell';
DataCell.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  isTruncated: PropTypes.bool,
  shouldIgnoreRowClick: PropTypes.bool,
};
DataCell.defaultProps = {
  isTruncated: false,
  shouldIgnoreRowClick: false,
};

export { HeaderCell, DataCell };
