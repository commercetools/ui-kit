import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';
import Section from '../../../.storybook/decorators/section';
import Readme from './README.md';
import Card from './card';
import Constraints from '../constraints';

storiesOf('Components|Cards', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Card', () => (
    <Section>
      <Constraints.Horizontal constraint="m">
        <Card
          type={select(
            'type',
            {
              raised: 'raised',
              flat: 'flat',
            },
            'raised'
          )}
          theme={select('theme', {
            light: 'light',
            dark: 'dark',
          })}
        >
          {text('children', 'Card text')}
        </Card>
      </Constraints.Horizontal>
    </Section>
  ));
