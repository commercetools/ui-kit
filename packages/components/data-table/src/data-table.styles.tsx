import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { RowExpandCollapseButton } from './cell.styles';
import convertNumericDimensionToPixelValue from './utils/convert-numeric-dimension-to-pixel-value';
import type { TDataTableProps } from './data-table';

type TGetClickableRowStyleProps = {
  isRowClickable: boolean;
};

const getClickableRowStyle = (props: TGetClickableRowStyleProps) => {
  if (props.isRowClickable) {
    return css`
      cursor: pointer;
      &:hover td {
        background: ${designTokens.backgroundColorForTableCellWhenHovered};
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
  maxHeight?: string | number;
  disableSelfContainment: boolean;
};

const TableContainer = styled.div<TTableContainer>`
  position: relative;
  z-index: 0;
  box-shadow: ${designTokens.boxShadowForTable};
  border: 1px solid ${designTokens.colorNeutral95};
  border-radius: ${designTokens.borderRadius4};

  ${(props) =>
    // this is needed in order to have a sticky header
    props.maxHeight ? `overflow-x: auto;` : ''}

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

  ${(props) =>
    // this is needed in order to have a sticky header
    props.maxHeight ? `overflow-y: auto;` : ''}

  ${(props) =>
    props.maxHeight && !props.disableSelfContainment
      ? `max-height: ${convertNumericDimensionToPixelValue(props.maxHeight)};`
      : ''}

  ${(props) =>
    props.resizedTotalWidth ? `max-width: ${props.resizedTotalWidth}px;` : ''}

  ${getDisabledSelfContainmentStyles}
`;

const TableHeader = styled.thead`
  display: contents;
`;

const TableBody = styled.tbody`
  display: contents;
`;

const TableRow = styled.tr<TGetClickableRowStyleProps>`
  display: contents;
  ${getClickableRowStyle}
  :hover, :focus-within {
    ${RowExpandCollapseButton} {
      opacity: 1;
    }
  }
`;

export { TableContainer, TableGrid, TableHeader, TableBody, TableRow };
