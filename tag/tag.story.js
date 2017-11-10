import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-router';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../.storybook/decorators/section';
import Tag from './tag';
import Readme from './README.md';

const Story = () => (
  <Section>
    <Tag
      type={select('type', ['normal', 'warning'], 'normal')}
      linkTo={select('linkTo', ['/foo', undefined], undefined)}
      isDisabled={boolean('isDisabled', false)}
      onClick={boolean('onClick', false) ? action('onClick') : undefined}
      onRemove={boolean('onRemove', false) ? action('onRemove') : undefined}
    >
      {text('Children', 'Icecream')}
    </Tag>
  </Section>
);

storiesOf('Tags', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .addDecorator(StoryRouter())
  // Router is required to support the Link component used by Tag
  .add('Tag', () => <Story />);
