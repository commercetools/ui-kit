import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../../README.md';
import ErrorMessage from './error-message';

storiesOf('Components|Messages', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('ErrorMessage', () => (
    <Section>
      <ErrorMessage>{text('children', 'Required text missing')}</ErrorMessage>
    </Section>
  ));
