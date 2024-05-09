import { CreatableSelectInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';
import { WorldIcon } from '../../../icons';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

const value = { value: 'one', label: 'One' };

export const routePath = '/creatable-select-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <CreatableSelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <CreatableSelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <CreatableSelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        placeholder="Select something"
      />
    </Spec>
    <Spec label="with error">
      <CreatableSelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <CreatableSelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <CreatableSelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when read-only">
      <CreatableSelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label={'with iconLeft'}>
      <CreatableSelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label={'with iconLeft and no selected value'}>
      <CreatableSelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label="is condensed">
      <CreatableSelectInput
        value={value}
        onChange={() => {}}
        isCondensed={true}
        options={options}
        horizontalConstraint={7}
      />
    </Spec>
  </Suite>
);
