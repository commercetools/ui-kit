import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../.storybook/decorators/section';
import ControlledComponentWrapper from '../.storybook/wrappers/controlled-component-wrapper';
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
        isReadOnly={boolean('isReadOnly', false)}
        placeholder={text('placeholder', 'Placeholder')}
        tone={select('tone', ['plain', 'warning', 'error', 'info'])}
      />
    </Section>
  ))
  .addDecorator(withReadme(NumericInputReadme))
  .add('NumericInput', () => (
    <Section>
      <ControlledComponentWrapper>
        {({ value, onChange }) => (
          <NumericInput
            name={text('name', '')}
            value={value}
            minValue={text('minValue', '')}
            maxValue={text('maxValue', '')}
            stepValue={text('stepValue', '')}
            onChange={onChange}
            isDisabled={boolean('isDisabled', false)}
            isReadOnly={boolean('isReadOnly', false)}
            isInactive={boolean('isInactive', false)}
            placeholder={text('placeholder', 'Placeholder')}
            tone={select('tone', ['plain', 'warning', 'error', 'info'])}
          />
        )}
      </ControlledComponentWrapper>
    </Section>
  ));
