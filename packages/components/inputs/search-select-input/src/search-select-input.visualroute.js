import React from 'react';
import SearchSelectInput from './search-select-input';
import { Suite, Spec } from '../../../../../test/percy';
import { WorldIcon } from '../../../icons';

const loadOptions = (input) =>
  input
    ? Promise.resolve([])
    : Promise.resolve([
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
      ]);

const value = { value: 'one', label: 'One' };

export const routePath = '/search-select-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when input has an error">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="when input has an warning">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="when clearable">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        isClearable={true}
      />
    </Spec>
    <Spec label="when input has an error and a warning">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <SearchSelectInput
        value={null}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        placeholder="Select a state"
      />
    </Spec>
    <Spec label="when read-only">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        isReadOnly={true}
      />
    </Spec>
    <Spec label={'with iconLeft'}>
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label={'with iconLeft and no selected value'}>
      <SearchSelectInput
        value={null}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label={'with auto-fouced and no input value'}>
      <SearchSelectInput
        value={null}
        onChange={() => {}}
        isAutofocussed={true}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        iconLeft={<WorldIcon />}
      />
    </Spec>
  </Suite>
);
