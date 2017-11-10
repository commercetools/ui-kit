import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../.storybook/decorators/section';
import Text from './text';
import Readme from './text/README.md';

storiesOf('Typography/Text', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Headline', () => (
    <Section>
      <Text.Headline
        elementType={select('Element type', ['h1', 'h2', 'h3'], 'h1')}
      >
        {text('Text', 'Sample text <Headline>')}
      </Text.Headline>
    </Section>
  ))
  .add('Subheadline', () => (
    <Section>
      <Text.Subheadline
        elementType={select('Element type', ['h4', 'h5'], 'h4')}
        isBold={boolean('bold', false)}
      >
        {text('Text', 'Sample text <Subheadline>')}
      </Text.Subheadline>
    </Section>
  ))
  .add('Body', () => (
    <Section>
      <Text.Body isBold={boolean('bold', false)}>
        {text('Text', 'Sample text <Body>')}
      </Text.Body>
    </Section>
  ))
  .add('Detail', () => (
    <Section>
      <Text.Detail
        isBold={boolean('bold', false)}
        tone={select('Text tone', ['none', 'secondary'])}
      >
        {text('Text', 'Sample text')}
      </Text.Detail>
    </Section>
  ));
