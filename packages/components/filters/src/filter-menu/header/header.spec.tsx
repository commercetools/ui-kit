import { render, screen, fireEvent } from '../../../../../../test/test-utils';
import Header from './header';

const renderOperatorsInput = () => {
  return <>select Input</>;
};

const HeaderSetup = () => (
  <Header
    label="Filter Label"
    onSort={jest.fn()}
    renderOperatorsInput={renderOperatorsInput}
  />
);

describe('FilterMenu Header', () => {
  it('should render the header label', async () => {
    render(<HeaderSetup />);

    expect(screen.getByText('Filter Label')).toBeInTheDocument();
  });

  it('should conditionally render the component returned when renderOperatorsInput are provided', async () => {
    render(<HeaderSetup />);

    expect(screen.getByText('select Input')).toBeInTheDocument();
  });

  it('should not render component when renderOperatorsInput are not provided', () => {
    render(<Header label="Filter Label" onSort={jest.fn()} />);

    expect(screen.queryByText('select Input')).not.toBeInTheDocument();
  });

  it('should conditionally render the IconButton when onSort is provided', async () => {
    render(<HeaderSetup />);

    expect(screen.getByLabelText('Sort')).toBeInTheDocument();
  });

  it('should not render IconButton when onSort is not provided', () => {
    render(<Header label="Filter Label" renderOperatorsInput={jest.fn()} />);

    expect(screen.queryByLabelText('Sort')).not.toBeInTheDocument();
  });

  it('should toggle isActive and call onSort when IconButton is clicked', async () => {
    const onSortMock = jest.fn();
    render(
      <Header
        label="Filter Label"
        renderOperatorsInput={jest.fn()}
        onSort={onSortMock}
      />
    );

    const sortButton = screen.getByLabelText('Sort');

    fireEvent.click(sortButton);

    expect(onSortMock).toHaveBeenCalled();
  });
});
