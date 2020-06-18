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

const getAlignmentStyle = (props) => {
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
`;

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
    getAlignmentStyle(props),
    getTruncatedStyle(props),
    getOutlineStyles(),
    props.shouldIgnoreRowClick &&
      css`
        cursor: auto;
      `,
  ];
};

const getSortableHeaderStyles = (props) => css`
  width: 100%;
  display: flex;
  align-items: center;

  /* A sortable header has the two arrow svg icons
  * GIVEN column is sortable and is not focused
  * THEN AngleUpDown icon is shown (default behaviour)
  * AND AngleUp or AngleDown icon is not shown
  *
  * GIVEN column is sortable and foucsed
  * THEN AngleUpDown icon is hidden
  * AND AngleUp or AngleDown icon is shown
  */
  svg[id='nonActiveSortingIcon'],
  svg[id='activeSortingIcon'] {
    margin-left: ${vars.spacingS};
    flex-shrink: 0;
  }
  svg[id='nonActiveSortingIcon'] {
    display: ${props.isActive ? 'none' : 'inline-block'};
  }
  svg[id='activeSortingIcon'] {
    display: ${props.isActive ? 'inline-block' : 'none'};
  }

  :hover,
  :focus {
    svg[id='nonActiveSortingIcon'] {
      display: none;
    }
    svg[id='activeSortingIcon'] {
      display: inline-block;
      * {
        fill: ${vars.colorNeutral};
      }
    }
  }
`;
const BaseHeaderCell = styled.th`
  color: ${vars.colorSurface};
  background-color: ${vars.colorAccent};

  position: ${(props) =>
    props.disableHeaderStickiness ? 'relative' : 'sticky'};
  top: 0;
  z-index: 1;

  /* remove user-agent styles */
  padding: 0;
  font-weight: normal;

  /* right border that doesn't count towards the column width */
  box-shadow: inset -1px 0 ${vars.colorNeutral90};

  /* this ensures that, when dragging this header's column resizer
     it remains above the rest of the headers, preventing accidental hovers/flickering */
  :hover,
  :active {
    z-index: 2;

    & > * {
      overflow: hidden;
    }
  }
`;

const BaseCell = styled.td`
  position: relative;
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

const HeaderCellInner = styled.div`
  ${(props) => getPaddingStyle(props, true)}
  ${getCellInnerStyles}
  ${(props) => (props.shouldWrap ? '' : 'white-space: nowrap')}
`;

const CellInner = styled.div`
  ${(props) => getPaddingStyle(props, false)}
  ${getCellInnerStyles}
`;

const SortableHeaderInner = styled.button`
  ${(props) => getPaddingStyle(props, true)}
  ${getCellInnerStyles}
  ${getButtonStyle}
  ${getSortableHeaderStyles}
  ${(props) => (props.shouldWrap ? '' : 'white-space: nowrap')}
`;

const RowExpandCollapseButton = styled(SecondaryIconButton)`
  cursor: ${(props) => (props.isRowCollapsed ? 's-resize' : 'n-resize')};
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0;
`;

const HeaderCellInnerWrapper = styled.div`
  display: inline-block;
  flex: 1;
`;

export {
  BaseCell,
  BaseFooterCell,
  BaseHeaderCell,
  CellInner,
  HeaderCellInner,
  SortableHeaderInner,
  RowExpandCollapseButton,
  HeaderCellInnerWrapper,
};
