import { DragDropContext } from '@hello-pangea/dnd';
import { screen, render } from '../../../../../test/test-utils';
import DroppablePanel from './droppable-panel';

const createTestProps = (props) => ({
  droppableId: 'selected-columns-panel',
  noColumnsText: 'No columns to show',
  columns: [],
  ...props,
});

const renderComponent = (ui, renderOptions) =>
  render(<DragDropContext>{ui}</DragDropContext>, renderOptions);

it('should render column tags when there are columns', () => {
  const props = createTestProps({
    droppableId: 'hidden-columns-panel',
    columns: [
      {
        key: 'column1',
        label: 'Column 1',
      },
      {
        key: 'column2',
        label: 'Column 2',
      },
      {
        key: 'column3',
        label: 'Column 3',
      },
    ],
    noColumnsText: 'No columns to show',
  });
  renderComponent(<DroppablePanel {...props} />);

  // should not render "no items" message
  expect(screen.queryByText(/no columns to show/i)).not.toBeInTheDocument();

  // should render column tags
  expect(screen.getByText(/column 1/i)).toBeInTheDocument();
  expect(screen.getByText(/column 2/i)).toBeInTheDocument();
  expect(screen.getByText(/column 3/i)).toBeInTheDocument();
});

it('should not render columns tags when there are no columns', () => {
  const props = createTestProps({
    columns: [],
    noColumnsText: 'No columns to show',
  });
  renderComponent(<DroppablePanel {...props} />);

  expect(screen.getByText(/no columns to show/i)).toBeInTheDocument();
});
