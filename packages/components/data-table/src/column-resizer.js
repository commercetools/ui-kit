import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const resizerWidth = 3;
const resizerHoverArea = 6;

const ResizerIndicator = styled.div`
  height: 50%;
  width: ${resizerWidth}px;
  background: ${vars.colorInfo};
  visibility: hidden;
  cursor: col-resize;
`;

const DraggableArea = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  width: ${resizerHoverArea}px;
  right: -${resizerHoverArea - resizerWidth}px;

  cursor: col-resize;
  user-select: none;

  &:hover ${ResizerIndicator} {
    height: 100%;
    visibility: visible;
  }

  /* when dragging, we increase the area of the invisible draggable zone
  to prevent accidentally hovering other elements which may cause flickers */
  &:active {
    display: flex;
    justify-content: center;
    width: 50px;
    right: -23px;
    height: 100vh;

    ${ResizerIndicator} {
      visibility: visible;
      height: 100vh;
    }
  }
`;

const ColumnResizer = (props) => (
  <DraggableArea role="presentation" onMouseDown={props.onMouseDown}>
    <ResizerIndicator />
  </DraggableArea>
);
ColumnResizer.displayName = 'ColumnResizer';
ColumnResizer.propTypes = {
  onMouseDown: PropTypes.func.isRequired,
};

export default ColumnResizer;
