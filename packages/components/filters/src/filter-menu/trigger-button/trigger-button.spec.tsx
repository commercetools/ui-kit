import { screen, render } from '../../../../../../test/test-utils';
import TriggerButton from './trigger-button';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu Trigger Button', () => {
  it('should render the trigger button', async () => {
    await render(
      <TriggerButton
        label="trigger button"
        filterKey="key"
        appliedFilterValues={undefined}
      />
    );
    await screen.findByText(/trigger button/i);
  });
});
