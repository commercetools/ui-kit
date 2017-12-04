import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import NumericInput from './numeric-input';

storiesOf('Forms', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('NumericInput', () => (
    <Section>
      <NumericInput
        name={text('name', '')}
        value={text('value', '')}
        onChange={action('onChange')}
        isDisabled={boolean('isDisabled', false)}
        placeholder={text('placeholder', 'Placeholder')}
        hasError={boolean('hasError', false)}
      />
    </Section>
  ));
