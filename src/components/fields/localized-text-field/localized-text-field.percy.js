import React from 'react';
import { LocalizedTextField } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const value = {
  en: 'hello world',
  de: 'hallo welt',
  es: 'hola mundo',
};

screenshot('LocalizedTextField', () => (
  <Suite>
    <Spec label="minimal">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when multiline text is expanded by default">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isMultilineDefaultExpanded={true}
      />
    </Spec>
    <Spec label="when multiline text and languages are expanded by default">
      <LocalizedTextField
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
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hideLanguageControls={true}
      />
    </Spec>
    <Spec label="when languages are opened by default">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        areLanguagesDefaultOpened={true}
      />
    </Spec>
    <Spec label="when read-only and open">
      <LocalizedTextField
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
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when disabled and open">
      <LocalizedTextField
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
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when there is an error and the field is not touched">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="when there is an error and the field is touched">
      <LocalizedTextField
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
