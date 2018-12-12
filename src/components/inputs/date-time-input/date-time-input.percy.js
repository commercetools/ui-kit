import React from 'react';
import { DateTimeInput } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const value = '2018-11-13 15:00';

screenshot('DateTimeInput', () => (
  <Suite>
    <Spec label="minimal">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when default placeholder is shown">
      <DateTimeInput value="" onChange={() => {}} horizontalConstraint="m" />
    </Spec>
    <Spec label="when custom placeholder is shown">
      <DateTimeInput
        value=""
        onChange={() => {}}
        horizontalConstraint="m"
        placeholder="Select date and time"
      />
    </Spec>
    <Spec label="with error">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="when disabled with error">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
        isDisabled={true}
      />
    </Spec>
    <Spec label="with warning">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="when disabled with warning">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
        isDisabled={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
  </Suite>
));
