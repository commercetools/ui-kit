import { SearchTextInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = 'hello world how are you?';

export const routePath = '/search-text-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <SearchTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
      />
    </Spec>
    <Spec label="when disabled">
      <SearchTextInput
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
      />
    </Spec>
    <Spec label="when read-only">
      <SearchTextInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <SearchTextInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <SearchTextInput
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
      <SearchTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <SearchTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        onSubmit={() => {}}
        onReset={() => {}}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <SearchTextInput
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
      <SearchTextInput
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
      <SearchTextInput
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
