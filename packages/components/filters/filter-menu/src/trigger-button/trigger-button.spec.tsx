import { screen, render } from '../../../../../../test/test-utils';
import TriggerButton from './trigger-button';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu TriggerButton', () => {
  it('should render the TriggerButton', async () => {
    await render(
      <TriggerButton label="trigger button" appliedFilterValues={null} />
    );
    await screen.findByRole('button', { name: /open menu/i });
  });
});
