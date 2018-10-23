import React from 'react';
import styled from 'react-emotion';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../.storybook/decorators/section';
import Text from './text';
import Readme from './text/README.md';

const InlineColorWrapper = styled.div`
  background-color: #e1ffdd;
  display: inline-block;
  width: ${props => props.width};
`;
storiesOf('Typography/Text', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Headline', () => (
    <Section>
      <Text.Headline
        elementType={select('Element type', ['h1', 'h2', 'h3'], 'h1')}
        truncate={boolean('truncate', false)}
      >
        {text('Text', 'Sample text Headline')}
      </Text.Headline>
    </Section>
  ))
  .add('Subheadline', () => (
    <Section>
      <Text.Subheadline
        elementType={select('Element type', ['h4', 'h5'], 'h4')}
        isBold={boolean('bold', false)}
        tone={select('Text tone', [
          'none',
          'primary',
          'information',
          'secondary',
          'positive',
          'negative',
        ])}
        truncate={boolean('truncate', false)}
      >
        {text('Text', 'Sample text Subheadline')}
      </Text.Subheadline>
    </Section>
  ))
  .add('Wrap', () => (
    <Section>
      <InlineColorWrapper width={'200px'}>
        <Text.Wrap>
          {text(
            'Text',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          )}
        </Text.Wrap>
      </InlineColorWrapper>
    </Section>
  ))
  .add('Body', () => (
    <Section>
      <Text.Body
        isBold={boolean('bold', false)}
        isInline={boolean('inline', false)}
        isItalic={boolean('italic', false)}
        tone={select('Text tone', [
          'none',
          'primary',
          'information',
          'secondary',
          'positive',
          'negative',
          'inverted',
        ])}
        truncate={boolean('truncate', false)}
      >
        {text('Text', 'Sample text Body')}
      </Text.Body>
    </Section>
  ))
  .add('Detail', () => (
    <Section>
      <Text.Detail
        isBold={boolean('bold', false)}
        isInline={boolean('inline', false)}
        isItalic={boolean('italic', false)}
        tone={select('Text tone', [
          'none',
          'primary',
          'information',
          'secondary',
          'positive',
          'negative',
          'warning',
        ])}
        truncate={boolean('truncate', false)}
      >
        {text('Text', 'Sample text Detail')}
      </Text.Detail>
    </Section>
  ));
