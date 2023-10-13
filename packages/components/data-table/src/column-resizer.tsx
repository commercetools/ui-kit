import type { MouseEvent } from 'react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

type TColumnResizer = {
  onMouseDown?: (event: MouseEvent) => void;
  isOnDataCell?: boolean;
};

const ResizerIndicator = styled.div<TColumnResizer>`
  height: 100%;
  width: 1px;
  background: ${designTokens.colorNeutral};
  visibility: hidden;
  cursor: col-resize;

  ${(
    props // extra 1px of height to appear above the bottom horizontal row border
  ) =>
    props.isOnDataCell ? 'visibility: visible; height: calc(100% + 1px);' : ''}
`;

const DraggableArea = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  width: 6px;

  cursor: col-resize;
  user-select: none;

  &:hover ${ResizerIndicator} {
    height: 100%;
    visibility: visible;
  }

  /* when dragging, we increase the area of the invisible draggable zone
  to prevent accidentally hovering other elements which causes flickering */
  &:active {
    width: 20px;
    right: -10px;

    ${ResizerIndicator} {
      margin-right: 10px;
      visibility: visible;
    }
  }
`;

const ColumnResizer = (props: TColumnResizer) => (
  <DraggableArea role="presentation" onMouseDown={props.onMouseDown}>
    <ResizerIndicator isOnDataCell={props.isOnDataCell} />
  </DraggableArea>
);
ColumnResizer.displayName = 'ColumnResizer';

export default ColumnResizer;
