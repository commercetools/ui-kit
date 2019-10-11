import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LocalizedRichTextInput, ErrorMessage, WarningMessage } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const lorem = LocalizedRichTextInput.deserialize(
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>'
);

const value = {
  en: lorem,
  de: lorem,
  es: lorem,
};

export const routePath = '/localized-rich-text-input';

const InteractiveRoute = () => {
  return <div>ok</div>;
};

const DefaultRoute = () => (
  <Suite>
    <Spec label="minimal" omitPropsList>
      <LocalizedRichTextInput
        onChange={() => {}}
        value={value}
        selectedLanguage="en"
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when multiline text is expanded by default" omitPropsList>
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        defaultExpandMultilineText={true}
      />
    </Spec>
    <Spec
      label="when multiline text and languages are expanded by default"
      omitPropsList
    >
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        defaultExpandMultilineText={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when language controls are hidden" omitPropsList>
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hideLanguageExpansionControls={true}
      />
    </Spec>
    <Spec label="when languages are opened by default" omitPropsList>
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when read-only and open" omitPropsList>
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isReadOnly={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when read-only and closed" omitPropsList>
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when disabled and open" omitPropsList>
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isDisabled={true}
        defaultExpandLanguages={true}
      />
    </Spec>
    <Spec label="when disabled and closed" omitPropsList>
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec
      label="when there is an error for a specific language (first one)"
      omitPropsList
    >
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        errors={{ en: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec
      label="when there is an error for a specific language (second one)"
      omitPropsList
    >
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        errors={{ de: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is a general error" omitPropsList>
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec
      label="when there is a warning for a specific language (first one)"
      omitPropsList
    >
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        warnings={{ en: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec
      label="when there is a warning for a specific language (second one)"
      omitPropsList
    >
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        warnings={{ de: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a general warning" omitPropsList>
      <LocalizedRichTextInput
        value={value}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint="m"
        hasWarning={true}
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
