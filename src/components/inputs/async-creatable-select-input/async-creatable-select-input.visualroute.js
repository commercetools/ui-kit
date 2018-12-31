import React from 'react';
import { AsyncCreatableSelectInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const loadOptions = () =>
  Promise.resolve([
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]);

const value = { value: 'one', label: 'One' };

export const routePath = '/async-creatable-select-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <AsyncCreatableSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <AsyncCreatableSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="with error">
      <AsyncCreatableSelectInput
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <AsyncCreatableSelectInput
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <AsyncCreatableSelectInput
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with placeholder">
      <AsyncCreatableSelectInput
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        placeholder="Select a state"
      />
    </Spec>
  </Suite>
);
