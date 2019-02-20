import React from 'react';
import { RadioField, RadioInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const value = 'apple';

export const routePath = '/radio-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <RadioField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      >
        <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
        <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
      </RadioField>
    </Spec>
    <Spec label="when required">
      <RadioField
        title="Welcome Text"
        isRequired={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      >
        <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
        <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
      </RadioField>
    </Spec>
    <Spec label="when disabled">
      <RadioField
        title="Welcome Text"
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      >
        <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
        <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
      </RadioField>
    </Spec>
    <Spec label="when readonly">
      <RadioField
        title="Welcome Text"
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      >
        <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
        <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
      </RadioField>
    </Spec>
    <Spec label="with error when not touched">
      <RadioField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        errors={{ missing: true }}
      >
        <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
        <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
      </RadioField>
    </Spec>
    <Spec label="with error when touched">
      <RadioField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        errors={{ missing: true }}
        touched={true}
      >
        <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
        <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
      </RadioField>
    </Spec>
  </Suite>
);
