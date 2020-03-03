import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getCellCursorStyle = (isCellClickable, shouldIgnoreRowClick) => {
  if (isCellClickable) return 'pointer';
  if (shouldIgnoreRowClick) return 'auto';
  return 'unset';
};

const getCellPadding = (isCondensed, noPadding) => {
  if (noPadding) return 0;
  if (isCondensed) return `${vars.spacingXs} ${vars.spacingXs}`;
  return `${vars.spacingS} ${vars.spacingM}`;
};

const getCellAlignment = props => {
  if (props.alignment === 'center') {
    return css`
      justify-content: center;
      text-align: center;
    `;
  }
  if (props.alignment === 'right') {
    return css`
      justify-content: flex-end;
      text-align: right;
    `;
  }
  return css`
    justify-content: flex-start;
    text-align: left;
  `;
};

const getCellStyles = props => css`
  display: flex;
  align-items: center;
  overflow: ${props.isTruncated ? 'hidden' : 'unset'};

  padding: ${getCellPadding(props.isCondensed, props.noPadding)};

  cursor: ${getCellCursorStyle(props.isClickable, props.shouldIgnoreRowClick)};
`;

const BaseHeaderCell = styled.th`
  ${getCellStyles}
  ${getCellAlignment}
  color: ${vars.colorSurface};
  background-color: ${vars.colorAccent};
  font-weight: normal;

  /* adds borders between header cells */
  :not(:last-child) {
    border-right: 1px solid ${vars.colorNeutral90};
  }
`;

const BaseCell = styled.td`
  ${getCellStyles}
  ${getCellAlignment}

  border-bottom: 1px solid ${vars.colorNeutral90};

  :first-child {
    border-left: 1px solid ${vars.colorNeutral90};
  }
  :last-child {
    border-right: 1px solid ${vars.colorNeutral90};
  }
`;

export {
  getCellStyles,
  getCellPadding,
  getCellAlignment,
  getCellCursorStyle,
  BaseCell,
  BaseHeaderCell,
};
