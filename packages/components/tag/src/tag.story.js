import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter as Router } from 'react-router-dom';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import Section from '../../../../.storybook/decorators/section';
import Tag from './tag';
import Readme from '../README.md';

const Story = () => (
  <Section>
    <Tag
      type={select('type', ['normal', 'warning'], 'normal')}
      linkTo={select('linkTo', { '/foo': '/foo', Null: null }, '/foo')}
      isDisabled={boolean('isDisabled', false)}
      onClick={boolean('onClick', false) ? action('onClick') : undefined}
      horizontalConstraint={select(
        'horizontalConstraint',
        Constraints.getAcceptedMaxPropValues(),
        7
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
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  // Router is required to support the Link component used by Tag
  .add('Tag', () => (
    <Router>
      <Story />
    </Router>
  ));
