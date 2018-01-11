import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { Value } from 'react-value';
import Section from '../.storybook/decorators/section';
import TextInputReadme from './text-input/README.md';
import NumberInputReadme from './number-input/README.md';
import TextInput from './text-input';
import NumberInput from './number-input';

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
  ));
