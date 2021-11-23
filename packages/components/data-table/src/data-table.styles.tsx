import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { RowExpandCollapseButton } from './cell.styles';
import convertNumericDimensionToPixelValue from './utils/convert-numeric-dimension-to-pixel-value';
import type { TDataTableProps } from './data-table';
import type { TDataRow } from './data-row';

type TGetClickableRowStyle = {
  isRowClickable?: TDataRow['onRowClick'];
};

const getClickableRowStyle = (props: TGetClickableRowStyle) => {
  if (props.isRowClickable) {
    return css`
      cursor: pointer;
      &:hover td {
        background: ${vars.backgroundColorForInputWhenHovered};
      }
    `;
  }
  return '';
};

type TGetDisabledSelfContainmentStyles = {
  disableSelfContainment: boolean;
};

const getDisabledSelfContainmentStyles = (
  props: TGetDisabledSelfContainmentStyles
) => {
  if (props.disableSelfContainment) {
    return css`
      position: unset;
      overflow-x: unset;
      overflow-y: unset;
    `;
  }
  return '';
};

type TTableContainer = {
  isBeingResized?: boolean;
  maxWidth?: string | number;
  disableSelfContainment: boolean;
};

const TableContainer = styled.div<TTableContainer>`
  position: relative;
  z-index: 0;
  overflow-x: auto;

  ${(props) =>
    props.maxWidth && !props.disableSelfContainment
      ? `max-width: ${convertNumericDimensionToPixelValue(props.maxWidth)};`
      : ''}

  ${(props) =>
    props.isBeingResized &&
    `
    * {
      user-select: none;
    }`}

  ${getDisabledSelfContainmentStyles}
`;

type TTableGrid = {
  resizedTotalWidth?: number;
  columns?: TDataTableProps['columns'];
  disableSelfContainment: boolean;
  maxHeight?: string | number;
};

const TableGrid = styled.table<TTableGrid>`
  display: grid;
  /* stylelint-disable function-whitespace-after */
  grid-template-columns: ${(props) =>
    props.columns &&
    props.columns.map((column) => column.width || 'auto').join(' ')};
  /* stylelint-enable function-whitespace-after */

  overflow-y: auto;

  ${(props) =>
    props.maxHeight && !props.disableSelfContainment
      ? `max-height: ${convertNumericDimensionToPixelValue(props.maxHeight)};`
      : ''}

  ${(props) =>
    props.resizedTotalWidth ? `max-width: ${props.resizedTotalWidth}px;` : ''}

  ${getDisabledSelfContainmentStyles}
`;

const Header = styled.thead`
  display: contents;
`;

const Body = styled.tbody`
  display: contents;
`;

const Row = styled.tr<TGetClickableRowStyle>`
  display: contents;
  ${getClickableRowStyle}
  :hover, :focus-within {
    ${RowExpandCollapseButton} {
      opacity: 1;
    }
  }
`;

export { TableContainer, TableGrid, Header, Body, Row };
