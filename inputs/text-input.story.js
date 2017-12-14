import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../.storybook/decorators/section';
import TextInputReadme from './text-input/README.md';
import NumericInputReadme from './numeric-input/README.md';
import TextInput from './text-input';
import NumericInput from './numeric-input';

storiesOf('Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(TextInputReadme))
  .add('TextInput', () => (
    <Section>
      <TextInput
        name={text('name', '')}
        value={text('value', '')}
        onChange={action('onChange')}
        isDisabled={boolean('isDisabled', false)}
        isInactive={boolean('isInactive', false)}
        placeholder={text('placeholder', 'Placeholder')}
        tone={select('tone', ['none', 'warning', 'error', 'info'])}
      />
    </Section>
  ))
  .addDecorator(withReadme(NumericInputReadme))
  .add('NumericInput', () => (
    <Section>
      <NumericInput
        name={text('name', '')}
        value={text('value', '')}
        onChange={action('onChange')}
        isDisabled={boolean('isDisabled', false)}
        isInactive={boolean('isInactive', false)}
        placeholder={text('placeholder', 'Placeholder')}
        tone={select('tone', ['none', 'warning', 'error', 'info'])}
      />
    </Section>
  ));
