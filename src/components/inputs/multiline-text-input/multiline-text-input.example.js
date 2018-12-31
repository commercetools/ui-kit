import React from 'react';
import { MultilineTextInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const value = 'hello\nworld\nhow\nare\nyou?';

export const routePath = '/multiline-text-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <MultilineTextInput
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when read-only">
      <MultilineTextInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <MultilineTextInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <MultilineTextInput
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with error">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when closed by default">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isDefaultClosed={true}
      />
    </Spec>
    <Spec label="when disabled and closed by default">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isDefaultClosed={true}
        isDisabled={true}
      />
    </Spec>
  </Suite>
);
