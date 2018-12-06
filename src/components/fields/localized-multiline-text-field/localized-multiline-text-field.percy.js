import React from 'react';
import { LocalizedMultilineTextField } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const value = {
  en: 'hello\nworld',
  de: 'hallo\nwelt',
  es: 'hola\nmundo',
};

screenshot('LocalizedMultilineTextField', () => (
  <Suite>
    <Spec label="minimal">
      <LocalizedMultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
      />
    </Spec>
    <Spec label="when multiline text is expanded by default">
      <LocalizedMultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isMultilineDefaultExpanded={true}
      />
    </Spec>
    <Spec label="when multiline text and languages are expanded by default">
      <LocalizedMultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isMultilineDefaultExpanded={true}
        areLanguagesDefaultOpened={true}
      />
    </Spec>
    <Spec label="when language controls are hidden">
      <LocalizedMultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hideLanguageControls={true}
      />
    </Spec>
    <Spec label="when languages are opened by default">
      <LocalizedMultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        areLanguagesDefaultOpened={true}
      />
    </Spec>
    <Spec label="when read-only and open">
      <LocalizedMultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isReadOnly={true}
        areLanguagesDefaultOpened={true}
      />
    </Spec>
    <Spec label="when read-only and closed">
      <LocalizedMultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when disabled and open">
      <LocalizedMultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isDisabled={true}
        areLanguagesDefaultOpened={true}
      />
    </Spec>
    <Spec label="when disabled and closed">
      <LocalizedMultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when there is an error and the field is not touched">
      <LocalizedMultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="when there is an error and the field is touched">
      <LocalizedMultilineTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
  </Suite>
));
