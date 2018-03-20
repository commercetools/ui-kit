import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { Value } from 'react-value';
import Section from '../.storybook/decorators/section';
import TextInputReadme from './text-input/README.md';
import NumberInputReadme from './number-input/README.md';
import LocalizedTextInputReadme from './localized-text-input/README.md';
import TextInput from './text-input';
import NumberInput from './number-input';
import LocalizedTextInput from './localized-text-input';

storiesOf('Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(TextInputReadme))
  .add('TextInput', () => (
    <Section>
      <TextInput
        name={text('name', '')}
        value={text('value', '')}
        onChange={action('onChange')}
        isAutofocussed={boolean('isAutofocussed', false)}
        isDisabled={boolean('isDisabled', false)}
        isReadOnly={boolean('isReadOnly', false)}
        hasError={boolean('hasError', false)}
        hasWarning={boolean('hasWarning', false)}
        placeholder={text('placeholder', 'Placeholder')}
      />
    </Section>
  ))
  .addDecorator(withReadme(NumberInputReadme))
  .add('NumberInput', () => (
    <Section>
      <Value
        defaultValue={undefined}
        render={(value, onChange) => (
          <NumberInput
            name={text('name', '')}
            value={value}
            onChange={event => onChange(event.target.value)}
            min={text('min', '')}
            max={text('max', '')}
            step={text('step', '')}
            isAutofocussed={boolean('isAutofocussed', false)}
            isDisabled={boolean('isDisabled', false)}
            isReadOnly={boolean('isReadOnly', false)}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
            placeholder={text('placeholder', 'Placeholder')}
          />
        )}
      />
    </Section>
  ))
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
          value={{ en: text('value(en)', ''), de: text('value(de)', '') }}
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
          horizontalSize={select(
            'horizontalSize',
            ['small', 'medium', 'full'],
            'full'
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
