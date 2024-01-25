import { LocalizedTextField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = {
  en: 'hello world',
  de: 'hallo welt',
  es: 'hola mundo',
};

export const routePath = '/localized-text-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when languages are opened by default">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when expansion controls are hidden">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hideLanguageExpansionControls={true}
      />
    </Spec>
    <Spec label="when read-only and open">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isReadOnly={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when read-only and closed">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when disabled and open">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isDisabled={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when disabled and closed">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when there is an error and the field is not touched">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="when there is an error and the field is touched">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with warning when not touched">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="with error when touched">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        touched={true}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
  </Suite>
);
