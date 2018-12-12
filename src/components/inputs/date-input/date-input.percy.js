import React from 'react';
import { DateInput } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const value = '2018-11-13';

screenshot('DateInput', () => (
  <Suite>
    <Spec label="minimal">
      <DateInput value={value} onChange={() => {}} horizontalConstraint="m" />
    </Spec>
    <Spec label="when disabled">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <DateInput
        value=""
        onChange={() => {}}
        horizontalConstraint="m"
        placeholder="Select something"
      />
    </Spec>
    <Spec label="with error">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="when disabled with error">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isDisabled={true}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="when disabled with warning">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isDisabled={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
  </Suite>
));
