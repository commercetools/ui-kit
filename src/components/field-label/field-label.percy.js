import React from 'react';
import { FieldLabel, WarningIcon, FlatButton } from '../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../test/percy';

screenshot('FieldLabel', () => (
  <Suite>
    <Spec label="minimal">
      <FieldLabel title="Hello" horizontalConstraint="m" />
    </Spec>
    <Spec label="with hint and hint icon">
      <FieldLabel
        title="Hello"
        hint="a hint"
        hintIcon={<WarningIcon />}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with required indicator">
      <FieldLabel
        title="Hello"
        hasRequiredIndicator={true}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with all options">
      <FieldLabel
        title="Hello"
        hasRequiredIndicator={true}
        onInfoButtonClick={() => {}}
        hint="a hint"
        hintIcon={<WarningIcon />}
        description="description"
        badge={<FlatButton tone="primary" label="show" />}
        htmlFor="sampleInput"
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with all options and large horizontal constraint">
      <FieldLabel
        title="Hello"
        hasRequiredIndicator={true}
        onInfoButtonClick={() => {}}
        hint="a hint"
        hintIcon={<WarningIcon />}
        description="description"
        badge={<FlatButton tone="primary" label="show" />}
        htmlFor="sampleInput"
        horizontalConstraint="l"
      />
    </Spec>
  </Suite>
));
