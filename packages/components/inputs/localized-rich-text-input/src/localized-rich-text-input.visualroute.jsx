import { Switch, Route } from 'react-router-dom';
import { useState, useCallback, useRef, forwardRef } from 'react';
import {
  LocalizedRichTextInput,
} from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const lorem =
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';

const initialValue = {
  en: lorem,
  de: lorem,
  es: lorem,
};

const complexMarkup =
  '<ol><li><span style="font-weight: bold; font-family: &quot;Comic Sans MS&quot;;">Computermouse for <span style="text-decoration-line: underline;">controlling</span></span></li></ol><span><table class="table table-bordered"><tbody><tr><td>hello</td></tr><tr><td><p>world<img src="https://www.rollingstone.com/wp-content/uploads/2019/01/shutterstock_10010937aj.jpg" style="width: 100%; float: right;" class="pull-right img-circle"></p></td></tr></tbody></table></span><ol><li><span style="font-weight: bold; font-family: &quot;Comic Sans MS&quot;;">';

const initialValueWithComplexMarkup = {
  en: complexMarkup,
  de: complexMarkup,
  es: complexMarkup,
};

const emptyValue = '';

export const routePath = '/localized-rich-text-input';

// this route will be used with puppeteer based testing.
// eslint-disable-next-line react/prop-types
// eslint-disable-next-line react/display-name
const WrappedComponent = forwardRef((props, ref) => {
  const [value, setValue] = useState({
    en: emptyValue,
    de: emptyValue,
    es: emptyValue,
  });
  const handleChange = useCallback(
    (event) => {
      setValue({
        ...value,
        [event.target.language]: event.target.value,
      });
    },
    [value]
  );

  return (
    <LocalizedRichTextInput
      id="rich-text"
      name="rich-text"
      data-testid="rich-text-data-test"
      onChange={handleChange}
      value={value}
      selectedLanguage="en"
      horizontalConstraint={7}
      ref={ref}
    />
  );
});

const InteractiveRoute = () => {
  const ref = useRef(null);
  const handleReset = useCallback(() => {
    ref.current?.resetValue(initialValue);
  }, []);
  return (
    <Suite>
      <Spec label="Interactive Rich Text" omitPropsList>
        <div>
          <label htmlFor="reset-button">Reset value to lorem ipsum</label>
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              handleReset();
            }}
            id="reset-button"
          >
            Reset
          </button>
        </div>
        <WrappedComponent ref={ref} />
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
        errors={{ en: 'foo' }}
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
        errors={{ de: 'foo' }}
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
        warnings={{ en: 'foo' }}
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
        warnings={{ de: 'foo' }}
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
    <Spec label="with complex markup" omitPropsList>
      <LocalizedRichTextInput
        onChange={() => {}}
        value={initialValueWithComplexMarkup}
        selectedLanguage="en"
        horizontalConstraint={7}
        defaultExpandMultilineText={true}
      />
    </Spec>
    <Spec label="when there is a additional info set for a locale">
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        additionalInfo={{ en: 'This is a foo field' }}
      />
    </Spec>
    <Spec label="when there is a additional info and error for a locale">
      <LocalizedRichTextInput
        value={initialValue}
        onChange={() => {}}
        selectedLanguage="en"
        horizontalConstraint={7}
        errors={{ en: 'Error error error e e e' }}
        additionalInfo={{ en: 'This is a foo field' }}
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
