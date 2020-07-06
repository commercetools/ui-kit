import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { getPaddingStyle, getCellInnerStyles } from './cell.styles';

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

const HeaderCellInner = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  ${(props) => getPaddingStyle(props, true)}
  ${getCellInnerStyles}
  ${(props) => (props.isSortable ? getSortableHeaderStyles(props) : '')};
  ${(props) => (props.as === 'button' ? getButtonStyle(props) : '')};
  ${(props) => (props.shouldWrap ? '' : 'white-space: nowrap')}
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
  }

  ${HeaderCellInner} {
    ${(props) => (props.shouldClipContent ? 'overflow: hidden;' : '')}
  }
`;

const HeaderLabelWrapper = styled.div`
  flex: 1;
`;

export { HeaderCellInner, BaseHeaderCell, HeaderLabelWrapper };
