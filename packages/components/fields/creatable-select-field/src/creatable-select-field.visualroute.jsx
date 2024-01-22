import { CreatableSelectField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

const value = { value: 'one', label: 'One' };

export const routePath = '/creatable-select-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <CreatableSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <CreatableSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label='with "missing" error when not touched'>
      <CreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label='with "missing" error when touched'>
      <CreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with hint">
      <CreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        hint="Select a state"
      />
    </Spec>
    <Spec label="when read-only">
      <CreatableSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="with warning when not touched">
      <CreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        warnings={{ defaultWarning: true }}
        renderDefaultWarning={() => 'Default warning'}
      />
    </Spec>
    <Spec label="with warning when touched">
      <CreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        warnings={{ defaultWarning: true }}
        touched={true}
        renderDefaultWarning={() => 'Default warning'}
      />
    </Spec>
  </Suite>
);
