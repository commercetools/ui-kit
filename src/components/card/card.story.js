import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Section from '../../../.storybook/decorators/section';
import Readme from './README.md';
import Card from './card';
import Constraints from '../constraints';

storiesOf('Components|Cards', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
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
