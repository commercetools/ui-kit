import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { RowExpandCollapseButton } from './cell.styles';
import convertNumericDimensionToPixelValue from './utils/convert-numeric-dimension-to-pixel-value';

const getClickableRowStyle = (props) => {
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

const getDisabledSelfContainmentStyles = (props) => {
  if (props.disableSelfContainment) {
    return css`
      position: unset;
      overflow-x: unset;
      overflow-y: unset;
    `;
  }
  return '';
};

const TableContainer = styled.div`
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

const TableGrid = styled.table`
  display: grid;
  /* stylelint-disable function-whitespace-after */
  grid-template-columns: ${(props) =>
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

const Row = styled.tr`
  display: contents;
  ${getClickableRowStyle}
  :hover, :focus-within {
    ${RowExpandCollapseButton} {
      opacity: 1;
    }
  }
`;

export { TableContainer, TableGrid, Header, Body, Row };
