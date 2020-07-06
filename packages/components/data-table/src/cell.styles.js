import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';

const getPaddingStyle = (props, isHeader) => {
  if (props.isCondensed)
    return css`
      padding: ${vars.spacingS};
    `;
  if (isHeader) {
    return css`
      padding: ${vars.spacingS} ${vars.spacingM};
    `;
  }
  return css`
    padding: ${vars.spacingM};
  `;
};

const getHorizontalAlignmentStyle = (props) => {
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

const getVerticalAlignmentStyle = (props) => {
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

const getTruncatedStyle = (props) => {
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
const getOutlineStyles = () => css`
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

const getCellInnerStyles = (props) => {
  return [
    getVerticalAlignmentStyle(props),
    getHorizontalAlignmentStyle(props),
    getTruncatedStyle(props),
    getOutlineStyles(),
    props.shouldIgnoreRowClick &&
      css`
        cursor: auto;
      `,
  ];
};

const CellInner = styled.div`
  box-sizing: border-box;
  flex: 1;

  ${(props) => getPaddingStyle(props, false)}
  ${getCellInnerStyles}
  ${(props) => (props.shouldClipContent ? 'overflow: hidden;' : '')}
`;

const BaseCell = styled.td`
  position: relative;
  display: flex;
  background-color: ${vars.colorSurface};
  border-bottom: 1px solid ${vars.colorNeutral90};
  ${(props) => (props.shouldClipContent ? 'overflow: hidden;' : '')}
`;

const BaseFooterCell = styled.td`
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

const RowExpandCollapseButton = styled(SecondaryIconButton)`
  cursor: ${(props) => (props.isRowCollapsed ? 's-resize' : 'n-resize')};
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0;
`;

export {
  getPaddingStyle,
  getCellInnerStyles,
  BaseCell,
  CellInner,
  BaseFooterCell,
  RowExpandCollapseButton,
};
