import React, { useState } from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { useIntl } from 'react-intl';
import { DragDropContext } from 'react-beautiful-dnd';
import debounce from 'debounce-promise';
import differenceWith from 'lodash/differenceWith';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';
import FieldLabel from '@commercetools-uikit/field-label';
import Spacings from '@commercetools-uikit/spacings';
import {
  EyeCrossedIcon,
  EyeIcon,
  SearchIcon,
} from '@commercetools-uikit/icons';
import DroppablePanel from '../droppable-panel';
import SettingsContainer from '../settings-container';
import messages from './messages';
import { HIDDEN_COLUMNS_PANEL, SELECTED_COLUMNS_PANEL } from './constants';

const DroppableContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: ${vars.constraintL};
  cursor: ${(props) => (props.isDragging ? 'grabbing' : 'auto')};
`;

export const handleColumnsUpdate = (
  dragResult,
  onUpdateColumns,
  selectedColumns,
  availableColumns,
  setIsDragging
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
    const draggedColumn = columns.find(
      (col) => col.key === dragResult.draggableId
    );

    // push the column in the new position
    onUpdateColumns([
      ...items.slice(0, dragResult.destination.index),
      draggedColumn,
      ...items.slice(dragResult.destination.index),
    ]);
  }
};

const DropdownIndicator = () => (
  <Spacings.Inline alignItems="center">
    <SearchIcon scale="medium" color="primary" />
  </Spacings.Inline>
);
DropdownIndicator.displayName = 'DropdownIndicator';

const Nothing = () => null;
const selectInputComponents = {
  Option: Nothing,
  Menu: Nothing,
  DropdownIndicator,
};

export const ColumnSettingsManager = (props) => {
  const intl = useIntl();
  const [isDragging, setIsDragging] = useState(false);
  const { searchHiddenColumns } = props;

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const hiddenColumns = React.useMemo(
    () =>
      differenceWith(
        props.availableColumns,
        props.selectedColumns,
        (a, b) => a.key === b.key
      ),
    [props.availableColumns, props.selectedColumns]
  );

  const handleDragEnd = React.useCallback(
    (dragResult) =>
      handleColumnsUpdate(
        dragResult,
        props.onUpdateColumns,
        props.selectedColumns,
        props.availableColumns,
        setIsDragging
      ),
    [props.onUpdateColumns, props.selectedColumns, props.availableColumns]
  );

  const handleInputChange = React.useCallback(
    (input) =>
      // loadOptions is not invoked when input is empty
      !input.length && searchHiddenColumns(input),
    [searchHiddenColumns]
  );

  return (
    <SettingsContainer
      title={messages.title}
      closeButtonLabel={messages.closeButtonLabel}
      onClose={props.onClose}
      primaryButton={props.primaryButton}
      secondaryButton={props.secondaryButton}
    >
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Spacings.Inline scale="m">
          <DroppableContainer isDragging={isDragging}>
            <Spacings.Stack>
              <Spacings.Inline scale="xs" alignItems="center">
                <EyeCrossedIcon size="medium" />
                <FieldLabel
                  title={intl.formatMessage(messages.hiddenColumns)}
                />
              </Spacings.Inline>
              {!props.disableHiddenColumnSearch && (
                <AsyncSelectInput
                  {...(props.searchHiddenColumnsPlaceholder
                    ? {
                        placeholder: props.searchHiddenColumnsPlaceholder,
                      }
                    : undefined)}
                  cacheOptions={false}
                  onChange={() => {
                    // to avoid prop-types error
                    // as `onChange` is a required prop in
                    // `AsyncSelectInput`
                  }}
                  // loadOptions is used instead of onInputChange
                  // because the loading indicator is displayed
                  // only when loadOptions is invoked
                  loadOptions={debounce(searchHiddenColumns, 300)}
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
                isSearchable={!props.disableHiddenColumnSearch}
              />
            </Spacings.Stack>
          </DroppableContainer>
          <DroppableContainer isDragging={isDragging}>
            <Spacings.Stack>
              <Spacings.Inline scale="xs" alignItems="center">
                <EyeIcon size="medium" />
                <FieldLabel
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

ColumnSettingsManager.propTypes = {
  availableColumns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    })
  ).isRequired,
  selectedColumns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    })
  ).isRequired,
  onUpdateColumns: PropTypes.func.isRequired,

  disableHiddenColumnSearch: PropTypes.bool,
  searchHiddenColumns: requiredIf(
    PropTypes.func,
    (props) => !props.disableHiddenColumnSearch
  ),
  searchHiddenColumnsPlaceholder: PropTypes.string,

  onClose: PropTypes.func,
  primaryButton: PropTypes.element,
  secondaryButton: PropTypes.element,
};

ColumnSettingsManager.defaultProps = {
  availableColumns: [],
  disableHiddenColumnSearch: true,
};

export default ColumnSettingsManager;
