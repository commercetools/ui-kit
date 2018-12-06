import React from 'react';
import { AsyncCreatableSelectField } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const loadOptions = () =>
  Promise.resolve([
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]);

const value = { value: 'one', label: 'One' };

screenshot('AsyncCreatableSelectField', () => (
  <Suite>
    <Spec label="minimal">
      <AsyncCreatableSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <AsyncCreatableSelectField
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
      <AsyncCreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label='with "missing" error when touched'>
      <AsyncCreatableSelectField
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
      <AsyncCreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hint="Select a state"
      />
    </Spec>
  </Suite>
));
