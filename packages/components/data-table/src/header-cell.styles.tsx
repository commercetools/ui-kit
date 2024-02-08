import { css, keyframes } from '@emotion/react';
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
  font-size: ${designTokens.fontSize10};
  font-family: inherit;
`;

/* When a sortable header is deselected,
 *  (i.e. when another sortable header is selected)
 *  the AngleUpDown is animated with fadeIn
 *
 *  When the user hovers over a sortable header that
 *  is not the active sorted column, the icon for
 *  the current sort direction is animated with fadeIn
 */
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

/* When a sortable header is activated/selected,
 *  and the sort direction is 'desc', the ArrowDown
 *  icon is animated with rotateClockwise
 */
const rotateClockwise = keyframes`
  from {
    transform: rotate(-180deg);
  } to {
    transform: rotate(0deg);
  }
`;

/* When a sortable header is activated/selected,
 *  and the sort direction is 'asc', the ArrowUp
 *  icon is animated with rotateCounterClockwise
 */
const rotateCounterClockwise = keyframes`
  from {
    transform: rotate(180deg);
  } to {
    transform: rotate(0deg);
  }
`;

/* A sortable header has the two arrow svg icons
 * GIVEN column is sortable and is not focused
 * THEN AngleUpDown icon is shown (default behaviour)
 * AND ArrowUp or ArrowDown icon is not shown
 *
 * GIVEN column is sortable and foucsed or hovered
 * THEN AngleUpDown icon is hidden
 * AND ArrowUp or ArrowDown icon is shown
 */
type TGetSortableHeaderStyles = {
  isActive?: boolean;
  label?: 'asc' | 'desc';
};

const getSortableHeaderStyles = (props: TGetSortableHeaderStyles) => css`
  width: 100%;
  display: flex;
  align-items: center;

  svg[data-icon-state='inactive'],
  svg[data-icon-state='active'] {
    margin-left: ${designTokens.spacing10};
    flex-shrink: 0;
  }
  svg[data-icon-state='inactive'] {
    display: ${props.isActive ? 'none' : 'inline-block'};
    animation: ${fadeIn} 150ms ease-in-out;
  }
  svg[data-icon-state='active'] {
    display: ${props.isActive ? 'inline-block' : 'none'};
    animation: ${props.isActive &&
    css`
      ${props.label === 'asc'
        ? rotateCounterClockwise
        : rotateClockwise} 150ms ease-in-out
    `};
  }
  /* for cases where svgs have a predefined fill */
  > svg * {
    fill: ${designTokens.colorNeutral60} !important;
  }

  :hover,
  :focus {
    svg[data-icon-state='inactive'] {
      display: none;
    }
    svg[data-icon-state='active'] {
      display: inline-block;
      animation: ${!props.isActive &&
      css`
        ${fadeIn} 150ms ease-in-out
      `};
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
  justify-content: flex-start;
  padding: 0 ${designTokens.spacing40};

  ${getCellInnerStyles}
  ${(props) => (props.isSortable ? getSortableHeaderStyles(props) : '')};
  ${(props) => (props.as === 'button' ? getButtonStyle() : '')};
  ${(props) => (props.shouldWrap ? '' : 'white-space: nowrap')}
`;

type TBaseHeaderCell = {
  disableHeaderStickiness?: boolean;
  shouldClipContent?: boolean;
};
const BaseHeaderCell = styled.th<TBaseHeaderCell>`
  color: ${designTokens.colorNeutral40};
  background-color: ${designTokens.colorNeutral98};

  position: ${(props) =>
    props.disableHeaderStickiness ? 'relative' : 'sticky'};
  top: 0;
  z-index: 1;
  line-height: ${designTokens.lineHeight40};

  /* remove user-agent styles */
  padding: 0;
  font-weight: ${designTokens.fontWeight500};
  font-size: ${designTokens.fontSize10};

  /**
   * bottom border that doesn't overshadow the resize indicator
   */
  :after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: ${designTokens.borderWidth1};
    bottom: 0;
    left: 0;
    background-color: ${designTokens.colorNeutral95};
  }

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
  display: inline-flex;
  /* ensure height stays the same even if label is empty
     1.4em = default line-height */
  min-height: 1.4em;
  margin: ${designTokens.spacing20} 0;
  flex: 0 0 fit-content;
`;

const HeaderLabelTextWrapper = styled.span`
  /* ensure that the header text truncates on the second line
  https://css-tricks.com/line-clampin/#aa-the-standardized-way */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: anywhere;
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
  HeaderLabelTextWrapper,
  HeaderIconWrapper,
};
