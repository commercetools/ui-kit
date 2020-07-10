import React from 'react';
import { ThemeProvider } from 'emotion-theming';
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

export const component = ({ themes }) => (
  <Suite>
    <Spec label="minimal">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
      />
    </Spec>
    <Spec label="when multiline text is expanded by default">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        defaultExpandMultilineText={true}
      />
    </Spec>
    <Spec label="when multiline text and languages are expanded by default">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        defaultExpandMultilineText={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when language controls are hidden">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hideLanguageExpansionControls={true}
      />
    </Spec>
    <Spec label="when languages are opened by default">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when read-only and open">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isReadOnly={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when read-only and closed">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when disabled and open">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isDisabled={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when disabled and closed">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when there is an error for a specific language (first one)">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        errors={{ en: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is an error for a specific language (second one)">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        errors={{ de: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is a general error">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="when there is a warning for a specific language (first one)">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        warnings={{ en: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a warning for a specific language (second one)">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        warnings={{ de: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a general warning">
      <LocalizedMultilineTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <ThemeProvider theme={themes.darkTheme}>
      <Spec label="with custom theme">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
        />
      </Spec>
    </ThemeProvider>
  </Suite>
);
