import { Suite, Spec } from '../../../../test/percy';
import QuickFilters from './quick-filters';

export const routePath = '/quick-filters';

export const component = () => (
  <Suite>
    <Spec label="Renders an active + inactive item">
      <QuickFilters
        items={[
          {
            id: '1',
            label: 'Accepted',
            isActive: true,
          },
          {
            id: '2',
            label: 'Rejected',
            isActive: false,
          },
        ]}
        onItemClick={() => {}}
      />
    </Spec>
  </Suite>
);
