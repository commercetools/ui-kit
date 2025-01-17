import {
  useMemo,
  useCallback,
  useState,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
  type Dispatch,
} from 'react';
import { useIntl } from 'react-intl';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';
import debounce from 'debounce-promise';
import differenceWith from 'lodash/differenceWith';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';
import FieldLabel from '@commercetools-uikit/field-label';
import Spacings from '@commercetools-uikit/spacings';
import {
  EyeCrossedIcon,
  EyeIcon,
  SearchIcon,
} from '@commercetools-uikit/icons';
import { warning } from '@commercetools-uikit/utils';
import DroppablePanel from '../droppable-panel';
import SettingsContainer from '../settings-container';
import messages from './messages';
import { HIDDEN_COLUMNS_PANEL, SELECTED_COLUMNS_PANEL } from './constants';

// 'searchHiddenColums' is only required if 'areHiddenColumnsSearchable' is true
// but that callback is used in AsyncSelectInput.loadOptions which is required
// That property (loadOptions) is passed to react-select AsyncSelect where it's
// declared as optional
const noSearch = () => Promise.resolve([]);
// 'onChange' prop in AsyncSelectInput is required but not needed here
const voidChangeHandler = () => undefined;

export type TColumnData = {
  key: string;
  label: ReactNode;
};

export type TColumnSettingsManagerProps = {
  title?: string;
  availableColumns?: TColumnData[];
  selectedColumns: TColumnData[];
  onUpdateColumns: (updatedColums: TColumnData[]) => void;
  areHiddenColumnsSearchable?: boolean;
  searchHiddenColumns?: (searchTerm: string) => Promise<void> | void;
  searchHiddenColumnsPlaceholder?: string;

  onClose: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  primaryButton?: ReactElement;
  secondaryButton?: ReactElement;
  managerTheme?: 'light' | 'dark';
};

type TDroppableContainerProps = {
  isDragging: boolean;
};

const DroppableContainer = styled.div<TDroppableContainerProps>`
  width: 100%;
  position: relative;
  max-width: ${designTokens.constraint10};
  cursor: ${(props) => (props.isDragging ? 'grabbing' : 'auto')};
`;

export const handleColumnsUpdate = (
  dragResult: DropResult,
  onUpdateColumns: TColumnSettingsManagerProps['onUpdateColumns'],
  selectedColumns: TColumnSettingsManagerProps['selectedColumns'],
  availableColumns: TColumnSettingsManagerProps['availableColumns'],
  setIsDragging: Dispatch<boolean>
) => {
  setIsDragging(false);
  // Invalid drop destination, do nothing
  if (!dragResult.destination) return;
  if (dragResult.destination.droppableId === HIDDEN_COLUMNS_PANEL) {
    if (dragResult.source.droppableId === HIDDEN_COLUMNS_PANEL) return;
    onUpdateColumns([
      ...selectedColumns.slice(0, dragResult.source.index),
      ...selectedColumns.slice(dragResult.source.index + 1),
    ]);
  } else {
    // the destination is the selected columns panel

    // it's a swap when the source and the destination are the same
    const isSwap = dragResult.source.droppableId === SELECTED_COLUMNS_PANEL;

    const items = isSwap
      ? // remove the dragged item from its position if it is not coming from
        // the hidden section (it is a swap)
        [
          ...selectedColumns.slice(0, dragResult.source.index),
          ...selectedColumns.slice(dragResult.source.index + 1),
        ]
      : selectedColumns;

    const columns = isSwap ? selectedColumns : availableColumns;
    const draggedColumn = columns!.find(
      (col) => col.key === dragResult.draggableId
    );

    // push the column in the new position if draggedColumn is found
    if (draggedColumn) {
      onUpdateColumns([
        ...items.slice(0, dragResult.destination.index),
        draggedColumn,
        ...items.slice(dragResult.destination.index),
      ]);
    }
  }
};

const DropdownIndicator = () => (
  <Spacings.Inline alignItems="center">
    <SearchIcon size="medium" color="primary" />
  </Spacings.Inline>
);
DropdownIndicator.displayName = 'DropdownIndicator';

const Nothing = () => null;
const selectInputComponents = {
  Option: Nothing,
  Menu: Nothing,
  DropdownIndicator,
};

export const ColumnSettingsManager = ({
  availableColumns = [],
  ...props
}: TColumnSettingsManagerProps) => {
  if (props.areHiddenColumnsSearchable) {
    warning(
      typeof props.searchHiddenColumns !== 'undefined',
      'ui-kit/ColumnSettingsManager: "searchHiddenColumns" must be provided when "areHiddenColumnsSearchable" is true'
    );
  }

  const intl = useIntl();
  const [isDragging, setIsDragging] = useState(false);
  const { searchHiddenColumns } = props;

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const hiddenColumns = useMemo(
    () =>
      differenceWith(
        availableColumns,
        props.selectedColumns,
        (a, b) => a.key === b.key
      ),
    [availableColumns, props.selectedColumns]
  );

  const handleDragEnd = useCallback<(dragResult: DropResult) => void>(
    (dragResult) =>
      handleColumnsUpdate(
        dragResult,
        props.onUpdateColumns,
        props.selectedColumns,
        availableColumns,
        setIsDragging
      ),
    [props.onUpdateColumns, props.selectedColumns, availableColumns]
  );

  const debouncedSearchHiddenColumns = useMemo(
    () => debounce(searchHiddenColumns ?? noSearch, 300),
    [searchHiddenColumns]
  );
  const handleInputChange = useCallback<(inputValue: string) => void>(
    (inputValue) => debouncedSearchHiddenColumns(inputValue),
    [debouncedSearchHiddenColumns]
  );

  return (
    <SettingsContainer
      customSettingsTitle={props.title}
      title={messages.title}
      closeButtonLabel={messages.closeButtonLabel}
      onClose={props.onClose}
      primaryButton={props.primaryButton}
      secondaryButton={props.secondaryButton}
      containerTheme={props.managerTheme}
    >
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Spacings.Inline scale="l">
          <DroppableContainer
            isDragging={isDragging}
            aria-labelledby="hidden-columns"
          >
            <Spacings.Stack scale="m">
              <Spacings.Inline scale="s" alignItems="center">
                <EyeCrossedIcon size="big" />
                <FieldLabel
                  id="hidden-columns"
                  title={intl.formatMessage(messages.hiddenColumns)}
                />
              </Spacings.Inline>
              {props.areHiddenColumnsSearchable && (
                <AsyncSelectInput
                  {...(props.searchHiddenColumnsPlaceholder
                    ? {
                        placeholder: props.searchHiddenColumnsPlaceholder,
                      }
                    : undefined)}
                  onChange={voidChangeHandler}
                  loadOptions={noSearch}
                  onInputChange={handleInputChange}
                  components={selectInputComponents}
                />
              )}
              <DroppablePanel
                droppableId={HIDDEN_COLUMNS_PANEL}
                data-testid={HIDDEN_COLUMNS_PANEL}
                noColumnsText={intl.formatMessage(
                  messages.noHiddenColumnsToShow
                )}
                columns={hiddenColumns}
                isSearchable={props.areHiddenColumnsSearchable}
              />
            </Spacings.Stack>
          </DroppableContainer>
          <DroppableContainer
            isDragging={isDragging}
            aria-labelledby="visible-columns"
          >
            <Spacings.Stack scale="m">
              <Spacings.Inline scale="xs" alignItems="center">
                <EyeIcon size="medium" />
                <FieldLabel
                  id="visible-columns"
                  title={intl.formatMessage(messages.visibleColumns)}
                />
              </Spacings.Inline>
              <DroppablePanel
                droppableId={SELECTED_COLUMNS_PANEL}
                data-testid={SELECTED_COLUMNS_PANEL}
                noColumnsText={intl.formatMessage(
                  messages.noSelectedColumnsToShow
                )}
                columns={props.selectedColumns}
                onRemove={props.onUpdateColumns}
              />
            </Spacings.Stack>
          </DroppableContainer>
        </Spacings.Inline>
      </DragDropContext>
    </SettingsContainer>
  );
};

ColumnSettingsManager.displayName = 'ColumnSettingsManager';

export default ColumnSettingsManager;
