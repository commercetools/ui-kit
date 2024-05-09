import { SearchSelectInput } from '@commercetools-frontend/ui-kit';

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
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when input has an error">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="when input has an warning">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when clearable">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isClearable={true}
      />
    </Spec>
    <Spec label="when condensed">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isCondensed={true}
      />
    </Spec>
    <Spec label="when input has an error and a warning">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <SearchSelectInput
        value={null}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        placeholder="Select a state"
      />
    </Spec>
    <Spec label="when read-only">
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label={'with iconLeft'}>
      <SearchSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label={'with iconLeft and no selected value'}>
      <SearchSelectInput
        value={null}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label={'with auto-fouced and no input value'}>
      <SearchSelectInput
        value={null}
        onChange={() => {}}
        isAutofocussed={true}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
  </Suite>
);
