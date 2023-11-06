import { SearchSelectField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';
import { WorldIcon } from '../../../icons';

const loadOptions = (input) =>
  input
    ? Promise.resolve([])
    : Promise.resolve([
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
      ]);

const value = { value: 'one', label: 'One' };

export const routePath = '/search-select-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <SearchSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with iconLeft">
      <SearchSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label="when disabled">
      <SearchSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label='with "missing" error when not touched'>
      <SearchSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label='with "missing" error when touched'>
      <SearchSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with hint">
      <SearchSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hint="Select a state"
      />
    </Spec>
    <Spec label="when read-only">
      <SearchSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when has warning">
      <SearchSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
  </Suite>
);
