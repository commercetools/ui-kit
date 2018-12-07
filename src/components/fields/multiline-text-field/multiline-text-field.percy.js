import React from 'react';
import { MultilineTextField } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const value = 'hello\nworld\nhow\nare\nyou?';

screenshot('MultilineTextField', () => (
  <Suite>
    <Spec label="minimal">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when required">
      <MultilineTextField
        title="Welcome Text"
        isRequired={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <MultilineTextField
        title="Welcome Text"
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <MultilineTextField
        title="Welcome Text"
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with error when not touched">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="when closed by default">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isDefaultClosed={true}
      />
    </Spec>
    <Spec label="when disabled and closed by default">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isDefaultClosed={true}
        isDisabled={true}
      />
    </Spec>
  </Suite>
));
