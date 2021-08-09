import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const ResizerIndicator = styled.div`
  height: 100%;
  width: 3px;
  background: ${vars.colorInfo};
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

const ColumnResizer = (props) => (
  <DraggableArea role="presentation" onMouseDown={props.onMouseDown}>
    <ResizerIndicator isOnDataCell={props.isOnDataCell} />
  </DraggableArea>
);
ColumnResizer.displayName = 'ColumnResizer';
ColumnResizer.propTypes = {
  onMouseDown: PropTypes.func,
  isOnDataCell: PropTypes.bool,
};

export default ColumnResizer;
