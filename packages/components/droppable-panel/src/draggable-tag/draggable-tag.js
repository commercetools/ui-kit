import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Draggable } from 'react-beautiful-dnd';
import { DragIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import Tag from '@commercetools-uikit/tag';
import DraggingContainer from './draggable-tag.styles';

const portal = document.createElement('div');
portal.classList.add('dnd-portal');
document.body.appendChild(portal);

const DraggableTag = React.memo(({ column, index, onRemove, isDisabled }) => {
  const handleRemoveColumn = () => onRemove(index);

  return (
    <Draggable
      draggableId={column.key}
      index={index}
      isDragDisabled={isDisabled}
    >
      {(provided, snapshot) => {
        const child = (
          <Spacings.Inset scale="xs">
            <DraggingContainer
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Tag
                onRemove={onRemove ? handleRemoveColumn : undefined}
                isDisabled={isDisabled}
              >
                <Spacings.Inline alignItems="center">
                  <DragIcon data-testid="drag-icon" size="medium" />
                  {column.label}
                </Spacings.Inline>
              </Tag>
            </DraggingContainer>
            {provided.placeholder}
          </Spacings.Inset>
        );
        if (!snapshot?.isDragging) {
          return child;
        }

        return ReactDOM.createPortal(child, portal);
      }}
    </Draggable>
  );
});

DraggableTag.displayName = 'DraggableTag';
DraggableTag.propTypes = {
  column: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default DraggableTag;
