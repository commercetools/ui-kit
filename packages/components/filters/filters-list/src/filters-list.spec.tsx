import { screen, render } from '../../../../../test/test-utils';
import FiltersList from './filters-list';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu FiltersList', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should render the filters-list', async () => {
    await render(
      <FiltersList
        filters={[
          {
            key: 'test',
            label: 'test',
            getTags: () => [{ label: 'test' }],
            onClearRequest: () => {},
          },
        ]}
        onClearAllRequest={() => {}}
      >
        children config here
      </FiltersList>
    );
    await screen.findByText('filters list');
  });
});
