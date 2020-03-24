import React from 'react';
import { PasswordField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const value = 'hello world, how are you?';

export const routePath = '/password-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <PasswordField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when required">
      <PasswordField
        title="Welcome Text"
        isRequired={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <PasswordField
        title="Welcome Text"
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <PasswordField
        title="Welcome Text"
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is shown and disabled">
      <PasswordField
        title="Welcome Text"
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with error when not touched">
      <PasswordField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <PasswordField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with description and hint">
      <PasswordField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hint="Make sure the Caps Lock is disabled"
        description="Your secret password"
      />
    </Spec>
  </Suite>
);
