import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import Radio from './radio';

storiesOf('Switches', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Radio', () => (
    <Section>
      <Radio.Group>
        <Radio.Option
          isDisabled={boolean('isFirstOptionDisabled', false)}
          onClick={action('onClick first option')}
        >
          {text('Label of primary action', 'Primary option')}
        </Radio.Option>
        <Radio.Option
          isDisabled={boolean('isSecondOptionDisabled', true)}
          onClick={action('onClick second option')}
        >
          {text('Label of second action', 'Second option')}
        </Radio.Option>
        <Radio.Option
          isDisabled={boolean('isThirdOptionDisabled', false)}
          onClick={action('onClick third option')}
        >
          {text('Label of third action', 'Third option')}
        </Radio.Option>
      </Radio.Group>
    </Section>
  ));
