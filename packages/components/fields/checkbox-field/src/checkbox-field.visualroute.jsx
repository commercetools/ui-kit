import { CheckBoxField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = 'apple';

export const routePath = '/checkbox-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <CheckBoxField title="Welcome Text" value={value} onChange={() => {}}>
        I want capri sun
      </CheckBoxField>
    </Spec>
    <Spec label="when required">
      <CheckBoxField
        title="Welcome Text"
        isRequired={true}
        value={value}
        onChange={() => {}}
      >
        I want capri sun
      </CheckBoxField>
    </Spec>
    <Spec label="when disabled">
      <CheckBoxField
        title="Welcome Text"
        isDisabled={true}
        value={value}
        onChange={() => {}}
      >
       I want capri sun
      </CheckBoxField>
    </Spec>
    <Spec label="when readonly">
      <CheckBoxField
        title="Welcome Text"
        isReadOnly={true}
        value={value}
        onChange={() => {}}
      >
       I want capri sun
      </CheckBoxField>
    </Spec>
    <Spec label="with error when not touched">
      <CheckBoxField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        errors={{ missing: true }}
      >
        I want capri sun
      </CheckBoxField>
    </Spec>
    <Spec label="with error when touched">
      <CheckBoxField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        errors={{ missing: true }}
        touched={true}
      >
        I want capri sun
      </CheckBoxField>
    </Spec>
  </Suite>
);
