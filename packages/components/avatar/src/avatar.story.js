import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';
import Section from '../../../../.storybook/decorators/section';
import Avatar from './avatar';
import Readme from '../README.md';

storiesOf('Components|Avatar', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Avatar', () => (
    <Section>
      <Avatar
        firstName={text('firstName', 'Jon')}
        lastName={text('lastName', 'Snow')}
        gravatarHash={text('gravatarHash', '')}
        isHighlighted={boolean('isHighlighted', false)}
        size={select('size', ['s', 'm', 'l'], 'l')}
      />
    </Section>
  ));
