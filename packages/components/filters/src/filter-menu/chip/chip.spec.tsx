import { screen, render } from '../../../../../../test/test-utils';
import Chip from './chip';

describe('FilterMenu Chip', () => {
  it('should render the chip', async () => {
    await render(<Chip label="test" />);
    const chip = await screen.findByRole('listitem');
    expect(chip.textContent).toEqual('test');
  });
});
