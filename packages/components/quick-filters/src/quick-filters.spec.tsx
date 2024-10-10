import { screen, render } from '../../../../test/test-utils';
import QuickFilters from './quick-filters';

describe('QuickFilters', () => {
  it('should render items and propagate item-clicks', async () => {
    const items = [
      { id: '1', label: 'Foo', isActive: true },
      { id: '2', label: 'Bar', isActive: false },
    ];

    const cb = jest.fn();

    await render(<QuickFilters items={items} onItemClick={cb} />);

    const button1 = (await screen.findByText('Foo')).closest('button');
    const button2 = (await screen.findByText('Bar')).closest('button');

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();

    button2?.click();
    expect(cb).toHaveBeenCalledWith(items[1]);
    button1?.click();
    expect(cb).toHaveBeenCalledWith(items[0]);
  });
});
