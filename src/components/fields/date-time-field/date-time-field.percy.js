import React from 'react';
import { DateTimeField } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const value = '2018-11-30T13:25:59.500Z';

screenshot('DateTimeField', () => (
  <Suite>
    <Spec label="minimal">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="when disabled">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when required">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        isRequired={true}
      />
    </Spec>
    <Spec label="with description">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        description="When will the product be avialable?"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="with placeholder">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint="m"
        value=""
        onChange={() => {}}
        placeholder="Select release date"
      />
    </Spec>
    <Spec label="with error when not touched">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint="m"
        value=""
        onChange={() => {}}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint="m"
        value=""
        onChange={() => {}}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
  </Suite>
));
