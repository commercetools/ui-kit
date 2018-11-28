import React from 'react';
import TextInput from './text-input';

suite('TextInput', () => {
  percySnapshot('enabled', () => (
    <TextInput value="Some value" onChange={() => {}} />
  ));

  percySnapshot('disabled', () => (
    <TextInput value="Some value" onChange={() => {}} isDisabled={true} />
  ));

  percySnapshot('placeholder', () => (
    <TextInput value="" onChange={() => {}} placeholder="Some placeholder" />
  ));
});
