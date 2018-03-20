import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import LocalizedTextInputReadme from './README.md';
import LocalizedTextInput from './localized-text-input';

storiesOf('Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(LocalizedTextInputReadme))
  .add('LocalizedTextInput', () => {
    const isDefaultExpanded = boolean('isDefaultExpanded', false);
    // We need to force the component to rerender in case a default value
    // is changed. Otherwise the knob would have no effect.
    // We do this by changing the key.
    const key = isDefaultExpanded ? 'yes' : 'no';
    return (
      <Section>
        <LocalizedTextInput
          key={key}
          id={text('id', undefined)}
          name={text('name', undefined)}
          value={{
            en: text('value(en)', ''),
            de: text('value(de)', ''),
            'nan-Hant-TW': text('value(nan-Hant-TW)', ''),
          }}
          onChange={action('onChange')}
          selectedLanguage={select('selectedLanguage', ['en', 'de'], 'en')}
          onBlur={action('onBlur')}
          onFocus={action('onFocus')}
          hideExpansionControls={boolean('hideExpansionControls', false)}
          isDefaultExpanded={
            isDefaultExpanded
              ? true
              : // we need to set undefined instead of false to avoid prop-type
                // warnings in case hideExpansionControls is true
                undefined
          }
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
          error={
            boolean('has missing value error', false)
              ? { missing: true }
              : undefined
          }
          data-test="foo"
        />
      </Section>
    );
  });
