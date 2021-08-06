import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { DragIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import Tag from '@commercetools-uikit/tag';
import DraggingContainer from './draggable-tag.styles';

const DraggableTag = (props) => {
  const handleRemoveColumn = () => props.onRemove(props.index);

  return (
    <Draggable
      draggableId={props.column.key}
      index={props.index}
      isDragDisabled={props.isDisabled}
    >
      {(provided) => {
        return (
          <Spacings.Inset scale="xs">
            <DraggingContainer
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Tag
                onRemove={props.onRemove ? handleRemoveColumn : undefined}
                isDisabled={props.isDisabled}
              >
                <Spacings.Inline alignItems="center">
                  <DragIcon data-testid="drag-icon" size="medium" />
                  {props.column.label}
                </Spacings.Inline>
              </Tag>
            </DraggingContainer>
            {provided.placeholder}
          </Spacings.Inset>
        );
      }}
    </Draggable>
  );
};

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
