// TODO: @redesign cleanup
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getCellInnerStyles } from './cell.styles';
import { designTokens } from '@commercetools-uikit/design-system';
import type { THeaderCell } from './header-cell';

const getButtonStyle = () => css`
  cursor: pointer;

  /* remove user-agent button styles */
  border: none;
  background: none;
  text-decoration: none;
  color: inherit;
  font: inherit;
  font-size: ${designTokens.fontSizeForTable};
  font-family: inherit;
`;

/* A sortable header has the two arrow svg icons
 * GIVEN column is sortable and is not focused
 * THEN AngleUpDown icon is shown (default behaviour)
 * AND AngleUp or AngleDown icon is not shown
 *
 * GIVEN column is sortable and foucsed
 * THEN AngleUpDown icon is hidden
 * AND AngleUp or AngleDown icon is shown
 */
type TGetSortableHeaderStyles = {
  isActive?: boolean;
};

const getSortableHeaderStyles = (props: TGetSortableHeaderStyles) => css`
  width: 100%;
  display: flex;
  align-items: center;

  svg[data-icon-state='inactive'],
  svg[data-icon-state='active'] {
    margin-left: ${designTokens.spacing20};
    flex-shrink: 0;
  }
  svg[data-icon-state='inactive'] {
    display: ${props.isActive ? 'none' : 'inline-block'};
  }
  svg[data-icon-state='active'] {
    display: ${props.isActive ? 'inline-block' : 'none'};
  }
  /* for cases where svgs have a predefined fill */
  > svg * {
    fill: ${designTokens.fontColorForTableHeader} !important;
  }

  :hover,
  :focus {
    svg[data-icon-state='inactive'] {
      display: none;
    }
    svg[data-icon-state='active'] {
      display: inline-block;
    }
  }
`;

type THeaderCellInner = Pick<
  THeaderCell,
  'shouldWrap' | 'isCondensed' | 'isSortable' | 'horizontalCellAlignment'
> &
  TGetSortableHeaderStyles;

const HeaderCellInner = styled.div<THeaderCellInner>`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0
    ${(props) =>
      props.isCondensed
        ? designTokens.paddingForTableHeaderAsCondensed
        : designTokens.paddingForTableHeader};

  ${getCellInnerStyles}
  ${(props) => (props.isSortable ? getSortableHeaderStyles(props) : '')};
  ${(props) => (props.as === 'button' ? getButtonStyle() : '')};
  ${(props) => (props.shouldWrap ? '' : 'white-space: nowrap')}
`;

type TBaseHeaderCell = {
  disableHeaderStickiness?: boolean;
  shouldClipContent?: boolean;
  isNewTheme?: boolean;
};
const BaseHeaderCell = styled.th<TBaseHeaderCell>`
  color: ${designTokens.fontColorForTableHeader};
  background-color: ${designTokens.backgroundColorForTableHeader};

  position: ${(props) =>
    props.disableHeaderStickiness ? 'relative' : 'sticky'};
  top: 0;
  z-index: 1;
  line-height: ${designTokens.lineHeightForTableHeader};

  /* remove user-agent styles */
  padding: 0;
  font-weight: ${designTokens.fontWeightForTableHeader};
  font-size: ${designTokens.fontSizeForTable};

  /* right border that doesn't count towards the column width */
  box-shadow: inset -1px 0 ${designTokens.borderColorForTableHeader};

  /* this ensures that, when dragging this header's column resizer
  it remains above the rest of the headers, preventing accidental hovers/flickering */
  :hover,
  :active {
    z-index: 2;
  }
  /**
   * header row bottom border:
   * - not using "border-bottom" since it stands out in front of the resize indicator and counts towards the row height
   */
  ${(props) =>
    !props.isNewTheme &&
    `:before {
      content: '';
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 1px;
      bottom: 0;
      left: 0;
      background-color: ${designTokens.borderColorForTableHeaderAsBottom};
    };`}

  ${HeaderCellInner} {
    ${(props) => (props.shouldClipContent ? 'overflow: hidden;' : '')}
  }
`;

const HeaderLabelWrapper = styled.div`
  /* ensure height stays the same even if label is empty
     1.4em = default line-height */
  min-height: 1.4em;
  margin: ${designTokens.marginForTableHeader} 0;
  flex: 1;
`;

const HeaderIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: ${designTokens.spacing20};
  vertical-align: middle;
`;

export {
  HeaderCellInner,
  BaseHeaderCell,
  HeaderLabelWrapper,
  HeaderIconWrapper,
};
