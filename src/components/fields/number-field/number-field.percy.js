import React from 'react';
import { NumberField } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const value = '12.50';

screenshot('NumberField', () => (
  <Suite>
    <Spec label="minimal">
      <NumberField
        title="Age"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when required">
      <NumberField
        title="Age"
        isRequired={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <NumberField
        title="Age"
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when read-only">
      <NumberField
        title="Age"
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <NumberField
        title="Age"
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with error when not touched">
      <NumberField
        title="Age"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <NumberField
        title="Age"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
  </Suite>
));
