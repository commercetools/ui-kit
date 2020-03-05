import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getPaddingStyle = props => {
  if (props.isCondensed)
    return css`
      padding: ${vars.spacingXs} ${vars.spacingXs};
    `;
  return css`
    padding: ${vars.spacingS} ${vars.spacingM};
  `;
};

const getAlignmentStyle = props => {
  if (props.alignment === 'center') {
    return css`
      text-align: center;
    `;
  }
  if (props.alignment === 'right') {
    return css`
      text-align: right;
    `;
  }
  return css`
    text-align: left;
  `;
};

const getTruncatedStyle = props => {
  if (props.isTruncated) {
    return css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `;
  }
  return '';
};

const getButtonStyle = () => css`
  cursor: pointer;

  /* remove user-agent button styles */
  border: none;
  background: none;
  text-decoration: none;
  color: inherit;
  font: inherit;
  font-size: ${vars.fontSizeDefault};
  font-family: inherit;

  /* show visual feedback on tab navigation */
  :focus {
    outline: 2px solid ${vars.borderColorForInputWhenFocused};
    outline-offset: -1px;
  }
`;

const getBaseCellStyles = css`
  overflow: hidden;
`;

const getCellInnerStyles = props => {
  return [
    getPaddingStyle(props),
    getAlignmentStyle(props),
    getTruncatedStyle(props),
    props.shouldIgnoreRowClick &&
      css`
        cursor: auto;
      `,
  ];
};

const getSortableHeaderStyles = props => css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* A sortable header has the arrow svg icon as the last child */
  svg:last-of-type {
    visibility: ${props.isActive ? 'visible' : 'hidden'};
    margin-left: ${vars.spacingS};
  }
  :hover,
  :focus {
    svg:last-of-type {
      visibility: visible;
      * {
        fill: ${vars.colorNeutral};
      }
    }
  }
  :focus {
    outline-offset: -2px;
  }
`;

const BaseHeaderCell = styled.th`
  ${getBaseCellStyles}
  color: ${vars.colorSurface};
  background-color: ${vars.colorAccent};

  position: sticky;
  top: 0;
  z-index: 1;

  /* remove user-agent styles */
  padding: 0;
  font-weight: normal;

  /* adds borders between header cells */
  :not(:last-of-type) {
    border-right: 1px solid ${vars.colorNeutral90};
  }
`;

const BaseCell = styled.td`
  ${getBaseCellStyles}

  border-bottom: 1px solid ${vars.colorNeutral90};
  overflow: hidden;
`;

const CellInner = styled.div`
  ${getCellInnerStyles}
`;

const ButtonCellInner = styled.button`
  ${getCellInnerStyles}
  ${getButtonStyle}
`;

const SortableHeaderInner = styled(ButtonCellInner)`
  ${getSortableHeaderStyles}
`;

export {
  BaseCell,
  BaseHeaderCell,
  CellInner,
  ButtonCellInner,
  SortableHeaderInner,
};
