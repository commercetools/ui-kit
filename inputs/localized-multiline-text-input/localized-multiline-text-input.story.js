import React from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import ErrorMessage from '../../messages/error-message';
import LocalizedMultilineTextInputReadme from './README.md';
import LocalizedMultilineTextInput from './localized-multiline-text-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(LocalizedMultilineTextInputReadme))
  .add('LocalizedMultilineTextInput', () => {
    const areLanguagesDefaultOpened = boolean(
      'areLanguagesDefaultOpened',
      false
    );
    const isMultilineDefaultExpanded = boolean(
      'isMultilineDefaultExpanded',
      false
    );
    const errors = object('errors', { en: 'a', de: 'b', 'nan-Hant-TW': 'c' });
    // We need to force the component to rerender in case a default value
    // is changed. Otherwise the knob would have no effect.
    // We do this by changing the key.
    const key = `${isMultilineDefaultExpanded}-${areLanguagesDefaultOpened}`;
    return (
      <Section>
        <Value
          defaultValue={{ en: '', de: '', 'nan-Hant-TW': '' }}
          render={(value, onChange) => (
            <LocalizedMultilineTextInput
              key={key}
              id={text('id', undefined)}
              name={text('name', 'productName')}
              value={object('value', value)}
              onChange={event => {
                action('onChange')(event);
                onChange({
                  ...value,
                  [event.target.language]: event.target.value,
                });
              }}
              onChangeValue={action('onChangeValue')}
              selectedLanguage={select('selectedLanguage', ['en', 'de'], 'en')}
              onBlur={action('onBlur')}
              onFocus={action('onFocus')}
              hideLanguageControls={boolean('hideLanguageControls', false)}
              areLanguagesDefaultOpened={
                // we need to set undefined instead of false to avoid prop-type
                // warnings in case hideLanguageControls is true
                areLanguagesDefaultOpened || undefined
              }
              isMultilineDefaultExpanded={isMultilineDefaultExpanded}
              isAutofocussed={boolean('isAutofocussed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              placeholder={object('placeholder', { en: '', de: '' })}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['xs', 's', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
              hasError={boolean('hasError', false)}
              errors={
                Object.values(errors).some(error => error.length > 0)
                  ? Object.entries(errors).reduce((acc, [language, error]) => {
                      if (error.length === 0) return acc;
                      acc[language] = <ErrorMessage>{error}</ErrorMessage>;
                      return acc;
                    }, {})
                  : undefined
              }
              data-test="foo"
            />
          )}
        />
      </Section>
    );
  });
