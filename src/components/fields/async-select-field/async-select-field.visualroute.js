import React from 'react';
import { AsyncSelectField } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const loadOptions = () =>
  Promise.resolve([
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]);

const value = { value: 'one', label: 'One' };

export const routePath = '/async-select-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <AsyncSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <AsyncSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label='with "missing" error when not touched'>
      <AsyncSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label='with "missing" error when touched'>
      <AsyncSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with hint">
      <AsyncSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hint="Select a state"
      />
    </Spec>
  </Suite>
);
