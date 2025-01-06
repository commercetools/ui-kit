import { MultilineTextField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const routePath = '/multiline-text-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when required">
      <MultilineTextField
        title="Welcome Text"
        isRequired={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <MultilineTextField
        title="Welcome Text"
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <MultilineTextField
        title="Welcome Text"
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <MultilineTextField
        title="Welcome Text"
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with error when not touched">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with warning when not touched">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="with warning when touched">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        touched={true}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="with max rows">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        maxRows={3}
      />
    </Spec>
    {/* <Spec label="when expanded by default">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        defaultExpandMultilineText={true}
      />
    </Spec>
    <Spec label="when disabled and expanded by default">
      <MultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        defaultExpandMultilineText={true}
        isDisabled={true}
      />
    </Spec> */}
  </Suite>
);
