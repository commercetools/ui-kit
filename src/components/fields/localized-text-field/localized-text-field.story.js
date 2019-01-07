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
import LocalizedTextFieldReadme from './README.md';
import * as icons from '../../icons';
import LocalizedTextField from './localized-text-field';

storiesOf('Components|Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(LocalizedTextFieldReadme))
  .add('LocalizedTextField', () => (
    <Section>
      <Value
        defaultValue={{
          en: 'Parrot that knows how to party',
          de: 'Papagei der ordentlich abfeiert',
        }}
        render={(value, onChange) => {
          const name = text('name', '');
          const hint = text('hint', 'More information about the product');

          const defaultExpandLanguages = boolean(
            'defaultExpandLanguages',
            false
          );

          const key = defaultExpandLanguages;

          const errorsByLanguage = boolean('errorsByLanguage', false);

          // hintIcon will only render when hint exists
          const iconNames = Object.keys(icons);
          const icon = select('hintIcon', ['', ...iconNames], '');
          const hintIcon = icon ? React.createElement(icons[icon]) : undefined;
          return (
            <LocalizedTextField
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
              hideLanguageExpansionControls={boolean(
                'hideLanguageExpansionControls',
                false
              )}
              defaultExpandLanguages={
                // we need to set undefined instead of false to avoid prop-type
                // warnings in case hideLanguageExpansionControls is true
                defaultExpandLanguages || undefined
              }
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
