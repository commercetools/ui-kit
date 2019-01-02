import React from 'react';
import { NumberInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const value = '18';

export const routePath = '/number-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <NumberInput value={value} onChange={() => {}} horizontalConstraint="m" />
    </Spec>
    <Spec label="when disabled">
      <NumberInput
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when read-only">
      <NumberInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <NumberInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <NumberInput
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with error">
      <NumberInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <NumberInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <NumberInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
  </Suite>
);
