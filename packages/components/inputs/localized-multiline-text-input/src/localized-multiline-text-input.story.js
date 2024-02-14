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
import Constraints from '@commercetools-uikit/constraints';
import { ErrorMessage, WarningMessage } from '@commercetools-uikit/messages';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import LocalizedMultilineTextInput from './localized-multiline-text-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('LocalizedMultilineTextInput', () => {
    const defaultExpandLanguages = boolean('defaultExpandLanguages', false);
    const defaultExpandMultilineText = boolean(
      'defaultExpandMultilineText',
      false
    );
    const errors = object('errors', { en: '', de: '', 'nan-Hant-TW': '' });
    const warnings = object('warnings', { en: '', de: '', 'nan-Hant-TW': '' });
    const additionalInfo = object('additionalInfo', {
      en: '',
      de: '',
      'nan-Hant-TW': '',
    });
    // We need to force the component to rerender in case a default value
    // is changed. Otherwise the knob would have no effect.
    // We do this by changing the key.
    const key = `${defaultExpandMultilineText}-${defaultExpandLanguages}`;
    return (
      <Section>
        <Value
          defaultValue={{ en: '', de: '', 'nan-Hant-TW': '' }}
          render={(value, onChange) => (
            <LocalizedMultilineTextInput
              key={key}
              id={text('id', undefined)}
              name={text('name', 'productName')}
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
                // warnings in case hideLanguageExpansionControls is true
                defaultExpandLanguages || undefined
              }
              defaultExpandMultilineText={defaultExpandMultilineText}
              isAutofocussed={boolean('isAutofocussed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              placeholder={object('placeholder', { en: '', de: '' })}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(6),
                7
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
                  ? Object.entries(warnings).reduce(
                      (acc, [language, warning]) => {
                        if (warning.length === 0) return acc;
                        acc[language] = (
                          <WarningMessage>{warning}</WarningMessage>
                        );
                        return acc;
                      },
                      {}
                    )
                  : undefined
              }
              additionalInfo={
                Object.values(additionalInfo).some(
                  (additionalInfoEntry) => additionalInfoEntry.length > 0
                )
                  ? Object.entries(additionalInfo).reduce(
                      (acc, [language, additionalInfoEntry]) => {
                        if (additionalInfoEntry.length === 0) return acc;
                        acc[language] = additionalInfoEntry;
                        return acc;
                      },
                      {}
                    )
                  : undefined
              }
              data-test="foo"
            />
          )}
        />
      </Section>
    );
  });
