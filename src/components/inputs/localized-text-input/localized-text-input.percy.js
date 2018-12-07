import React from 'react';
import { LocalizedTextInput } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const value = {
  en: 'hello world',
  de: 'hallo welt',
  es: 'hola mundo',
};

screenshot('LocalizedTextInput', () => (
  <Suite>
    <Spec label="minimal">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
      />
    </Spec>
    <Spec label="when multiline text is expanded by default">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when multiline text and languages are expanded by default">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        areLanguagesDefaultOpened={true}
      />
    </Spec>
    <Spec label="when language controls are hidden">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hideLanguageControls={true}
      />
    </Spec>
    <Spec label="when languages are opened by default">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        areLanguagesDefaultOpened={true}
      />
    </Spec>
    <Spec label="when read-only and open">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isReadOnly={true}
        areLanguagesDefaultOpened={true}
      />
    </Spec>
    <Spec label="when read-only and closed">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when disabled and open">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isDisabled={true}
        areLanguagesDefaultOpened={true}
      />
    </Spec>
    <Spec label="when disabled and closed">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when there is an error for a specific language (first one)">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        errors={{ en: 'foo' }}
      />
    </Spec>
    <Spec label="when there is an error for a specific language (second one)">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        errors={{ de: 'foo' }}
      />
    </Spec>
    <Spec label="when there is a general error">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="when there is a warning for a specific language (first one)">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        warnings={{ en: 'foo' }}
      />
    </Spec>
    <Spec label="when there is a warning for a specific language (second one)">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        warnings={{ de: 'foo' }}
      />
    </Spec>
    <Spec label="when there is a general warning">
      <LocalizedTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
  </Suite>
));
