import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter as Router } from 'react-router-dom';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../.storybook/decorators/section';
import Tag from './tag';
import Readme from './README.md';

const Story = () => (
  <Section>
    <Tag
      type={select('type', ['normal', 'warning'], 'normal')}
      linkTo={select('linkTo', ['/foo', undefined], undefined)}
      isDisabled={boolean('isDisabled', false)}
      onClick={boolean('onClick', false) ? action('onClick') : undefined}
      horizontalConstraint={select(
        'horizontalConstraint',
        ['xs', 's', 'm', 'l', 'xl', 'scale'],
        'm'
      )}
      onRemove={boolean('onRemove', false) ? action('onRemove') : undefined}
    >
      {text('Children', 'Icecream')}
    </Tag>
  </Section>
);
Story.displayName = 'Story';

storiesOf('Components|Tags', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  // Router is required to support the Link component used by Tag
  .add('Tag', () => (
    <Router>
      <Story />
    </Router>
  ));
