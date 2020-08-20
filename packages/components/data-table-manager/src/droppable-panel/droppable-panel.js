import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import DraggableTag from '../draggable-tag';
import TagContainerEditable from './tag-container-editable';
import messages from './messages';

const DroppablePanel = (props) => {
  return (
    <Droppable droppableId={props.droppableId}>
      {(provided) => (
        <TagContainerEditable
          data-testid={props.droppableId}
          ref={provided.innerRef}
        >
          {props.columns.length === 0 ? (
            <Spacings.Inset scale="s">
              <Text.Detail tone="secondary">{props.noColumnsText}</Text.Detail>
            </Spacings.Inset>
          ) : (
            <>
              {props.columns.map((column, index) => (
                <DraggableTag
                  key={`${column.key}-${index}`}
                  column={column}
                  index={index}
                  onRemove={
                    props.onRemove
                      ? () =>
                          props.onRemove([
                            ...props.columns.slice(0, index),
                            ...props.columns.slice(index + 1),
                          ])
                      : undefined
                  }
                  isDisabled={props.isDisabled}
                />
              ))}
              {props.isSearchable && (
                <Spacings.Inset scale="xs">
                  <Text.Detail
                    tone="secondary"
                    intlMessage={messages.loadMoreAttributesHint}
                  />
                </Spacings.Inset>
              )}
            </>
          )}
          {provided.placeholder}
        </TagContainerEditable>
      )}
    </Droppable>
  );
};

DroppablePanel.displayName = 'DroppablePanel';
DroppablePanel.propTypes = {
  droppableId: PropTypes.string.isRequired,
  noColumnsText: PropTypes.node.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    })
  ),
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onRemove: PropTypes.func,
};

export default DroppablePanel;
