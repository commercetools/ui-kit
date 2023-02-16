import { SelectableSearchInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

export const routePath = '/selectable-search-input';

const value = 'hello world how are you?';
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
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
      />
    </Spec>
    <Spec label="when disabled">
      <SelectableSearchInput
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
      />
    </Spec>
    <Spec label="when read-only">
      <SelectableSearchInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <SelectableSearchInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <SelectableSearchInput
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
      />
    </Spec>
    <Spec label="with error">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when disabled with error">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
        isDisabled={true}
        hasError={true}
      />
    </Spec>
    <Spec label="when disabled with warning">
      <SelectableSearchInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
        isDisabled={true}
        hasWarning={true}
      />
    </Spec>
  </Suite>
);
