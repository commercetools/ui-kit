import {
  LocalizedTextInput,
  ErrorMessage,
  WarningMessage,
} from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = {
  en: 'hello world',
  de: 'hallo welt',
  es: 'hola mundo',
};

export const routePath = '/localized-text-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
      />
    </Spec>
    <Spec label="when languages are expanded by default">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when expansion controls are hidden">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hideLanguageExpansionControls={true}
      />
    </Spec>
    <Spec label="when read-only and open">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isReadOnly={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when read-only and closed">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when disabled and open">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isDisabled={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when disabled and closed">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when there is an error for a specific language (first one)">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        errors={{ en: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is an error for a specific language (second one)">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        errors={{ de: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is a general error">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="when there is a warning for a specific language (first one)">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        warnings={{ en: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a warning for a specific language (second one)">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        warnings={{ de: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a general warning">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
  </Suite>
);
