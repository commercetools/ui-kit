/* eslint-disable react/prop-types, react/display-name */

import { useCallback, useState, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import PrimaryButton from '@commercetools-uikit/primary-button';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Text from '@commercetools-uikit/text';
import { ErrorMessage, WarningMessage } from '@commercetools-uikit/messages';
import Readme from '../README.md';
import LocalizedRichTextInput from './localized-rich-text-input';

// Create our initial value...

const initialValue = '<h1>H1 <u>heading</u></h1>';

const StoryWrapper = (props) => {
  const [value, setValue] = useState({
    en: initialValue,
    de: initialValue,
    'nan-Hant-TW': initialValue,
  });
  const [resetValue, setResetValue] = useState({
    en: initialValue,
    de: initialValue,
    'nan-Hant-TW': initialValue,
  });

  const onChange = useCallback(
    (event) => {
      setValue((currentValue) => ({
        ...currentValue,
        [event.target.language]: event.target.value,
      }));
    },
    [setValue]
  );

  const onResetValueChange = (lang) => (event) => {
    setResetValue((currentValue) => ({
      ...currentValue,
      [lang]: event.target.value,
    }));
  };

  const handleReset = () => {
    ref.current?.resetValue(resetValue);
  };

  const defaultExpandLanguages = boolean('defaultExpandLanguages', false);
  const defaultExpandMultilineText = boolean(
    'defaultExpandMultilineText',
    false
  );
  const errors = object('errors', { en: '', de: '', 'nan-Hant-TW': '' });
  const warnings = object('warnings', { en: '', de: '', 'nan-Hant-TW': '' });
  // We need to force the component to rerender in case a default value
  // is changed. Otherwise the knob would have no effect.
  // We do this by changing the key.
  const key = `${defaultExpandMultilineText}-${defaultExpandLanguages}`;
  const ref = useRef(null);

  return (
    <Spacings.Stack scale="l">
      <CollapsiblePanel
        header="Set initial value"
        horizontalConstraint="scale"
        isDefaultClosed
      >
        <Constraints.Horizontal max="scale">
          <Spacings.Stack scale="m">
            <textarea
              defaultValue={resetValue.en}
              onChange={onResetValueChange('en')}
              rows={4}
            />
            <textarea
              defaultValue={resetValue.de}
              onChange={onResetValueChange('de')}
              rows={4}
            />
            <textarea
              defaultValue={resetValue['nan-Hant-TW']}
              onChange={onResetValueChange('nan-Hant-TW')}
              rows={4}
            />
            <Constraints.Horizontal max="auto">
              <PrimaryButton
                label="Reset"
                onClick={handleReset}
                size="medium"
              />
            </Constraints.Horizontal>
          </Spacings.Stack>
        </Constraints.Horizontal>
      </CollapsiblePanel>
      <LocalizedRichTextInput
        key={key}
        id={text('id', 'test-id')}
        name={text('name', 'productName')}
        showExpandIcon={boolean('showExpandIcon', false)}
        selectedLanguage={select(
          'selectedLanguage',
          ['en', 'de', 'nan-Hant-TW'],
          'en'
        )}
        hideLanguageExpansionControls={boolean(
          'hideLanguageExpansionControls',
          false
        )}
        defaultExpandLanguages={
          // we need to set undefined instead of false to avoid prop-type
          // warnings in case hideLanguageExpansionControls is true
          defaultExpandLanguages || undefined
        }
        defaultExpandMultilineText={defaultExpandMultilineText}
        isAutofocussed={boolean('isAutofocussed', false)}
        isDisabled={boolean('isDisabled', false)}
        isReadOnly={boolean('isReadOnly', false)}
        placeholder={object('placeholder', {
          en: '',
          de: '',
          'nan-Hant-TW': '',
        })}
        horizontalConstraint={select(
          'horizontalConstraint',
          Constraints.getAcceptedMaxPropValues(7),
          12
        )}
        hasError={boolean('hasError', false)}
        hasWarning={boolean('hasWarning', false)}
        errors={
          Object.values(errors).some((error) => error.length > 0)
            ? Object.entries(errors).reduce((acc, [language, error]) => {
                if (error.length === 0) return acc;
                acc[language] = <ErrorMessage>{error}</ErrorMessage>;
                return acc;
              }, {})
            : undefined
        }
        warnings={
          Object.values(warnings).some((warning) => warning.length > 0)
            ? Object.entries(warnings).reduce((acc, [language, warning]) => {
                if (warning.length === 0) return acc;
                acc[language] = <WarningMessage>{warning}</WarningMessage>;
                return acc;
              }, {})
            : undefined
        }
        value={value}
        onChange={onChange}
        data-test="foo"
        ref={ref}
      />
      <Text.Headline as="h3">Output</Text.Headline>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </Spacings.Stack>
  );
};

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('LocalizedRichTextInput', () => <StoryWrapper />);
