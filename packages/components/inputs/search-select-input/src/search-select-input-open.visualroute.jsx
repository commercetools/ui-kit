import { SearchSelectInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const loadOptions = () =>
  Promise.resolve([
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]);

const value = { value: 'one', label: 'One' };

export const routePath = '/search-select-input-open';

export const component = () => (
  <Suite>
    <Spec label="minimal" testedTheme="old">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
      />
    </Spec>
  </Suite>
);
