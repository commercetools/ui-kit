import {
  LocalizedTextInput,
  ErrorMessage,
} from '@commercetools-frontend/ui-kit';
import { ThemeProvider } from '@emotion/react';
import { Suite, Spec } from '../../../../../test/percy';

const value = {
  en: 'hello world',
  de: 'hallo welt',
  es: 'hola mundo',
};

export const routePath = '/localized-text-input';

export const component = ({ themes }) => (
  <Suite>
    <Spec label="minimal">
      <LocalizedTextInput
        value={value}
        onChange={() => () => {}}
        selectedLanguage="en"
      />
    </Spec>
    <Spec label="when languages are expanded by default">
      <LocalizedTextInput
        value={value}
        onChange={() => () => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when expansion controls are hidden">
      <LocalizedTextInput
        value={value}
        onChange={() => () => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hideLanguageExpansionControls={true}
      />
    </Spec>
    <Spec label="when read-only and open">
      <LocalizedTextInput
        value={value}
        onChange={() => () => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isReadOnly={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when read-only and closed">
      <LocalizedTextInput
        value={value}
        onChange={() => () => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when disabled and open">
      <LocalizedTextInput
        value={value}
        onChange={() => () => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isDisabled={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when disabled and closed">
      <LocalizedTextInput
        value={value}
        onChange={() => () => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when there is an error for a specific language (first one)">
      <LocalizedTextInput
        value={value}
        onChange={() => () => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        errors={{ en: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is an error for a specific language (second one)">
      <LocalizedTextInput
        value={value}
        onChange={() => () => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        errors={{ de: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is a general error">
      <LocalizedTextInput
        value={value}
        onChange={() => () => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <ThemeProvider theme={themes.darkTheme}>
      <Spec label="with a custom (dark) theme" omitPropsList={true}>
        <LocalizedTextInput
          value={value}
          onChange={() => () => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
        />
      </Spec>
    </ThemeProvider>
  </Suite>
);
