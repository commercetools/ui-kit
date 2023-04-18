import {
  LocalizedMultilineTextInput,
  ErrorMessage,
  WarningMessage,
} from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const value = {
  en: lorem,
  de: lorem,
  es: lorem,
};

export const routePath = '/localized-multiline-text-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
      />
    </Spec>
    {/* Percy does not support this dynamic behaviour tests as of now */}
    {/* <Spec label="when multiline text is expanded by default">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        defaultExpandMultilineText={true}
      />
    </Spec>
    <Spec label="when multiline text and languages are expanded by default">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        defaultExpandMultilineText={true}
        defaultExpandLanguages={true}
      />
    </Spec> */}
    <Spec label="when language controls are hidden">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hideLanguageExpansionControls={true}
      />
    </Spec>
    <Spec label="when languages are opened by default">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when read-only and open">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isReadOnly={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when read-only and closed">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when disabled and open">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isDisabled={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when disabled and closed">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when there is an error for a specific language (first one)">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        errors={{ en: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is an error for a specific language (second one)">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        errors={{ de: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is a general error">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="when there is a warning for a specific language (first one)">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        warnings={{ en: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a warning for a specific language (second one)">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        warnings={{ de: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a general warning">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
  </Suite>
);
