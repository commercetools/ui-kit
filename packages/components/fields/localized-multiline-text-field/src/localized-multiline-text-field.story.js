import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import { ErrorMessage } from '@commercetools-uikit/messages';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import * as icons from '../../../icons';
import LocalizedMultilineTextField from './localized-multiline-text-field';

storiesOf('Components|Fields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
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

          const defaultExpandLanguages = boolean(
            'defaultExpandLanguages',
            false
          );
          const defaultExpandMultilineText = boolean(
            'defaultExpandMultilineText',
            false
          );

          const key = `${defaultExpandMultilineText}-${defaultExpandLanguages}`;

          const errorsByLanguage = boolean('errorsByLanguage', false);
          const additionalInfo = object('additionalInfo', {
            en: '',
            de: '',
          });

          // hintIcon will only render when hint exists
          const iconNames = Object.keys(icons);
          const icon = select('hintIcon', ['', ...iconNames], '');
          const hintIcon = icon ? createElement(icons[icon]) : undefined;
          return (
            <LocalizedMultilineTextField
              key={key}
              id={name.trim() === '' ? undefined : name}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(6),
                7
              )}
              errors={object('errors', null)}
              renderError={(errorKey) => {
                switch (errorKey) {
                  case 'customError':
                    return 'A custom error.';
                  default:
                    return null;
                }
              }}
              warnings={object('warnings', {
                customWarning: true,
              })}
              renderWarning={(key) => {
                switch (key) {
                  case 'customWarning':
                    return 'A custom warning.';
                  default:
                    return null;
                }
              }}
              isRequired={boolean('isRequired', false)}
              touched={boolean('touched', false)}
              name={text('name', 'description')}
              value={value}
              onChange={(event) => {
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
              defaultExpandMultilineText={defaultExpandMultilineText}
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
              additionalInfo={
                Object.values(additionalInfo).some(
                  (additionalInfo) => additionalInfo.length > 0
                )
                  ? Object.entries(additionalInfo).reduce(
                      (acc, [language, additionalInfoEntry]) => {
                        if (additionalInfo.length === 0) return acc;
                        acc[language] = additionalInfoEntry;
                        return acc;
                      },
                      {}
                    )
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
