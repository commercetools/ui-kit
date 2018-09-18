import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import WarningMessage from './warning-message';

storiesOf('Messages', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('WarningMessage', () => (
    <Section>
      <WarningMessage>
        {text('children', 'This name is already being used by another variant')}
      </WarningMessage>
    </Section>
  ));
