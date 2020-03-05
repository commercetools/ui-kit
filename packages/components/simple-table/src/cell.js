import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import requiredIf from 'react-required-if';
import { AngleDownIcon, AngleUpIcon } from '@commercetools-uikit/icons';
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
  onSortChange: requiredIf(PropTypes.func, props => props.isSortable),
  sortDirection: PropTypes.oneOf(['desc', 'asc']),
};
HeaderCell.defaultProps = {
  sortDirection: 'desc',
};

const DataCell = props => {
  const { shouldIgnoreRowClick, onClick } = props;
  const onClickHandler = React.useCallback(
    event => {
      if (shouldIgnoreRowClick) event.stopPropagation();
      if (onClick) return onClick(event);
      return null;
    },
    [onClick, shouldIgnoreRowClick]
  );

  if (onClick) {
    return (
      <BaseCell>
        <ButtonCellInner {...props} onClick={onClickHandler} />
      </BaseCell>
    );
  }

  return (
    <BaseCell>
      <CellInner
        {...props}
        onClick={props.shouldIgnoreRowClick ? onClickHandler : undefined}
      />
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
