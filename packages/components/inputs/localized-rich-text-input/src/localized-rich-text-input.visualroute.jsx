import { Switch, Route } from 'react-router-dom';
import { useState, useCallback } from 'react';
import {
  LocalizedRichTextInput,
  ErrorMessage,
  WarningMessage,
} from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const lorem =
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';

const initialValue = {
  en: lorem,
  de: lorem,
  es: lorem,
};

const emptyValue = '';

export const routePath = '/localized-rich-text-input';

// this route will be used with puppeteer based testing.
// eslint-disable-next-line react/prop-types
const WrappedComponent = () => {
  const [value, setValue] = useState({
    en: emptyValue,
    de: emptyValue,
    es: emptyValue,
  });
  const handleChange = useCallback((event) => {
    setValue({
      ...value,
      [event.target.language]: event.target.value,
    });
  }, []);

  return (
    <LocalizedRichTextInput
      id="rich-text"
      name="rich-text"
      data-testid="rich-text-data-test"
      onChange={handleChange}
      value={value}
      selectedLanguage="en"
      horizontalConstraint={7}
    />
  );
};

const InteractiveRoute = () => {
  return (
    <Suite>
      <Spec label="Interactive Rich Text" omitPropsList>
        <WrappedComponent />
      </Spec>
    </Suite>
  );
};

const DefaultRoute = () => (
  <Suite>
    <Spec label="minimal" omitPropsList>
      <LocalizedRichTextInput
        onChange={() => {}}
        value={{
          en: emptyValue,
          de: emptyValue,
          es: emptyValue,
        }}
        selectedLanguage="en"
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when multiline text is expanded by default" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        defaultExpandMultilineText={true}
      />
    </Spec>
    <Spec
      label="when multiline text and languages are expanded by default"
      omitPropsList
    >
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        defaultExpandMultilineText={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when language controls are hidden" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hideLanguageExpansionControls={true}
      />
    </Spec>
    <Spec label="when languages are opened by default" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when read-only and open" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isReadOnly={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when read-only and closed" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when disabled and open" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isDisabled={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when disabled and closed" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec
      label="when there is an error for a specific language (first one)"
      omitPropsList
    >
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        errors={{ en: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec
      label="when there is an error for a specific language (second one)"
      omitPropsList
    >
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        errors={{ de: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is a general error" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec
      label="when there is a warning for a specific language (first one)"
      omitPropsList
    >
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        warnings={{ en: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec
      label="when there is a warning for a specific language (second one)"
      omitPropsList
    >
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        warnings={{ de: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a general warning" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when showExpandIcon is enabled" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        showExpandIcon={true}
        onClickExpand={() => {}}
      />
    </Spec>
    <Spec label="when disabled" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isDisabled={true}
        onClickExpand={() => {}}
      />
    </Spec>
    <Spec label="when readonly" omitPropsList>
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        isReadOnly={true}
        onClickExpand={() => {}}
      />
    </Spec>
  </Suite>
);

export const component = () => (
  <Switch>
    <Route path={`${routePath}/interactive`} component={InteractiveRoute} />
    <Route path={routePath} component={DefaultRoute} />
  </Switch>
);
