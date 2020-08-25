import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  RightTriangleFilledIcon,
  RightTriangleLinearIcon,
} from '@commercetools-uikit/icons';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { BaseCell, CellInner, RowExpandCollapseButton } from './cell.styles';

import Resizer from './column-resizer';

const DataCell = (props) => {
  const Icon = props.isRowCollapsed
    ? RightTriangleFilledIcon
    : RightTriangleLinearIcon;
  return (
    <BaseCell
      onClick={props.onCellClick}
      shouldIgnoreRowClick={props.shouldIgnoreRowClick}
      shouldClipContent={
        props.isTruncated && !props.shouldRenderResizingIndicator
      }
      shouldRenderBottomBorder={props.shouldRenderBottomBorder}
    >
      <CellInner
        isCondensed={props.isCondensed}
        isTruncated={props.isTruncated}
        verticalCellAlignment={props.verticalCellAlignment}
        horizontalCellAlignment={props.horizontalCellAlignment}
        {...filterDataAttributes(props)}
      >
        {props.children}
      </CellInner>
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
  onCellClick: PropTypes.func,
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
  shouldRenderBottomBorder: true,
};

export default DataCell;
