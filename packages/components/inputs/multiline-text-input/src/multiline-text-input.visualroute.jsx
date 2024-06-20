import { MultilineTextInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';
import { InfoIcon } from '@commercetools-uikit/icons';

const value =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const routePath = '/multiline-text-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <MultilineTextInput
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when read-only">
      <MultilineTextInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <MultilineTextInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <MultilineTextInput
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with error">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with right action">
      <MultilineTextInput
        value={value}
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
        rightActionIcon={<InfoIcon />}
        rightActionProps={{
          label: 'Click me',
          onClick: () => {},
        }}
      />
    </Spec>
    <Spec label="with right action and condensed">
      <MultilineTextInput
        value={value}
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
        rightActionIcon={<InfoIcon />}
        rightActionProps={{
          label: 'Click me',
          onClick: () => {},
        }}
      />
    </Spec>
    <Spec label="with max rows">
      <MultilineTextInput
        value={value}
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
        maxRows={3}
        rightActionIcon={<InfoIcon />}
        rightActionProps={{
          label: 'Click me',
          onClick: () => {},
        }}
      />
    </Spec>
    {/* <Spec label="when expanded by default">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        defaultExpandMultilineText={true}
      />
    </Spec>
    <Spec label="when disabled and expanded by default">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        defaultExpandMultilineText={true}
        isDisabled={true}
      />
    </Spec> */}
  </Suite>
);
