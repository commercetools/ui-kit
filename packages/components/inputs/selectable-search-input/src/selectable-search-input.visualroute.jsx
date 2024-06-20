import { SelectableSearchInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';
import { CodeViewIcon } from '@commercetools-uikit/icons';

export const routePath = '/selectable-search-input';

const value = {
  text: 'hello world',
  option: 'one',
};
const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
      />
    </Spec>
    <Spec label="when disabled">
      <SelectableSearchInput
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
      />
    </Spec>
    <Spec label="when read-only">
      <SelectableSearchInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <SelectableSearchInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <SelectableSearchInput
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
      />
    </Spec>
    <Spec label="with error">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when disabled with error">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
        isDisabled={true}
        hasError={true}
      />
    </Spec>
    <Spec label="when disabled with warning">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
        isDisabled={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when isClearable is false">
      <SelectableSearchInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
        isClearable={false}
      />
    </Spec>
    <Spec label="when showSubmitButton is false">
      <SelectableSearchInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
        isClearable={false}
        showSubmitButton={false}
      />
    </Spec>
    <Spec label="is condensed">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        isCondensed={true}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
      />
    </Spec>
    <Spec label="with right action">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
        rightActionIcon={<CodeViewIcon />}
        rightActionProps={{
          label: 'Click me',
          onClick: () => {},
        }}
      />
    </Spec>
    <Spec label="with right action + condensed">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        isCondensed={true}
        horizontalConstraint={16}
        onSubmit={() => {}}
        onReset={() => {}}
        options={options}
        rightActionIcon={<CodeViewIcon />}
        rightActionProps={{
          label: 'Click me',
          onClick: () => {},
        }}
      />
    </Spec>
  </Suite>
);
