import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import ContentNotification from './content-notification';

storiesOf('Components|Notifications', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('ContentNotification', () => (
    <Section>
      <ContentNotification
        type={select(
          'type',
          {
            warning: 'warning',
            error: 'error',
            info: 'info',
            success: 'success',
          },
          'warning'
        )}
      >
        {text('children', 'Text of a notification')}
      </ContentNotification>
    </Section>
  ));
