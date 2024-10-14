import { render, screen, fireEvent } from '../../../../../../test/test-utils';
import Header from './header';

const renderOperatorsInput = () => {
  return <>select Input</>;
};

const HeaderSetup = () => (
  <Header
    label="Filter Label"
    onSortRequest={jest.fn()}
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
    render(<Header label="Filter Label" onSortRequest={jest.fn()} />);

    expect(screen.queryByText('select Input')).not.toBeInTheDocument();
  });

  it('should conditionally render the IconButton when onSortRequest is provided', async () => {
    render(<HeaderSetup />);

    expect(screen.getByLabelText('Sort')).toBeInTheDocument();
  });

  it('should not render IconButton when onSortRequest is not provided', () => {
    render(<Header label="Filter Label" renderOperatorsInput={jest.fn()} />);

    expect(screen.queryByLabelText('Sort')).not.toBeInTheDocument();
  });

  it('should toggle isActive and call onSortRequest when IconButton is clicked', async () => {
    const onSortRequestMock = jest.fn();
    render(
      <Header
        label="Filter Label"
        renderOperatorsInput={jest.fn()}
        onSortRequest={onSortRequestMock}
      />
    );

    const sortButton = screen.getByLabelText('Sort');

    fireEvent.click(sortButton);

    expect(onSortRequestMock).toHaveBeenCalled();
  });
});
