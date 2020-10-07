import React from 'react';
import SearchSelectField from './search-select-field';
import { Suite, Spec } from '../../../../../test/percy';

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
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <SearchSelectField
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
      <SearchSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label='with "missing" error when touched'>
      <SearchSelectField
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
      <SearchSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
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
        horizontalConstraint="m"
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
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
  </Suite>
);
