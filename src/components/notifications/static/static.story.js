import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, text } from '@storybook/addon-knobs';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import Static from './static';

storiesOf('Notifications', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Static', () => (
    <Section>
      <Static type="warning">
        {text('Warning text', 'Text of a warning notification')}
      </Static>
      <Static type="info">
        {text('Info text', 'Text of an info notification')}
      </Static>
      <Static type="error">
        {text('Error text', 'Text of an error notification')}
      </Static>
      <Static type="success">
        {text('Success text', 'Text of a success notification')}
      </Static>
    </Section>
  ));
