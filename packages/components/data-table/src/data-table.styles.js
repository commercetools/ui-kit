import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

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

const TableGrid = styled.table`
  position: relative;
  z-index: 0;
  display: grid;
  background-color: ${vars.colorSurface};
  /* stylelint-disable function-whitespace-after */
  grid-template-columns: ${(props) =>
    props.columns.map((column) => column.width || 'auto').join(' ')};
  /* stylelint-enable function-whitespace-after */

  ${(props) =>
    props.maxHeight
      ? `
    max-height: ${props.maxHeight}px;
    overflow: auto;
  `
      : ''}
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth}px;` : '')}
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
`;

const Footer = styled.tfoot`
  display: contents;
`;

export { TableGrid, Header, Body, Row, Footer };
