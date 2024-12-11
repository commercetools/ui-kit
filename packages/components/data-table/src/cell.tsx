import { ReactNode } from 'react';
import {
  RightTriangleFilledIcon,
  RightTriangleLinearIcon,
} from '@commercetools-uikit/icons';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import { BaseCell, CellInner, RowExpandCollapseButton } from './cell.styles';

import Resizer from './column-resizer';

export type TDataCell = {
  children: ReactNode;
  isCondensed?: boolean;
  isTruncated?: boolean;
  onCellClick?: () => void;
  shouldIgnoreRowClick?: boolean;
  verticalCellAlignment?: 'top' | 'center' | 'bottom';
  horizontalCellAlignment?: 'left' | 'center' | 'right';
  shouldRenderBottomBorder: boolean;
  shouldRenderCollapseButton: boolean;
  shouldRenderResizingIndicator: boolean;
  handleRowCollapseClick?: () => void;
  isRowCollapsed?: boolean;
};

const DataCell = ({
  isTruncated = false,
  shouldRenderBottomBorder = true,
  ...props
}: TDataCell) => {
  if (props.shouldRenderCollapseButton) {
    warning(
      typeof props.handleRowCollapseClick === 'function',
      'DataTable: "handleRowCollapseClick" is required when shouldRenderCollapseButton is true.'
    );
    warning(
      typeof props.isRowCollapsed === 'boolean',
      'DataTable: "isRowCollapsed" is required when shouldRenderCollapseButton is true.'
    );
  }

  const Icon = props.isRowCollapsed
    ? RightTriangleFilledIcon
    : RightTriangleLinearIcon;

  return (
    <BaseCell
      onClick={props.onCellClick}
      shouldIgnoreRowClick={props.shouldIgnoreRowClick}
      shouldClipContent={isTruncated && !props.shouldRenderResizingIndicator}
      shouldRenderBottomBorder={shouldRenderBottomBorder}
    >
      <CellInner
        isCondensed={props.isCondensed}
        isTruncated={isTruncated}
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
            if (props.handleRowCollapseClick) props.handleRowCollapseClick();
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

export default DataCell;
