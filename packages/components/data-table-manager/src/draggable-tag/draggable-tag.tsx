import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Draggable } from 'react-beautiful-dnd';
import { DragIcon } from '@commercetools-uikit/icons';
import { designTokens } from '@commercetools-uikit/design-system';
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

const DraggableTagWrapper = styled.div`
  padding: ${designTokens.paddingForTableManagerDraggableTag};
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
              >
                <Spacings.Inline alignItems="center">
                  <DragIcon data-testid="drag-icon" size="medium" />
                  {props.column.label}
                </Spacings.Inline>
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
