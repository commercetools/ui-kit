import type { ReactNode } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { DragIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import Tag from '@commercetools-uikit/tag';
import DraggingContainer from './draggable-tag.styles';

type TColumnData = {
  key: string;
  label: ReactNode;
};

type TDraggableTagProps = {
  column: TColumnData;
  index: number;
  isDisabled?: boolean;
  onRemove?: (index: number) => void;
};

const DraggableTag = (props: TDraggableTagProps) => {
  const handleRemoveColumn = () => props.onRemove!(props.index);

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
          </Spacings.Inset>
        );
      }}
    </Draggable>
  );
};

DraggableTag.displayName = 'DraggableTag';

export default DraggableTag;
