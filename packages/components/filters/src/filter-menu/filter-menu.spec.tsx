import { screen, render, fireEvent } from '../../../../../test/test-utils';
import FilterMenu, { type TFilterMenuProps } from './filter-menu';
import { OPERATOR_OPTIONS } from '../fixtures/constants';
import { ColorNameTextInput, OperatorsInput } from '../fixtures/inputs';

const mockRenderMenuBody = jest.fn(() => (
  <ColorNameTextInput value="hello" onChange={() => {}} />
));
const mockRenderOperatorsInput = jest.fn(() => (
  <OperatorsInput value={OPERATOR_OPTIONS[0].label} onChange={() => {}} />
));
const mockOnRemoveRequest = jest.fn();

const getDefaultProps = (custom?: Partial<TFilterMenuProps>) => ({
  filterKey: 'test',
  label: 'filter menu',
  renderMenuBody: mockRenderMenuBody,
  appliedFilterValues: [{ label: 'hello', value: 'hello' }],
  onRemoveRequest: mockOnRemoveRequest,
  renderOperatorsInput: mockRenderOperatorsInput,
  ...custom,
});

describe('FilterMenu component', () => {
  it('should render the FilterMenu label', async () => {
    const props = getDefaultProps();
    await render(<FilterMenu {...props} />);
    await screen.findByText('filter menu:');
  });
  it('should render the selected value', async () => {
    const props = getDefaultProps();
    await render(<FilterMenu {...props} />);
    const item = await screen.findByRole('listitem');
    expect(item.textContent).toEqual('hello');
  });
  it('should open the menu body when defaultOpen is true', async () => {
    const props = getDefaultProps({ defaultOpen: true });
    await render(<FilterMenu {...props} />);
    await screen.findByPlaceholderText(/enter a color name/i);
  });
  it('should not open the menu body when isDisabled and defaultOpen are true', async () => {
    const props = getDefaultProps({ defaultOpen: true, isDisabled: true });
    await render(<FilterMenu {...props} />);
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
  });
  describe('when menu is open', () => {
    it('should focus on the input in the menu body instead of the operators input in the header', async () => {
      const props = getDefaultProps({ defaultOpen: true });
      await render(<FilterMenu {...props} />);
      await screen.findByRole('combobox', { name: 'select operators' });
      const bodyInput = await screen.findByPlaceholderText(
        /enter a color name/i
      );
      expect(bodyInput).toHaveFocus();
    });
    it('should call onRemoveRequest when menu is closed, isPersistent is false, and no values are selected', async () => {
      const props = getDefaultProps({
        defaultOpen: true,
        appliedFilterValues: [],
      });
      await render(<FilterMenu {...props} />);
      const bodyInput = await screen.findByPlaceholderText(
        /enter a color name/i
      );
      fireEvent.keyDown(bodyInput, { key: 'Escape' });
      expect(mockOnRemoveRequest).toHaveBeenCalled();
    });
    it('should call not call onRemoveRequest when menu is closed, and values are selected', async () => {
      const props = getDefaultProps({
        defaultOpen: true,
      });
      await render(<FilterMenu {...props} />);
      const bodyInput = await screen.findByPlaceholderText(
        /enter a color name/i
      );
      fireEvent.keyDown(bodyInput, { key: 'Escape' });
      expect(mockOnRemoveRequest).not.toHaveBeenCalled();
    });
    it('should call not call onRemoveRequest when menu is closed, and isPersistent is true', async () => {
      const props = getDefaultProps({
        defaultOpen: true,
        isPersistent: true,
      });
      await render(<FilterMenu {...props} />);
      const bodyInput = await screen.findByPlaceholderText(
        /enter a color name/i
      );
      fireEvent.keyDown(bodyInput, { key: 'Escape' });
      expect(mockOnRemoveRequest).not.toHaveBeenCalled();
    });
  });
});
