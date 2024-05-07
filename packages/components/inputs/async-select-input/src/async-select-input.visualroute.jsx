import { AsyncSelectInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';
import { WorldIcon } from '../../../icons';

const loadOptions = () =>
  Promise.resolve([
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]);

const value = { value: 'one', label: 'One' };

export const routePath = '/async-select-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when input has an error">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="when input has an warning">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when clearable">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isClearable={true}
      />
    </Spec>
    <Spec label="when input has an error and a warning">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <AsyncSelectInput
        value={null}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        placeholder="Select a state"
      />
    </Spec>
    <Spec label="when read-only">
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label={'with iconLeft'}>
      <AsyncSelectInput
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label={'with iconLeft and no selected value'}>
      <AsyncSelectInput
        value={null}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label="is condensed">
      <AsyncSelectInput
        value={value}
        isCondensed={true}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
      />
    </Spec>
  </Suite>
);
