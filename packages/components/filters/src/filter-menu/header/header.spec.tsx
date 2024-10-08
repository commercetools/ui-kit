import { render, screen, fireEvent } from '../../../../../../test/test-utils';
import Header from './header';

const operatorOptions = [
  { value: 'is', label: 'IS' },
  { value: 'isNot', label: 'IS NOT' },
];

const FilterSetup = () => (
  <Header
    label="Filter Label"
    operatorOptions={operatorOptions}
    onSelectOperand={jest.fn()}
    onSort={jest.fn()}
    renderOperatorsInput={() => {}}
  />
);

describe('FilterMenu Header', () => {
  it('should render the header label', async () => {
    render(<FilterSetup />);

    expect(screen.getByText('Filter Label')).toBeInTheDocument();
  });

  it('should conditionally render the SelectInput when renderOperatorsInput are provided', async () => {
    render(<FilterSetup />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should not render SelectInput when renderOperatorsInput are not provided', () => {
    render(
      <Header
        label="Filter Label"
        onSelectOperand={jest.fn()}
        onSort={jest.fn()}
      />
    );

    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('should conditionally render the IconButton when onSort is provided', async () => {
    render(<FilterSetup />);

    expect(screen.getByLabelText('Sort')).toBeInTheDocument();
  });

  it('should not render IconButton when onSort is not provided', () => {
    render(
      <Header
        label="Filter Label"
        onSelectOperand={jest.fn()}
        operatorOptions={operatorOptions}
      />
    );

    expect(screen.queryByLabelText('Sort')).not.toBeInTheDocument();
  });

  it('should toggle isActive and call onSort when IconButton is clicked', async () => {
    const onSortMock = jest.fn();
    render(
      <Header
        label="Filter Label"
        operatorOptions={operatorOptions}
        onSelectOperand={jest.fn()}
        onSort={onSortMock}
      />
    );

    const sortButton = screen.getByLabelText('Sort');

    fireEvent.click(sortButton);

    expect(onSortMock).toHaveBeenCalled();
  });
});
