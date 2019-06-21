import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import ContentNotification from './content-notification';

storiesOf('Components|Notifications', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
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
