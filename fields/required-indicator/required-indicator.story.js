import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import RequiredIndicator from './required-indicator';

storiesOf('Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('RequiredIndicator', () => (
    <Section>
      <RequiredIndicator isColored={boolean('isColoured', true)} />
    </Section>
  ));
