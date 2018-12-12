import React from 'react';
import { SelectField } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

const value = 'one';

screenshot('SelectField', () => (
  <Suite>
    <Spec label="minimal">
      <SelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <SelectField
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
      <SelectField
        title="State"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label='with "missing" error when touched'>
      <SelectField
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
      <SelectField
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
