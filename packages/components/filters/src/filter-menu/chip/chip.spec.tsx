import { screen, render } from '../../../../../../test/test-utils';
import Chip from './chip';

describe('FilterMenu Chip', () => {
  it('should render the chip', async () => {
    render(<Chip label="test" />);
    const chip = await screen.findByRole('listitem');
    expect(chip.textContent).toEqual('test');
  });

  it('should apply disabled styles when isDisabled is true', () => {
    render(<Chip label="Test Chip" isDisabled />);
    const chipElement = screen.getByRole('listitem');
    expect(chipElement.className).toMatch(/disabledChipStyles/i);
  });
});
