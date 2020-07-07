import React from 'react';
import { CreatableSelectInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

const value = { value: 'one', label: 'One' };

export const routePath = '/creatable-select-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <CreatableSelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <CreatableSelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <CreatableSelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        placeholder="Select something"
      />
    </Spec>
    <Spec label="with error">
      <CreatableSelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <CreatableSelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <CreatableSelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when read-only">
      <CreatableSelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        isReadOnly={true}
      />
    </Spec>
  </Suite>
);
