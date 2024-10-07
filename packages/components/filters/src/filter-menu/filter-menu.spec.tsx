import { screen, render } from '../../../../../test/test-utils';
import FilterMenu, { type TFilterMenuProps } from './filter-menu';

const mockRenderMenuBody = jest.fn(() => <div>im the body</div>);
const mockOnRemoveRequest = jest.fn();

const getDefaultProps = (custom?: Partial<TFilterMenuProps>) => ({
  filterKey: 'test',
  label: 'filter menu',
  renderMenuBody: mockRenderMenuBody,
  appliedFilterValues: [{ label: 'hello', value: 'hello' }],
  mockOnRemoveRequest: mockOnRemoveRequest,
  ...custom,
});

describe('FilterMenu component', () => {
  it('should render the FilterMenu label', async () => {
    const props = getDefaultProps();
    await render(<FilterMenu {...props} />);
    await screen.findByText('filter menu:');
  });
  it('should open the menu body when defaultOpen is true', async () => {
    const props = getDefaultProps({ defaultOpen: true });
    await render(<FilterMenu {...props} />);
    await screen.findByText('im the body');
  });
  it('should not open the menu body when isDisabled and defaultOpen are true', async () => {
    const props = getDefaultProps({ defaultOpen: true, isDisabled: true });
    await render(<FilterMenu {...props} />);
    expect(screen.queryByText('im the body')).not.toBeInTheDocument();
  });
});
