import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Draggable } from '@hello-pangea/dnd';
import { designTokens } from '@commercetools-uikit/design-system';
import Tag from '@commercetools-uikit/tag';
import DraggingContainer from './draggable-tag.styles';

export type TColumnData = {
  key: string;
  label: ReactNode;
};

export type TDraggableTagProps = {
  column: TColumnData;
  index: number;
  isDisabled?: boolean;
  onRemove?: (index: number) => void;
};

const DraggableTagWrapper = styled.div`
  padding: ${designTokens.spacing10} 0;
`;

const DraggableTag = (props: TDraggableTagProps) => {
  const handleRemoveColumn = () => props.onRemove?.(props.index);

  return (
    <Draggable
      draggableId={props.column.key}
      index={props.index}
      isDragDisabled={props.isDisabled}
    >
      {(provided) => {
        return (
          <DraggableTagWrapper>
            <DraggingContainer
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Tag
                onRemove={props.onRemove ? handleRemoveColumn : undefined}
                isDisabled={props.isDisabled}
                isDraggable
              >
                {props.column.label}
              </Tag>
            </DraggingContainer>
          </DraggableTagWrapper>
        );
      }}
    </Draggable>
  );
};

DraggableTag.displayName = 'DraggableTag';

export default DraggableTag;
