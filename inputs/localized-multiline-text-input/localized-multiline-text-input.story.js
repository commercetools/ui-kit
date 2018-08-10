import React from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import ErrorMessage from '../../messages/error-message';
import LocalizedMultilineTextInputReadme from './README.md';
import LocalizedMultilineTextInput from './localized-multiline-text-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(LocalizedMultilineTextInputReadme))
  .add('LocalizedMultilineTextInput', () => {
    const areLanguagesDefaultExpanded = boolean(
      'areLanguagesDefaultExpanded',
      false
    );
    const isMultilineDefaultExpanded = boolean(
      'isMultilineDefaultExpanded',
      false
    );
    const defaultValue = {
      en: '',
      de: '',
      'nan-Hant-TW': '',
    };
    // We need to force the component to rerender in case a default value
    // is changed. Otherwise the knob would have no effect.
    // We do this by changing the key.
    const key = `${isMultilineDefaultExpanded}-${areLanguagesDefaultExpanded}`;
    return (
      <Section>
        <Value
          defaultValue={defaultValue}
          render={(value, onChange) => (
            <LocalizedMultilineTextInput
              key={key}
              id={text('id', undefined)}
              name={text('name', 'productName')}
              value={value}
              onChange={event => {
                action('onChange')(event);
                const name = event.target.name;
                if (!name) return;
                const language = event.target.name.split('.').pop();
                onChange({ ...value, [language]: event.target.value });
              }}
              onChangeValue={action('onChangeValue')}
              selectedLanguage={select('selectedLanguage', ['en', 'de'], 'en')}
              onBlur={action('onBlur')}
              onFocus={action('onFocus')}
              hideLanguageControls={boolean('hideLanguageControls', false)}
              areLanguagesDefaultExpanded={
                areLanguagesDefaultExpanded
                  ? true
                  : // we need to set undefined instead of false to avoid prop-type
                    // warnings in case hideLanguageControls is true
                    undefined
              }
              isMultilineDefaultExpanded={isMultilineDefaultExpanded}
              isAutofocussed={boolean('isAutofocussed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              placeholder={{
                en: text('placeholder(en)', ''),
                de: text('placeholder(de)', ''),
              }}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['xs', 's', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
              hasError={boolean('hasError', false)}
              errors={
                boolean('errors', false)
                  ? { de: <ErrorMessage>Custom Error Message</ErrorMessage> }
                  : undefined
              }
              data-test="foo"
            />
          )}
        />
      </Section>
    );
  });
