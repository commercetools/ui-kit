import { PasswordField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = 'hello world, how are you?';

export const routePath = '/password-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <PasswordField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when required">
      <PasswordField
        title="Welcome Text"
        isRequired={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <PasswordField
        title="Welcome Text"
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <PasswordField
        title="Welcome Text"
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is shown and disabled">
      <PasswordField
        title="Welcome Text"
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with error when not touched">
      <PasswordField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <PasswordField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with description and hint">
      <PasswordField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hint="Make sure the Caps Lock is disabled"
        description="Your secret password"
      />
    </Spec>
     <Spec label="with warning when not touched">
      <PasswordField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="with warning when touched">
      <PasswordField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        touched={true}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
  </Suite>
);
