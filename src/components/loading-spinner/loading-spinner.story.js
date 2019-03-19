import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../.storybook/decorators/section';
import Readme from './README.md';
import LoadingSpinner from './loading-spinner';

storiesOf('Components|Loading', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('LoadingSpinner', () => (
    <Section>
      <LoadingSpinner scale={select('scale', ['l', 's'])}>
        {text('children', 'Loading text')}
      </LoadingSpinner>
    </Section>
  ));
