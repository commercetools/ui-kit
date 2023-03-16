// TODO: @redesign cleanup
import {
  useContext,
  useRef,
  type ReactNode,
  type MouseEvent,
  type RefObject,
} from 'react';
import {
  AngleUpIcon,
  AngleDownIcon,
  AngleUpDownIcon,
} from '@commercetools-uikit/icons';
import { useTheme } from '@commercetools-uikit/design-system';
import {
  BaseHeaderCell,
  HeaderCellInner,
  HeaderIconWrapper,
  HeaderLabelWrapper,
} from './header-cell.styles';
import Resizer from './column-resizer';
import ColumnResizingContext from './column-resizing-context';
import isFixedWidthValue from './utils/is-fixed-width-value';
import { warning } from '@commercetools-uikit/utils';
import type { TColumn } from './data-table';

type THeaderRef = {
  cellIndex: string;
} & HTMLTableCellElement;

type TColumnResizingReducer = {
  startResizing: (headerRef: RefObject<THeaderRef>, event: MouseEvent) => void;
  onDrag: EventListenerOrEventListenerObject;
  onDragResizing: (event: globalThis.MouseEvent, cellIndex?: string) => void;
  finishResizing: () => TColumn[];
  getIsColumnBeingResized: (cellIndex?: string) => {};
  getHasTableBeenResized: () => boolean;
  getIsAnyColumnBeingResized: () => boolean;
};

const HeaderCellWrapper = (
  props: Pick<
    THeaderCell,
    | 'children'
    | 'columnKey'
    | 'columnWidth'
    | 'disableResizing'
    | 'disableHeaderStickiness'
    | 'onColumnResized'
  >
) => {
  const { isNewTheme } = useTheme();
  const columnResizingReducer = useContext(
    ColumnResizingContext
  ) as TColumnResizingReducer;
  const headerRef = useRef<THeaderRef>(null);

  const onStartResizing = (event: MouseEvent) => {
    columnResizingReducer.startResizing(headerRef, event);
  };

  const onDrag = (event: globalThis.MouseEvent) =>
    columnResizingReducer.onDragResizing(event, headerRef.current?.cellIndex);

  const onDragEnd = () => {
    const finalSizes = columnResizingReducer.finishResizing();

    if (props.onColumnResized) {
      props.onColumnResized(finalSizes);
    }

    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  };

  if (
    columnResizingReducer.getIsColumnBeingResized(headerRef.current?.cellIndex)
  ) {
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);
  }
  /**
   * GIVEN that any table column is being OR has been resized
   * OR the width of the current column is a fixed value
   * THEN the header content should be clipped
   */
  const shouldClipContent =
    (props.columnWidth && isFixedWidthValue(props.columnWidth)) ||
    columnResizingReducer.getHasTableBeenResized() ||
    columnResizingReducer.getIsAnyColumnBeingResized();

  return (
    <BaseHeaderCell
      ref={headerRef}
      data-testid={`header-${props.columnKey}`}
      data-id={props.columnKey}
      shouldClipContent={shouldClipContent}
      disableHeaderStickiness={props.disableHeaderStickiness}
      isNewTheme={isNewTheme}
    >
      {props.children}
      {!props.disableResizing && <Resizer onMouseDown={onStartResizing} />}
    </BaseHeaderCell>
  );
};
HeaderCellWrapper.displayName = 'HeaderCellWrapper';

export type THeaderCell = {
  onClick?: (columnKey: string, sortDirection: 'asc' | 'desc') => void;
  sortedBy?: string;
  children: ReactNode;
  columnKey: string;
  columnWidth?: string;
  shouldWrap?: boolean;
  isSortable?: boolean;
  isCondensed?: boolean;
  sortDirection?: 'desc' | 'asc';
  disableResizing?: boolean;
  onColumnResized?: (args: TColumn[]) => void;
  disableHeaderStickiness: boolean;
  horizontalCellAlignment: 'left' | 'center' | 'right';
  iconComponent?: ReactNode;
};

const defaultProps: Pick<
  THeaderCell,
  'sortDirection' | 'disableHeaderStickiness' | 'horizontalCellAlignment'
> = {
  sortDirection: 'desc',
  disableHeaderStickiness: false,
  horizontalCellAlignment: 'left',
};

const HeaderCell = (props: THeaderCell) => {
  let sortableHeaderProps = {};
  let SortingIcon!: typeof AngleDownIcon;

  if (props.isSortable) {
    const isActive = props.sortedBy === props.columnKey;
    const nextSortDirection =
      !isActive || props.sortDirection === 'desc' ? 'asc' : 'desc';
    SortingIcon = props.sortDirection === 'desc' ? AngleDownIcon : AngleUpIcon;

    sortableHeaderProps = {
      as: 'button',
      label: props.sortDirection,
      onClick: () =>
        props.onClick && props.onClick(props.columnKey, nextSortDirection),
      isActive,
      isSortable: true,
    };

    warning(
      typeof props.onClick === 'function',
      `data-table: "onClick" is required if "isSortable" is "true"`
    );
  }

  return (
    <HeaderCellWrapper
      columnWidth={props.columnWidth}
      columnKey={props.columnKey}
      onColumnResized={props.onColumnResized}
      disableResizing={props.disableResizing}
      disableHeaderStickiness={props.disableHeaderStickiness}
    >
      <HeaderCellInner
        shouldWrap={props.shouldWrap}
        isCondensed={props.isCondensed}
        horizontalCellAlignment={props.horizontalCellAlignment}
        {...sortableHeaderProps}
      >
        <HeaderLabelWrapper>
          {props.children}
          {props.iconComponent && (
            <HeaderIconWrapper>{props.iconComponent}</HeaderIconWrapper>
          )}
        </HeaderLabelWrapper>
        {props.isSortable && (
          <>
            {/** conditional rendering of one of the icons at a time is handled by CSS. Checkout cell.styles */}
            <AngleUpDownIcon
              size="medium"
              color="surface"
              data-icon-state="inactive"
            />
            <SortingIcon
              size="medium"
              color="surface"
              data-icon-state="active"
            />
          </>
        )}
      </HeaderCellInner>
    </HeaderCellWrapper>
  );
};
HeaderCell.displayName = 'HeaderCell';
HeaderCell.defaultProps = defaultProps;

export default HeaderCell;
