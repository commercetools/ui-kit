import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { RowExpandCollapseButton } from './cell.styles';
import convertNumericDimensionToPixelValue from './utils/convert-numeric-dimension-to-pixel-value';

const getClickableRowStyle = (props) => {
  if (props.onClick) {
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
  overflow-x: auto;

  ${(props) =>
    props.maxWidth && !props.disableSelfContainment
      ? `max-width: ${convertNumericDimensionToPixelValue(props.maxWidth)};`
      : ''}

  ${getDisabledSelfContainmentStyles}
`;

const TableGrid = styled.table`
  position: relative;
  z-index: 0;
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
