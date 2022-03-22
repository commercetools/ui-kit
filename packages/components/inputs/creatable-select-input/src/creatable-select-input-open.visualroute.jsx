import { CreatableSelectInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

const value = { value: 'one', label: 'One' };

export const routePath = '/creatable-select-input-open';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <CreatableSelectInput
        id="creatable-select-input"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
      />
    </Spec>
  </Suite>
);
