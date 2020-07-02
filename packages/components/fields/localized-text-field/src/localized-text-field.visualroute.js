import React from 'react';
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
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when languages are opened by default">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when expansion controls are hidden">
      <LocalizedTextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hideLanguageExpansionControls={true}
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
        defaultExpandLanguages={true}
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
        defaultExpandLanguages={true}
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
);
