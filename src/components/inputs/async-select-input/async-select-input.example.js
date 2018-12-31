import React from 'react';
import { AsyncSelectInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const loadOptions = () =>
  Promise.resolve([
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]);

const value = { value: 'one', label: 'One' };

export const routePath = '/async-select-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when input has an error">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="when input has an warning">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="when clearable">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        isClearable={true}
      />
    </Spec>
    <Spec label="when input has an error and a warning">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <AsyncSelectInput
        value={null}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        placeholder="Select a state"
      />
    </Spec>
  </Suite>
);
