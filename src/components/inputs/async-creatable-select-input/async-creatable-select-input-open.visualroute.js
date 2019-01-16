import React from 'react';
import { AsyncCreatableSelectInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const loadOptions = () =>
  Promise.resolve([
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]);

const value = { value: 'one', label: 'One' };

export const routePath = '/async-creatable-select-input-open';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <AsyncCreatableSelectInput
        value={value}
        onChange={() => {}}
        defaultOptions={true}
        loadOptions={loadOptions}
        horizontalConstraint="m"
      />
    </Spec>
  </Suite>
);
