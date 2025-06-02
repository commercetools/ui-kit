import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { screen, render } from '../../../../../test/test-utils';
import DraggableTag from './draggable-tag';

const createTestProps = (props) => ({
  index: 0,
  column: {
    key: 'column1',
    label: 'Column 1',
  },
  onRemove: jest.fn(),
  ...props,
});

it('should render the column tag when rendering a column', () => {
  const props = createTestProps({
    column: {
      key: 'column',
      label: 'Column',
    },
  });

  render(
    <DragDropContext>
      <Droppable droppableId="droppableId">
        {(provided) => (
          <div ref={provided.innerRef}>
            <DraggableTag {...props} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

  expect(screen.getByText(/column/i)).toBeInTheDocument();

  expect(screen.getByTestId('drag-icon')).toBeInTheDocument();
});
