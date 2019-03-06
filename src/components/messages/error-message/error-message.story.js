import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import ErrorMessage from './error-message';

storiesOf('Components|Messages', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('ErrorMessage', () => (
    <Section>
      <ErrorMessage>{text('children', 'Required text missing')}</ErrorMessage>
    </Section>
  ));
