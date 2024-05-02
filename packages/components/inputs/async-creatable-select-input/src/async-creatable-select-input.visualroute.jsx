import { AsyncCreatableSelectInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';
import { WorldIcon } from '../../../icons';

const loadOptions = () =>
  Promise.resolve([
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]);

const value = { value: 'one', label: 'One' };

export const routePath = '/async-creatable-select-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <AsyncCreatableSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <AsyncCreatableSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="with error">
      <AsyncCreatableSelectInput
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <AsyncCreatableSelectInput
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <AsyncCreatableSelectInput
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with placeholder">
      <AsyncCreatableSelectInput
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        placeholder="Select a state"
      />
    </Spec>
    <Spec label="when read-only">
      <AsyncCreatableSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label={'with iconLeft'}>
      <AsyncCreatableSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label={'with iconLeft and no selected value'}>
      <AsyncCreatableSelectInput
        value={null}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label="is condensed">
      <AsyncCreatableSelectInput
        value={value}
        onChange={() => {}}
        isCondensed={true}
        defaultOptions={true}
        loadOptions={loadOptions}
        horizontalConstraint={7}
      />
    </Spec>
  </Suite>
);
