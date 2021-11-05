import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import type { TDataCell } from './cell';

const getPaddingStyle = (props: Pick<TDataCell, 'isCondensed'>) => {
  if (props.isCondensed)
    return css`
      padding: ${vars.spacingS};
    `;
  return css`
    padding: ${vars.spacingM};
  `;
};

const getHorizontalAlignmentStyle = (
  props: Pick<TDataCell, 'horizontalCellAlignment'>
) => {
  if (props.horizontalCellAlignment === 'center') {
    return css`
      text-align: center;
      justify-self: center;
    `;
  }
  if (props.horizontalCellAlignment === 'right') {
    return css`
      text-align: right;
      justify-self: flex-end;
    `;
  }
  return css`
    text-align: left;
    justify-self: flex-start;
  `;
};

const getVerticalAlignmentStyle = (
  props: Pick<TDataCell, 'verticalCellAlignment'>
) => {
  if (props.verticalCellAlignment === 'center') {
    return css`
      align-self: center;
    `;
  }
  if (props.verticalCellAlignment === 'bottom') {
    return css`
      align-self: flex-end;
    `;
  }
  return css`
    align-self: flex-start;
  `;
};

const getTruncatedStyle = (props: Pick<TDataCell, 'isTruncated'>) => {
  if (props.isTruncated) {
    return css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `;
  }
  return '';
};

/* the :focus-within state doesn't enable the outline styles,
  so we have to set them manually. */
const outlineStyles = css`
  /* to avoid getting cut by overflow:hidden */
  outline-offset: -3px;

  :not(:focus):focus-within {
    outline-style: auto;

    /* try using the default user-agent color */
    /* stylelint-disable declaration-block-no-duplicate-properties */
    outline-color: Highlight;
    outline-color: activeborder;
    outline-color: -moz-mac-focusring;
    outline-color: -webkit-focus-ring-color;
    /* stylelint-enable declaration-block-no-duplicate-properties */
  }
`;

const getCellInnerStyles = (props: TCellInner) => {
  return [
    getVerticalAlignmentStyle(props),
    getHorizontalAlignmentStyle(props),
    getTruncatedStyle(props),
    outlineStyles,
  ];
};

/**
 * The `shouldClipContent` overflow rule should only be enabled upon manual column resizing,
 * otherwise it will change the way css-grid automatically allocates space for the cells of the table,
 * preferring to clip the cells instead and adding horizontal scrollbar to the table container
 */
type TCellInner = {
  shouldClipContent?: boolean;
} & Pick<
  TDataCell,
  | 'verticalCellAlignment'
  | 'horizontalCellAlignment'
  | 'isTruncated'
  | 'isCondensed'
>;

const CellInner = styled.div<TCellInner>`
  box-sizing: border-box;
  flex: 1;

  ${getPaddingStyle}
  ${getCellInnerStyles}

  ${(props) =>
    props.shouldClipContent
      ? css`
          overflow: hidden;
        `
      : ''}
`;

type TBaseCell = {
  shouldClipContent?: boolean;
} & Pick<TDataCell, 'shouldRenderBottomBorder' | 'shouldIgnoreRowClick'>;

const BaseCell = styled.td<TBaseCell>`
  position: relative;
  display: flex;
  background-color: ${vars.colorSurface};
  border-bottom: ${(props) =>
    props.shouldRenderBottomBorder
      ? `1px solid ${vars.colorNeutral90};`
      : 'none'};
  ${(props) =>
    props.shouldClipContent
      ? css`
          overflow: hidden;
        `
      : ''}
  ${(props) =>
    props.shouldIgnoreRowClick
      ? css`
          cursor: auto;
        `
      : ''}
`;

type TBaseFooterCell = {
  disableFooterStickiness?: boolean;
  numberOfColumns?: number;
};

const BaseFooterCell = styled.td<TBaseFooterCell>`
  position: ${(props) =>
    props.disableFooterStickiness ? 'relative' : 'sticky'};
  left: 0;
  bottom: 0;
  grid-column: 1 / ${(props) => props.numberOfColumns};
  background-color: ${vars.colorSurface};
  border-bottom: 1px solid ${vars.colorNeutral90};
  border-top: 1px solid ${vars.colorNeutral90};

  /* makes the footer top border overlap the border of the last data row: */
  margin-top: -1px;
`;

const RowExpandCollapseButton = styled(AccessibleButton)<
  Pick<TDataCell, 'isRowCollapsed'>
>`
  cursor: ${(props) => (props.isRowCollapsed ? css`s-resize` : css`n-resize`)};
  position: absolute;
  height: 16px;
  width: 16px;
  bottom: 0;
  right: 0;
  opacity: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export {
  getPaddingStyle,
  getVerticalAlignmentStyle,
  getHorizontalAlignmentStyle,
  getCellInnerStyles,
  BaseCell,
  CellInner,
  BaseFooterCell,
  RowExpandCollapseButton,
};
