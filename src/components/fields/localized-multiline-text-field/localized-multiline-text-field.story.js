import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import ErrorMessage from '../../messages/error-message';
import LocalizedMultilineTextFieldReadme from './README.md';
import Icons from '../../icons';
import LocalizedMultilineTextField from './localized-multiline-text-field';

storiesOf('Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(LocalizedMultilineTextFieldReadme))
  .add('LocalizedMultilineTextField', () => (
    <Section>
      <Value
        defaultValue={{
          en: 'Parrot that knows how to party',
          de: 'Papagei der ordentlich abfeiert',
        }}
        render={(value, onChange) => {
          const name = text('name', '');
          const hint = text('hint', 'More information about the product');

          const areLanguagesDefaultOpened = boolean(
            'areLanguagesDefaultOpened',
            false
          );
          const isMultilineDefaultExpanded = boolean(
            'isMultilineDefaultExpanded',
            false
          );

          const key = `${isMultilineDefaultExpanded}-${areLanguagesDefaultOpened}`;

          const errorsByLanguage = boolean('errorsByLanguage', false);

          // hintIcon will only render when hint exists
          const iconNames = Object.keys(Icons);
          const icon = select('hintIcon', ['', ...iconNames], '');
          const hintIcon = icon ? React.createElement(Icons[icon]) : undefined;
          return (
            <LocalizedMultilineTextField
              key={key}
              id={name.trim() === '' ? undefined : name}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['xs', 's', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
              errors={object('errors', null)}
              renderError={errorKey => {
                switch (errorKey) {
                  case 'customError':
                    return 'A custom error.';
                  default:
                    return null;
                }
              }}
              isRequired={boolean('isRequired', false)}
              touched={boolean('touched', false)}
              name={text('name', 'description')}
              value={value}
              onChange={event => {
                action('onChange')(event);
                onChange({
                  ...value,
                  [event.target.language]: event.target.value,
                });
              }}
              selectedLanguage={select(
                'selectedLanguage',
                Object.keys(value),
                Object.keys(value)[0]
              )}
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
              placeholder={object('placeholder', { en: 'Placeholder' })}
              errorsByLanguage={
                errorsByLanguage
                  ? Object.keys(value).reduce((acc, language) => {
                      acc[language] = (
                        <ErrorMessage>An error for language</ErrorMessage>
                      );
                      return acc;
                    }, {})
                  : undefined
              }
              title={text('title', 'Description')}
              hint={hint}
              description={text('description', '')}
              onInfoButtonClick={
                boolean('show info button', false)
                  ? action('onInfoButtonClick')
                  : undefined
              }
              hintIcon={hintIcon}
              badge={text('badge', '')}
            />
          );
        }}
      />
    </Section>
  ));
