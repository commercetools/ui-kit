import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  RightTriangleFilledIcon,
  RightTriangleLinearIcon,
} from '@commercetools-uikit/icons';
import { BaseCell, CellInner, RowExpandCollapseButton } from './cell.styles';

import Resizer from './column-resizer';

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
    <BaseCell
      shouldClipContent={
        props.isTruncated && !props.shouldRenderResizingIndicator
      }
      shouldRenderBottomBorder={props.shouldRenderBottomBorder}
    >
      <CellInner
        {...props}
        onClick={props.shouldIgnoreRowClick ? onClickHandler : undefined}
      />
      {props.shouldRenderCollapseButton && (
        <RowExpandCollapseButton
          label="Expand/Collapse Row"
          onClick={(event) => {
            props.handleRowCollapseClick();
            event.stopPropagation();
          }}
          isRowCollapsed={props.isRowCollapsed}
        >
          <Icon size="small" />
        </RowExpandCollapseButton>
      )}
      {props.shouldRenderResizingIndicator && <Resizer isOnDataCell />}
    </BaseCell>
  );
};
DataCell.displayName = 'DataCell';
DataCell.propTypes = {
  children: PropTypes.node.isRequired,
  isCondensed: PropTypes.bool,
  isTruncated: PropTypes.bool,
  shouldIgnoreRowClick: PropTypes.bool,
  verticalCellAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
  horizontalCellAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  shouldRenderBottomBorder: PropTypes.bool.isRequired,
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
  shouldRenderBottomBorder: true,
};

export default DataCell;
