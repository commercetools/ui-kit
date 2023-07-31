import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs/react';
import Constraints from '../../../constraints';
import { ErrorMessage } from '../../../messages';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import LocalizedTextInput from './localized-text-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('LocalizedTextInput', () => {
    const defaultExpandLanguages = boolean('defaultExpandLanguages', false);
    // We need to force the component to rerender in case a default value
    // is changed. Otherwise the knob would have no effect.
    // We do this by changing the key.
    const key = defaultExpandLanguages ? 'yes' : 'no';
    const errors = object('errors', { en: '', de: '', 'nan-Hant-TW': '' });
    return (
      <Section>
        <Value
          defaultValue={{ en: '', de: '', 'nan-Hant-TW': '' }}
          render={(value, onChange) => (
            <LocalizedTextInput
              key={key}
              id={text('id', undefined)}
              name={text('name', undefined)}
              value={value}
              onChange={(event) => {
                action('onChange')(event);
                onChange({
                  ...value,
                  [event.target.language]: event.target.value,
                });
              }}
              selectedLanguage={select('selectedLanguage', ['en', 'de'], 'en')}
              onBlur={action('onBlur')}
              onFocus={action('onFocus')}
              hideLanguageExpansionControls={boolean(
                'hideLanguageExpansionControls',
                false
              )}
              defaultExpandLanguages={
                // we need to set undefined instead of false to avoid prop-type
                // warnings on the story in case hideLanguageExpansionControls is true
                defaultExpandLanguages || undefined
              }
              isAutofocussed={boolean('isAutofocussed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              placeholder={object('placeholder', { en: '', de: '' })}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(),
                7
              )}
              hasError={boolean('hasError', false)}
              errors={
                Object.values(errors).some((error) => error.length > 0)
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
