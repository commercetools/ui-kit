import { CheckboxField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = 'apple';

export const routePath = '/checkbox-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <CheckboxField title="Welcome Text" value={value} onChange={() => {}}>
        I want capri sun
      </CheckboxField>
    </Spec>
    <Spec label="when required">
      <CheckboxField
        title="Welcome Text"
        isRequired={true}
        value={value}
        onChange={() => {}}
      >
        I want capri sun
      </CheckboxField>
    </Spec>
    <Spec label="when disabled">
      <CheckboxField
        title="Welcome Text"
        isDisabled={true}
        value={value}
        onChange={() => {}}
      >
       I want capri sun
      </CheckboxField>
    </Spec>
    <Spec label="when readonly">
      <CheckboxField
        title="Welcome Text"
        isReadOnly={true}
        value={value}
        onChange={() => {}}
      >
       I want capri sun
      </CheckboxField>
    </Spec>
    <Spec label="with error when not touched">
      <CheckboxField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        errors={{ missing: true }}
      >
        I want capri sun
      </CheckboxField>
    </Spec>
    <Spec label="with error when touched">
      <CheckboxField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        errors={{ missing: true }}
        touched={true}
      >
        I want capri sun
      </CheckboxField>
    </Spec>
  </Suite>
);
