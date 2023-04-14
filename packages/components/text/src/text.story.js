import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';
import Section from '../../../../docs/.storybook/decorators/section';
import Text from './text';
import Readme from '../README.md';

const InlineColorWrapper = styled.div`
  background-color: #e1ffdd;
  display: inline-block;
  width: ${(props) => props.width};
`;
storiesOf('Basics|Typography/Text', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Headline', () => (
    <Section>
      <Text.Headline
        as={select('as', ['h1', 'h2', 'h3'], 'h1')}
        title={text('title', 'Text to be shown as tooltip on hover')}
        truncate={boolean('truncate', false)}
        nowrap={boolean('nowrap', false)}
      >
        {text('Text', 'Sample text Headline')}
      </Text.Headline>
    </Section>
  ))
  .add('Subheadline', () => (
    <Section>
      <Text.Subheadline
        as={select('as', ['h4', 'h5'], 'h4')}
        isBold={boolean('bold', false)}
        tone={select('Text tone', {
          none: null,
          primary: 'primary',
          information: 'information',
          secondary: 'secondary',
          positive: 'positive',
          negative: 'negative',
        })}
        title={text('title', 'Text to be shown as tooltip on hover')}
        truncate={boolean('truncate', false)}
        nowrap={boolean('nowrap', false)}
      >
        {text('Text', 'Sample text Subheadline')}
      </Text.Subheadline>
    </Section>
  ))
  .add('Wrap', () => (
    <Section>
      <InlineColorWrapper width={'200px'}>
        <Text.Wrap
          title={text('title', 'Text to be shown as tooltip on hover')}
        >
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
        as={select('as', {
          default: null,
          p: 'p',
          span: 'span',
        })}
        isBold={boolean('bold', false)}
        isItalic={boolean('italic', false)}
        isStrikethrough={boolean('strikethrough', false)}
        tone={select('Text tone', {
          none: null,
          primary: 'primary',
          information: 'information',
          secondary: 'secondary',
          positive: 'positive',
          negative: 'negative',
          inverted: 'inverted',
        })}
        title={text('title', 'Text to be shown as tooltip on hover')}
        truncate={boolean('truncate', false)}
        nowrap={boolean('nowrap', false)}
      >
        {text('Text', 'Sample text Body')}
      </Text.Body>
    </Section>
  ))
  .add('Detail', () => (
    <Section>
      <Text.Detail
        as={select('as', {
          default: null,
          span: 'span',
        })}
        isBold={boolean('bold', false)}
        isItalic={boolean('italic', false)}
        isStrikethrough={boolean('strikethrough', false)}
        tone={select('Text tone', {
          none: null,
          primary: 'primary',
          information: 'information',
          secondary: 'secondary',
          positive: 'positive',
          negative: 'negative',
          inverted: 'inverted',
          warning: 'warning',
        })}
        title={text('title', 'Text to be shown as tooltip on hover')}
        truncate={boolean('truncate', false)}
        nowrap={boolean('nowrap', false)}
      >
        {text('Text', 'Sample text Detail')}
      </Text.Detail>
    </Section>
  ));
