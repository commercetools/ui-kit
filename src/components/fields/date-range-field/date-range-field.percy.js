import React from 'react';
import { DateRangeField } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const value = ['2018-09-20', '2018-09-24'];

screenshot('DateRangeField', () => (
  <Suite>
    <Spec label="minimal">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="when disabled">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when required">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        isRequired={true}
      />
    </Spec>
    <Spec label="with description">
      <DateRangeField
        title="Discounted days"
        description="When will the product be discounted?"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="with placeholder">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint="m"
        value={[]}
        onChange={() => {}}
        placeholder="Select release date"
      />
    </Spec>
    <Spec label="with error when not touched">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint="m"
        value={[]}
        onChange={() => {}}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint="m"
        value={[]}
        onChange={() => {}}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
  </Suite>
));
