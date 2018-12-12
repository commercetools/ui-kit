import React from 'react';
import { CreatableSelectField } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

const value = { value: 'one', label: 'One' };

screenshot('CreatableSelectField', () => (
  <Suite>
    <Spec label="minimal">
      <CreatableSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <CreatableSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label='with "missing" error when not touched'>
      <CreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label='with "missing" error when touched'>
      <CreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
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
        horizontalConstraint="m"
        hint="Select a state"
      />
    </Spec>
  </Suite>
));
