import React from 'react';
import TextInput from './text-input';

suite('TextInput', () => {
  percySnapshot('enabled', () => (
    <TextInput
      value="Some value"
      onChange={() => {}}
      horizontalConstraint="m"
    />
  ));

  percySnapshot('disabled', () => (
    <TextInput
      value="Some value"
      onChange={() => {}}
      horizontalConstraint="m"
      isDisabled={true}
    />
  ));

  percySnapshot('placeholder', () => (
    <TextInput
      value=""
      onChange={() => {}}
      horizontalConstraint="m"
      placeholder="Some placeholder"
    />
  ));

  percySnapshot('horizontalConstraint=l', () => (
    <TextInput value="" onChange={() => {}} horizontalConstraint="l" />
  ));
});
